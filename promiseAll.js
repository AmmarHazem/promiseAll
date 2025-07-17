/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
export default function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const results = [];
    let resolveCount = 0;
    if (!iterable?.length) {
      resolve(results);
      return;
    }
    iterable.forEach((promise, index) => {
      if (!promise.then) {
        results[index] = promise;
        resolveCount += 1;
        if (resolveCount === iterable.length) {
          resolve(results);
        }
        return;
      }
      promise
        .then((value) => {
          results[index] = value;
          resolveCount += 1;
          if (resolveCount === iterable.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}
