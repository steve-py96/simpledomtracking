import { mockElement } from './mock'

describe('testing the mockElement', () => {
  it('it mocks properly', () => {
    expect(JSON.stringify(mockElement({}))).toBe(JSON.stringify({ hasAttribute: () => {}, attributes: [] }))

    expect(JSON.stringify(mockElement({ test: '1' }))).toBe(
      JSON.stringify({
        hasAttribute: () => false,
        attributes: [{ name: 'test', value: '1' }],
        test: '1',
      })
    )
  })
})
