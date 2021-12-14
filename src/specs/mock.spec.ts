import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { JSDOM } from 'jsdom'
import { mockElement, setAttributes } from '..'

const { window: jswin } = new JSDOM('<div></div>')

test('"mockElement(..)" creates a mocked HTMLElement with the necessary properties', () => {
  const element = mockElement({})

  assert.type(element.hasAttribute, 'function')
  assert.type(element.attributes, 'object')
  assert.ok(Array.isArray(element.attributes))
  assert.type(element.dataset, 'undefined') // we don't have unnecessary things
})

test('"element.hasAttribute(..)" detects properly if the element contains an attribute', () => {
  const element = mockElement({
    id: 'whoop',
    'data-test': '123',
  })

  assert.ok(element.hasAttribute('id'))
  assert.ok(element.hasAttribute('data-test'))
  assert.not.ok(element.hasAttribute('data-hans'))
})

test('"element.attributes" behaves like a real namednodemap', () => {
  const element = mockElement({
    id: 'whoop',
    'data-test': '123',
  })

  const realElement = jswin.document.createElement('div')
  setAttributes(realElement, {
    id: 'whoop',
    'data-test': '123',
  })

  // it's natively already an attribute array actually
  const mockedAttributes = Array.from(element.attributes)
  const realAttributes = Array.from(realElement.attributes)

  assert.is(mockedAttributes.length, realAttributes.length)
  assert.equal(mockedAttributes.map(attr => attr.name).sort(), realAttributes.map(attr => attr.name).sort())
})

test.run()
