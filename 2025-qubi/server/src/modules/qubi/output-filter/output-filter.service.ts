import { Injectable } from '@nestjs/common';
import * as sanitizeHtml from 'sanitize-html';
import {
  SAFE_CSS_PROPS,
  SAFE_HTML_OPTIONS,
  SAFE_CSS_VALUE_DENY_PATTERNS,
  SAFE_CSS_PROP_DENY_PREFIXES,
} from './constants/output-filter-constants';

@Injectable()
export class OutputFilterService {
  async applyFilter(
    output: string,
    allowedImageUrls: string[] = [],
  ): Promise<string> {
    console.log('=== OUTPUT FILTER DEBUG ===');
    console.log('Allowed image URLs count:', allowedImageUrls.length);
    console.log('First 3 allowed URLs:', allowedImageUrls.slice(0, 3));

    let cleanHtml = sanitizeHtml(output, {
      ...SAFE_HTML_OPTIONS,
      exclusiveFilter: (frame) => {
        //удаляем style вне head
        if (
          frame.tag === 'style' &&
          frame.parent &&
          frame.parent.name !== 'head'
        ) {
          return true;
        }

        return false;
      },
      transformTags: {
        img: (tagName, attribs) => {
          const src = attribs.src;
          console.log('Transform IMG, src:', src);
          console.log(
            'Is allowed:',
            this.isImageUrlAllowed(src, allowedImageUrls),
          );

          // Если src нет или не разрешен - удаляем тег полностью
          if (!src || !this.isImageUrlAllowed(src, allowedImageUrls)) {
            console.log('IMG REMOVED! src:', src);
            return { tagName: false }; // удаляет тег
          }

          // Ограничиваем размеры изображений
          return {
            tagName: 'img',
            attribs: {
              ...attribs,
              style: this.limitImageSize(attribs.style || ''),
            },
          };
        },
        a: (tagName, attribs) => {
          const href = attribs.href;

          // Блокируем опасные схемы
          if (href && /^(javascript|data|vbscript):/i.test(href)) {
            console.log('Dangerous link blocked:', href);
            return { tagName: false }; // удаляем тег
          }

          // Разрешаем только # (якоря на странице) или удаляем href
          if (href && !href.startsWith('#')) {
            console.log('External link removed:', href);
            return {
              tagName: 'a',
              attribs: {
                ...attribs,
                href: undefined, // удаляем href, оставляем только текст
              },
            };
          }

          return {
            tagName: 'a',
            attribs,
          };
        },
      },
    });

    cleanHtml = this.cleanCssStyles(cleanHtml, allowedImageUrls);

    return '<!DOCTYPE html>\n' + cleanHtml;
  }

  private limitImageSize(style: string): string {
    // Парсим существующий style и добавляем ограничения
    const styles = style
      .split(';')
      .map((s) => s.trim())
      .filter(Boolean);
    const styleMap = new Map<string, string>();

    styles.forEach((prop) => {
      const [key, value] = prop.split(':').map((s) => s?.trim());
      if (key && value) styleMap.set(key, value);
    });

    // Устанавливаем максимальные размеры если не указаны
    if (!styleMap.has('max-width')) {
      styleMap.set('max-width', '100%');
    }
    if (!styleMap.has('height') && !styleMap.has('max-height')) {
      styleMap.set('height', 'auto');
    }

    return Array.from(styleMap.entries())
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');
  }

  private isImageUrlAllowed(url: string, allowedUrls: string[]): boolean {
    if (!url) return false;
    // Проверяем, что URL из разрешенного списка
    return allowedUrls.some(
      (allowed) => url.includes(allowed) || allowed.includes(url),
    );
  }

  private cleanCssStyles(html: string, allowedImageUrls: string[]): string {
    //очищаем <style> блоки
    html = html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (match, css) => {
      const safeCss = this.filterCssRules(css, allowedImageUrls);
      return `<style>${safeCss}</style>`;
    });

    // Очищаем inline style
    html = html.replace(/style="([^"]*)"/gi, (match, style) => {
      const safeStyle = this.filterInlineStyle(style, allowedImageUrls);
      //если safeStyle пустой, удаляем весь атрибут style
      return safeStyle ? `style="${safeStyle}"` : '';
    });

    return html;
  }

  private filterCssRules(css: string, allowedImageUrls: string[]): string {
    //разбиваем на правила и фильтруем свойства
    return css
      .split('}')
      .map((rule) => {
        const [selector, props] = rule.split('{');
        if (!props) return '';
        const safeProps = this.filterInlineStyle(props, allowedImageUrls);
        return safeProps ? `${selector}{${safeProps}}` : '';
      })
      .filter(Boolean)
      .join('\n');
  }

  private filterInlineStyle(style: string, allowedImageUrls: string[]): string {
    return style
      .split(';')
      .map((prop) => {
        // Используем indexOf вместо split(':') чтобы не ломать URL с https://
        const colonIndex = prop.indexOf(':');
        if (colonIndex === -1) return '';

        const key = prop.substring(0, colonIndex).trim();
        const value = prop.substring(colonIndex + 1).trim();

        if (!key || !value) return '';

        //проверяем запрещенные префиксы свойств
        if (
          SAFE_CSS_PROP_DENY_PREFIXES.some((prefix) => key.startsWith(prefix))
        ) {
          return '';
        }

        //проверяем разрешенные свойства
        if (!SAFE_CSS_PROPS.includes(key)) {
          console.log(`CSS property "${key}" not in whitelist`);
          return '';
        }

        // Проверяем URL в значениях
        if (this.containsUrl(value)) {
          console.log(`Found URL in CSS: ${key}: ${value}`);
          // Если это background-image с разрешенным URL - пропускаем
          if (
            key === 'background-image' &&
            this.isUrlAllowed(value, allowedImageUrls)
          ) {
            return `${key}: ${value}`;
          }
          // Иначе блокируем
          return '';
        }

        //проверяем запрещенные паттерны значений (кроме url, его проверили выше)
        if (
          SAFE_CSS_VALUE_DENY_PATTERNS.filter(
            (p) => !p.source.includes('url'),
          ).some((pattern) => pattern.test(value))
        ) {
          return '';
        }
        return `${key}: ${value}`;
      })
      .filter(Boolean)
      .join('; ');
  }

  private containsUrl(value: string): boolean {
    return /url\s*\(/i.test(value);
  }

  private isUrlAllowed(value: string, allowedUrls: string[]): boolean {
    // Извлекаем URL из url(...)
    const urlMatch = value.match(/url\s*\(\s*['"]?([^'")]+)['"]?\s*\)/i);
    if (!urlMatch) {
      return false;
    }

    const url = urlMatch[1];

    const isAllowed = allowedUrls.some((allowed) => {
      const match =
        url === allowed || url.includes(allowed) || allowed.includes(url);
      return match;
    });

    console.log('Final result:', isAllowed);
    return isAllowed;
  }
}
