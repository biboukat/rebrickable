export function* flowResult<T>(
  promise: Promise<T>,
): Generator<Promise<T>, T, T> {
  return yield promise;
}
