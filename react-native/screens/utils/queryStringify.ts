function hasOwnProperty<X extends {}, Y extends PropertyKey>(
    obj: X,
    prop: Y
  ): boolean {
    return obj.hasOwnProperty.call(obj, prop);
  }
  
  export function queryStringify<T extends { [K in keyof T]: T[K] }>(
    obj: T,
    prefix?: string
  ): string {
    const pairs: string[] = [];
    for (const key in obj) {
      if (!hasOwnProperty(obj, key)) continue;
      const value = obj[key];
      const enkey = encodeURIComponent(key);
      let pair;
      if (typeof value === 'object') {
        pair = queryStringify(value, prefix ? prefix + '[' + enkey + ']' : enkey);
      } else {
        pair =
          (prefix ? prefix + '[' + enkey + ']' : enkey) +
          '=' +
          encodeURIComponent(value);
      }
      pairs.push(pair);
    }
    return pairs.join('&');
  }