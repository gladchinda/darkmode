function noop(): void {}

function isFunction(value): boolean {
  return typeof value === 'function';
}

function isUndefined(value): boolean {
  return typeof value === 'undefined' && value === undefined;
}

export {
  noop,
  isFunction,
  isUndefined
};
