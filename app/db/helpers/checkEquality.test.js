const ce = require('./checkEquality')

describe('db/checkEquality', () => {
  const check = ([v1, v2], result) => {
    expect(ce(v1, v2)).toBe(result)
    expect(ce(v2, v1)).toBe(result)
  }

  test('should work with the primitives', () => {
    check([undefined, undefined], true)
    check([undefined, null], false)
    check([null, null], true)
    check([true, false], false)
    check([true, true], true)
    check([false, false], true)
    check(['', ''], true)
    check(['str', 'str'], true)
    check([0, ''], false)
    check([0, 0], true)
    check([1, 1], true)
    check([22.33, 22.33], true)
    check([Infinity, Infinity], true)
  })

  test('should work with the complex structures', () => {
    check([undefined, {}], false)
    check([{}, null], false)
    check([[], {}], false)

    const arr1 = []
    const arr2 = []
    const arrs = [arr1, arr2]
    check(arrs, true)
    arr1.push(1)
    check(arrs, false)
    arr2.push(1)
    check(arrs, true)
    arr1.push({ some: { very: { nested: { prop: 123 } } } })
    arr2.push({ some: { very: { nested: { prop: 123 } } } })
    check(arrs, true)

    const obj1 = {}
    const obj2 = {}
    const objs = [obj1, obj2]
    check(objs, true)
    obj1.one = 1
    check(objs, false)
    obj2.two = 2
    obj2.one = 1
    obj1.two = 2
    check(objs, true)
    obj1.nested = { arr: [1, [2]] }
    obj2.nested = { arr: [1, [2]] }
    check(objs, true)

    const set1 = new Set()
    const set2 = new Set()
    const sets = [set1, set2]
    check(sets, true)
    set1.add(1)
    check(sets, false)
    set2.add(1)
    check(sets, true)
    set1.add({ some: { very: { nested: { prop: 123 } } } })
    set2.add({ some: { very: { nested: { prop: 123 } } } })
    check(sets, true)
    set1.add(4)
    set2.add(5)
    set1.add(5)
    set2.add(4)
    check(sets, false)

    const map1 = new Map()
    const map2 = new Map()
    const maps = [map1, map2]
    check(maps, true)
    map1.set('one', 1)
    check(maps, false)
    map2.set('one', 1)
    check(maps, true)
    map1.set('some', { very: { nested: { prop: 123 } } })
    map2.set('some', { very: { nested: { prop: 123 } } })
    check(maps, true)
  })
})
