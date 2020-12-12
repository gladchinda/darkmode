import getDeviceColorScheme from "./detect";
import { supportsMatchMedia } from "../utils/detect";
import { ColorScheme, getMediaQueryList } from "./define";
import { noop, isFunction, isUndefined } from "../utils/helpers";

const observeDeviceColorScheme = (function() {
  if (supportsMatchMedia()) {
    let _callback: Function;
    let addListener: Function;
    let removeListener: Function;
    let useEventListener: boolean;
    let isObserving: boolean = false;
    let currentScheme: ColorScheme;
    let $mq: MediaQueryList;

    function __observer__(evt) {
      if (!evt.matches) {
        unobserve(observe);
      }
    }

    function unobserve(callback?: Function) {
      if (isObserving === true) {
        removeListener(__observer__);
        isObserving = false;
      }

      _triggerCallback(callback);
    }

    function observe() {
      if (isObserving !== true) {
        const previousScheme = currentScheme;

        currentScheme = getDeviceColorScheme() || ColorScheme.NONE;
        $mq = getMediaQueryList(currentScheme);

        if (isUndefined(useEventListener)) {
          useEventListener = isFunction($mq.addEventListener);
        }

        if (useEventListener) {
          addListener = $mq.addEventListener.bind($mq, 'change');
          removeListener = $mq.removeEventListener.bind($mq, 'change');
        } else {
          addListener = $mq.addListener.bind($mq);
          removeListener = $mq.removeListener.bind($mq);
        }

        addListener(__observer__);
        isObserving = true;

        if (!isUndefined(previousScheme)) {
          _callback(currentScheme, previousScheme);
        }
      }
    }

    return function observeDeviceColorScheme(callback?: Function) {
      _callback = isFunction(callback) ? callback : noop;
      observe();
      return unobserve;
    }
  }

  function _triggerCallback(callback?: Function) {
    isFunction(callback) && callback();
  }

  return function observeDeviceColorScheme() {
    return _triggerCallback;
  };
})();

export default observeDeviceColorScheme;
