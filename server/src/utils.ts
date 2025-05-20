export function errString(a: unknown): string {
  if (
    a instanceof Error ||
    (isObj(a) && typeof a.message === 'string' && a.message)
  ) {
    return `${a.message}`;
  }
  return '(unknown error)';
}

export function isObj(a: unknown): a is Record<string, any> {
  return !!(a && typeof a === 'object');
}
