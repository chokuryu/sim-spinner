
describe('experiment for jest matcher', () => {
  test('aaaaa', () => {

    // これらはおそらく条件式と同じマッチンッグを想定するもの
    // つまり、条件式にかけた結果として期待する場合に使う
    expect(1).toBeTruthy()
    expect('hello').toBeTruthy()
    expect(0).toBeFalsy()
    expect('').toBeFalsy()

    // なので値が真偽値であることを検証するなら toBe(true or false) を使うべき
    expect(!true).toBe(false)
    expect('').not.toBe(false)

    // null, undefined は実はマッチング条件が意外とわかりにくいのでなるべく専用を使うと良いのかな？
    // ただ、別に toBe(null or undefined) でもほとんど問題ない気はする
    expect(null).toBe(null)
    expect(null).toBeNull()
    expect(false).not.toBe(null)
    expect('').not.toBe(null)

    expect(null).not.toBe(undefined)
    expect(null).not.toBeUndefined()
    expect(undefined).toBe(undefined)
    expect(undefined).toBeUndefined()
    const obj = {}
    expect(obj.foo).toBe(undefined)
    expect(obj.foo).toBeUndefined()
    obj.foo = 1
    delete obj.foo
    expect(obj.foo).toBe(undefined)
    expect(obj.foo).toBeUndefined()
    obj.foo = undefined
    expect(obj.foo).toBe(undefined)
    expect(obj.foo).toBeUndefined()

    expect(varuable).toBe(undefined)
    expect(varuable).toBeUndefined()
    var varuable = 1

    //
    const gs = {
      get undef () {
        return undefined
      },
      set some (val) {

      }
    }
    expect(gs.undef).toBe(undefined)
    expect(gs.undef).toBeUndefined()
    expect(gs.some).toBe(undefined)
    expect(gs.some).toBeUndefined()

    // 結果が異なるケース。Babelが挟まってるし詳細はよくわからん。こんな特殊なことまずないし。
    // 変数undefinedの中身を変えちゃった場合。
    {
      let undefined = 1
      expect(undefined).toBe(undefined)// たぶん v === v -> matched
      expect(undefined).not.toBeUndefined()// たぶん typeof v === 'undefined' -> not matched
    }

  })
})


describe('which is earlier?', () => {

  let v = 0

  describe('which is earlier?', () => {

    test('async', (done) => {
      Promise.resolve()
      .then(() => {
        return new Promise( resolve => {
          setTimeout(resolve, 100)
        })
      })
      .then(() => {
        expect(v).toBe(0)
        v = 1
        done()
      })
    })

  })

  test('sync', () => {
    expect(v).toBe(1)
  })
})



