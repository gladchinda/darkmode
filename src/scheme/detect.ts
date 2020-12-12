import { supportsMatchMedia } from "../utils/detect";
import { COLOR_SCHEME_PREFERENCES, ColorScheme, getMediaQueryList } from "./define";

export default function getDeviceColorScheme() {
  if (supportsMatchMedia()) {
    for (let scheme of COLOR_SCHEME_PREFERENCES) {
      const $mq = getMediaQueryList(scheme);

      if ($mq.matches) {
        return scheme !== ColorScheme.NONE ? scheme : null;
      }
    }
  }

  return null;
}
