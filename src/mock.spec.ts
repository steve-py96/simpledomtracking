import { mockElement } from './mock'

describe('testing the mockElement', () => {
  it('it mocks properly', () => {
    expect(JSON.stringify(mockElement({}))).toBe(JSON.stringify({ hasAttribute: () => {}, dataset: {} }))

    expect(JSON.stringify(mockElement({ test: 1 }))).toBe(
      JSON.stringify({
        hasAttribute: () => false,
        dataset: { test: 1 },
        test: 1,
      })
    )

    // no actual use-case tho
    const { test, dataset } = mockElement({ test: [] }) as HTMLElement & { test: {} }
    expect(test).toBe(dataset.test)
  })
})
