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
  async applyFilter(output: string): Promise<string> {
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
    });

    cleanHtml = this.cleanCssStyles(cleanHtml);

    return '<!DOCTYPE html>\n' + cleanHtml;
  }

  private cleanCssStyles(html: string): string {
    //очищаем <style> блоки
    html = html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (match, css) => {
      const safeCss = this.filterCssRules(css);
      return `<style>${safeCss}</style>`;
    });

    // Очищаем inline style
    html = html.replace(/style="([^"]*)"/gi, (match, style) => {
      const safeStyle = this.filterInlineStyle(style);
      //если safeStyle пустой, удаляем весь атрибут style
      return safeStyle ? `style="${safeStyle}"` : '';
    });

    return html;
  }

  private filterCssRules(css: string): string {
    //разбиваем на правила и фильтруем свойства
    return css
      .split('}')
      .map((rule) => {
        const [selector, props] = rule.split('{');
        if (!props) return '';
        const safeProps = this.filterInlineStyle(props);
        return safeProps ? `${selector}{${safeProps}}` : '';
      })
      .join('}');
  }

  private filterInlineStyle(style: string): string {
    return style
      .split(';')
      .map((prop) => {
        const [key, value] = prop.split(':').map((s) => s && s.trim());
        if (!key || !value) return '';
        //проверяем запрещенные префиксы свойств
        if (
          SAFE_CSS_PROP_DENY_PREFIXES.some((prefix) => key.startsWith(prefix))
        ) {
          return '';
        }
        //проверяем разрешенные свойства
        if (!SAFE_CSS_PROPS.includes(key)) {
          return '';
        }
        //проверяем запрещенные паттерны значений
        if (
          SAFE_CSS_VALUE_DENY_PATTERNS.some((pattern) => pattern.test(value))
        ) {
          return '';
        }
        return `${key}: ${value}`;
      })
      .filter(Boolean)
      .join('; ');
  }
}
