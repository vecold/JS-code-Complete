function createDeepProxy(target, handler) {
    const preproxy = new WeakMap();
  
    function makeHandler(path) {
      return {
        set(target, key, value, receiver) {
          if (value != null && typeof value === 'object') {
            value = proxify(value, [...path, key]);
          }
          target[key] = value;
  
          if (handler.set) {
            handler.set(target, [...path, key], value, receiver);
          }
          return true;
        },
  
        deleteProperty(target, key) {
          if (Reflect.has(target, key)) {
            unproxy(target, key);
            let deleted = Reflect.deleteProperty(target, key);
            if (deleted && handler.deleteProperty) {
              handler.deleteProperty(target, [...path, key]);
            }
            return deleted;
          }
          return false;
        }
      }
    }
  
     function unproxy(obj, key) {
      if (preproxy.has(obj[key])) {
        // console.log('unproxy',key);
        obj[key] = preproxy.get(obj[key]);
        preproxy.delete(obj[key]);
      }
  
      for (let k of Object.keys(obj[key])) {
        if (obj[key][k] != null && typeof obj[key][k] === 'object') {
          unproxy(obj[key], k);
        }
      }
    }
  
    function proxify(obj, path) {
      for (let key of Object.keys(obj)) {
        if (obj[key] != null && typeof obj[key] === 'object') {
          obj[key] = proxify(obj[key], [...path, key]);
        }
      }
      let p = new Proxy(obj, makeHandler(path));
      preproxy.set(p, obj);
      return p;
    }
  
    return proxify(target, []);
  }
  
  let obj = {
    foo: 'baz',
  }
  
  let proxied = createDeepProxy(obj, {
    set(target, path, value, receiver) {
      console.log('set', path.join('.'), '=', JSON.stringify(value));
    },
  
    deleteProperty(target, path) {
      console.log('delete', path.join('.'));
    }
  });
  
  // proxied.foo = 'bar';
  // proxied.deep = {}
  // proxied.deep.blue = 'sea';
  // proxied.null = null;
  // delete proxied.foo;
  // delete proxied.deep; // triggers delete on 'deep' but not 'deep.blue'
  // console.log(proxied)
  var buddyStrings = function(s, goal) {
    const sLen = s.length;
    const gLen = goal.length;
    if(sLen !==gLen) return false;
    let sum = 0;
    let cnt1 = new Array(26).fill(0);
    let cnt2 = new Array(26).fill(0);
    for(let i=0;i<sLen;i++) {
        let a = s[i].charCodeAt() - 'a'.charCodeAt();
        let b = goal[i].charCodeAt() - 'a'.charCodeAt();
        cnt1[a]++;
        cnt2[b]++;
        if(s[i]!==goal[i]) sum++;
    }
    let numsShowFlag = false;

    for(let i=0;i<26;i++) {
        if(cnt1[i]!==cnt2[i]) return false;
        if(cnt1[i] > 1) numsShowFlag = true;
    }
    return sum === 2 || (sum === 0 && numsShowFlag)
};
console.log(buddyStrings('ab','ba'))