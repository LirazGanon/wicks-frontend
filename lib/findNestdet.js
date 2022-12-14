const notUndefined = val => val !== undefined

function find (single, src, key, filter = notUndefined, debug, instances = []) {
  if (src && typeof src === 'object') {
    const items = Array.isArray(src)
      ? src.map(i => [undefined, i])
      : Object.entries(src)
    for (const [name, item] of items) {
      const match = key === name ? item : undefined
      try {
        if (filter(match)) {
          instances.push(match)
          if (single) {
            break
          }
        }
      } catch (err) {
        if (debug) {
          console.debug(err)
        }
      }
      if (item && typeof item === 'object') {
        find(single, item, key, filter, debug, instances)
      }
      if (single && instances.length) {
        break
      }
    }
    return single ? instances[0] : instances
  }
}

export const findNested = (src, key, filter, debug) =>

  find(true, src, key, filter, debug)

export const findAllNested = (src, key, filter, debug) =>

  find(false, src, key, filter, debug)