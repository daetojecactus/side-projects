export const SAFE_CSS_PROPS = [
  'color',
  'background-color',
  'font-family',
  'font-size',
  'font-weight',
  'font-style',
  'text-align',
  'text-decoration',
  'line-height',
  'letter-spacing',
  'word-spacing',
  'white-space',
  'margin',
  'padding',
  'border',
  'border-width',
  'border-style',
  'border-color',
  'border-radius',
  'width',
  'height',
  'max-width',
  'max-height',
  'min-width',
  'min-height',
  'display',
  'overflow',
  'vertical-align',
];

export const SAFE_CSS_PROP_DENY_PREFIXES = ['-webkit-', '-moz-', '-ms-', '-o-'];

export const SAFE_CSS_VALUE_DENY_PATTERNS = [
  /url\s*\(/i,
  /javascript:/i,
  /expression\s*\(/i,
  /behavior:/i,
  /data:/i,
  /@import/i,
];

export const SAFE_HTML_TAGS = [
  'html',
  'head',
  'body',
  'title',
  'style',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'div',
  'span',
  'strong',
  'em',
  'b',
  'i',
  'u',
  'ul',
  'ol',
  'li',
];

export const SAFE_HTML_ATTRIBUTES = {
  '*': ['style'],
};

export const SAFE_HTML_OPTIONS = {
  allowedTags: SAFE_HTML_TAGS,
  allowedAttributes: SAFE_HTML_ATTRIBUTES,
  allowedSchemes: [],
  allowProtocolRelative: false,
  enforceHtmlBoundary: true,
  disallowedTagsMode: 'discard',
  allowVulnerableTags: true,
};
