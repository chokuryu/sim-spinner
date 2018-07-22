
import { shallowMount } from '@vue/test-utils'
import sinon from 'sinon'

import Store from '@/scripts/Store'
import '../helper/__SetupStore'
import CircleEditorView from '@/components/CircleEditorView'


//console.log(Store.a)


describe('CircleEditorView - unit', () => {

  Store.destroy()
  Store.initializeForTest()

  const mock = {
    id: 'fake',
    name: 'circle1',
    type: 'CIRCLE',
    radius: 60,
    speed: 0.6,
    posY: 0,
    colorR: 75,
    colorG: 164,
    colorB: 230,
    thin: 2
  }
  const wrapper = shallowMount(CircleEditorView, {
    data () {
      return mock
    }
  })
  const wEl = wrapper.find({ ref: 'colorR_frame' })

  it('should render correct contents', () => {
    expect(wrapper.is(CircleEditorView)).toBe(true)
    expect(wEl.find('input').element.value).toBe('75')
    //
    expect(wrapper.element).toMatchSnapshot();
  })

  it('should be reactive', () => {
    mock.colorR += 2
    expect(wEl.find('input').element.value).toBe('77')
  })

})


describe('CircleEditorView - with store', () => {

  Store.destroy()
  Store.initializeForTest()

  const fid = 'f_1'
  const wrapper = shallowMount(CircleEditorView, {
    propsData: {
      fid: fid
    }
  })

  it('should render for the store data', () => {
    expect(wrapper.is(CircleEditorView)).toBe(true)
    expect(typeof wrapper.vm.colorR).toBe('number')
  })

  it('publish update info for store when value changed', () => {
    const spy = sinon.stub()
    Store.subscribeFactorUpdate(fid, () => {
      spy()
    })
    expect(spy.calledOnce).toBe(false)
    wrapper.vm.colorR = 50
    expect(spy.calledOnce).toBe(true)
  })

})
