import { trackingFactory } from './index'
import { mockElement } from './mock'

// some testing tracking keys
type TestKey = 'KeyA' | 'KeyB' | 'KeyC'

describe('testing the tracking factory', () => {
  it('it returns the expected functions', () => {
    expect(
      JSON.stringify(
        trackingFactory<TestKey>({ KeyA: 'keyA', KeyB: 'keyB', KeyC: 'keyC' }, { detectionKey: params => params.KeyA })
      )
    ).toBe(
      JSON.stringify({
        create: () => ({}),
        getTrackingData: () => ({}),
        isTracking: () => true,
      })
    )
  })

  it('create creates the expected object to push into a DOM-element', () => {
    expect(
      trackingFactory<TestKey>(
        { KeyA: 'keyA', KeyB: 'keyB', KeyC: 'keyC' },
        { detectionKey: params => params.KeyA }
      ).create(keys => ({
        [keys.KeyA]: 'valueA',
        [keys.KeyB]: 'valueB',
      }))
    ).toMatchObject<{
      'data-track-keyA': string
      'data-track-keyB': string
    }>({
      'data-track-keyA': 'valueA',
      'data-track-keyB': 'valueB',
    })
  })

  it('create the expected object to push into a DOM-element with a custom prefix', () => {
    expect(
      trackingFactory<TestKey>(
        { KeyA: 'keyA', KeyB: 'keyB', KeyC: 'keyC' },
        { detectionKey: params => params.KeyA, customPrefix: 'hans' }
      ).create(keys => ({
        [keys.KeyA]: 'valueA',
        [keys.KeyB]: 'valueB',
      }))
    ).toMatchObject<{
      'data-hans-keyA': string
      'data-hans-keyB': string
    }>({
      'data-hans-keyA': 'valueA',
      'data-hans-keyB': 'valueB',
    })
  })

  it('detect if an element is tracked', () => {
    const simpleTracker = trackingFactory<TestKey>(
      { KeyA: 'keyA', KeyB: 'keyB', KeyC: 'keyC' },
      { detectionKey: params => params.KeyA }
    )

    expect(simpleTracker.isTracking(mockElement(simpleTracker.create(keys => ({ [keys.KeyA]: 'hihi' }))))).toBe(true)

    expect(simpleTracker.isTracking(mockElement({ fail: '1' }))).toBe(false)
  })

  it('get data from a tracked element', () => {
    const simpleTracker = trackingFactory<TestKey>(
      { KeyA: 'keyA', KeyB: 'keyB', KeyC: 'keyC' },
      { detectionKey: params => params.KeyA }
    )

    expect(
      simpleTracker.getTrackingData(mockElement(simpleTracker.create(keys => ({ [keys.KeyA]: 'hoho' }))))
    ).toMatchObject<{
      KeyA: string
    }>({
      KeyA: 'hoho',
    })
  })

  it('get data from a tracked element with custom prefix', () => {
    const simpleTracker = trackingFactory<TestKey>(
      { KeyA: 'keyA', KeyB: 'keyB', KeyC: 'keyC' },
      { detectionKey: params => params.KeyA, customPrefix: 'hans' }
    )

    expect(
      simpleTracker.getTrackingData(mockElement(simpleTracker.create(keys => ({ [keys.KeyA]: 'hoho' }))))
    ).toMatchObject<{
      KeyA: string
    }>({
      KeyA: 'hoho',
    })
  })
})
