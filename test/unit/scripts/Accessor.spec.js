import Accessor from '@/scripts/Store/Accessor'


//localStorage.setItem.mockClear();


const accessor = new Accessor()

test('default state', () => {
  expect(accessor.canUseLS).toBe(false)
  expect(accessor.sto).toBeNull()

  expect(accessor.checkExistData).toThrow()
})

test('do not access localstorage, though do not throw error.', () => {
  expect(accessor.load()).toBeNull()
  expect(accessor.save()).toBe(false)
  expect(accessor.clearAll()).toBe(false)
})


test('accessible localstorage', () => {
  expect(accessor.checkAccessibility()).toBe(false)
})


test('access localstorage', () => {

  //
  require('jest-localstorage-mock')
  const accessor = new Accessor()
  expect(accessor.checkAccessibility()).toBe(true)

  // You must set true manually to validate localstorage access.
  accessor.canUseLS = true

  expect(accessor.checkExistData()).toBe(false)

  accessor.clearAll()
  expect(accessor.load()).toBeNull()

  const obj = { foo: 1 }
  accessor.save(obj)
  expect(accessor.checkExistData()).toBe(true)
  expect(accessor.load()).toEqual(obj)

  accessor.clearAll()
  expect(accessor.load()).toBeNull()
})



