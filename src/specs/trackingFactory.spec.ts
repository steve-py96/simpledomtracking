import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { mockElement, trackingFactory } from '..'

test('"trackingFactory(..)" returns the expected functions', () => {
  const factory = trackingFactory(
    {
      keyA: 'someValue',
      keyB: 'someValue',
      keyC: 'someValue',
    },
    keys => keys.keyA
  )

  assert.type(factory.create, 'function')
  assert.type(factory.getTrackingData, 'function')
  assert.type(factory.isTracking, 'function')
})

test('"factory.create(..)" creates the expected object to push into a DOM-element', () => {
  const factory = trackingFactory({ KeyA: 'keyA', KeyB: 'keyB', KeyC: 'keyC' }, keys => keys.KeyA)

  const attrs = factory.create(keys => ({
    [keys.KeyA]: 'valueA',
    [keys.KeyB]: 'valueB',
  }))

  assert.equal(attrs, {
    'data-track-keyA': 'valueA',
    'data-track-keyB': 'valueB',
  })
})

test('"factory.create(..)" creates the expected object to push into a DOM-element (with custom prefix)', () => {
  const factory = trackingFactory({ KeyA: 'keyA', KeyB: 'keyB', KeyC: 'keyC' }, keys => keys.KeyA, {
    prefix: 'customPrefix',
  })

  const attrs = factory.create(keys => ({
    [keys.KeyA]: 'valueA',
    [keys.KeyB]: 'valueB',
  }))

  assert.equal(attrs, {
    'data-customPrefix-keyA': 'valueA',
    'data-customPrefix-keyB': 'valueB',
  })

  assert.type(attrs['data-customPrefix-keyA'], 'string')
  assert.type(attrs['data-customPrefix-keyB'], 'string')
})

test('"factory.isTracking(..)" detect if an element is tracked', () => {
  const factory = trackingFactory({ KeyA: 'keyA', KeyB: 'keyB', KeyC: 'keyC' }, params => params.KeyA)
  const notTrackedElement = mockElement({})
  const notTrackedElement2 = mockElement({
    ...factory.create(keys => ({
      [keys.KeyB]: ':o', // no detection key => not tracked
    })),
  })
  const trackedElement = mockElement({
    ...factory.create(keys => ({
      [keys.KeyA]: ':o',
    })),
  })

  assert.is(factory.isTracking(notTrackedElement), false)
  assert.is(factory.isTracking(notTrackedElement2), false)
  assert.is(factory.isTracking(trackedElement), true)
})

test('"factory.getTrackingData(..)" gets data of a tracked element', () => {
  const factory = trackingFactory({ KeyA: 'keyA', KeyB: 'keyB', KeyC: 'keyC' }, params => params.KeyA)
  const trackedElement = mockElement({
    ...factory.create(keys => ({
      [keys.KeyA]: ':o',
    })),
  })

  assert.equal(factory.getTrackingData(trackedElement), {
    KeyA: ':o',
  })
})

test('"factory.getTrackingData(..)" gets data of a tracked element (with custom prefix)', () => {
  const factory = trackingFactory({ KeyA: 'keyA', KeyB: 'keyB', KeyC: 'keyC' }, params => params.KeyA, {
    prefix: 'customPrefix',
  })
  const trackedElement = mockElement({
    ...factory.create(keys => ({
      [keys.KeyA]: ':o',
    })),
  })

  assert.equal(factory.getTrackingData(trackedElement), {
    KeyA: ':o',
  })
})

test.run()
