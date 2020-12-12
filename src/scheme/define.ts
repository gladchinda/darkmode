export enum ColorScheme {
  DARK = 'dark',
  LIGHT = 'light',
  NONE = 'no-preference'
};

export const COLOR_SCHEME_PREFERENCES: ColorScheme[] = [
  ColorScheme.NONE,
  ColorScheme.LIGHT,
  ColorScheme.DARK
];

export const MEDIA_QUERY_LISTS_CACHE = new Map<ColorScheme, MediaQueryList>();

export function getMediaQueryList(scheme: ColorScheme): MediaQueryList {
  let $mq = MEDIA_QUERY_LISTS_CACHE.get(scheme);

  if (!($mq || COLOR_SCHEME_PREFERENCES.indexOf(scheme) < 0)) {
    $mq = matchMedia(`(prefers-color-scheme: ${scheme})`);
    MEDIA_QUERY_LISTS_CACHE.set(scheme, $mq);
  }

  return $mq;
}
