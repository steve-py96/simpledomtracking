import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { JSDOM } from 'jsdom'
import { setAttributes } from '..'

const { window: jswin } = new JSDOM('<div></div>')

test('"setAttributes(..)" puts multiple attributes at once onto an element properly', () => {
  const realElement1 = jswin.document.createElement('div')
  const realElement2 = jswin.document.createElement('div')
  const addedAttributes = {
    id: 'test',
    'data-id': 'test-data',
  }

  setAttributes(realElement1, {})
  setAttributes(realElement2, addedAttributes)

  const attributes1 = Array.from(realElement1.attributes)
  const attributes2 = Array.from(realElement2.attributes)

  assert.is(attributes1.length, 0)
  assert.is(attributes2.length, 2)
  assert.equal(attributes2.map(attr => attr.name).sort(), Object.keys(addedAttributes).sort())
})

test.run()
