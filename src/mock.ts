import type { StringDict } from './types'

function hasAttribute(this: { [key: string]: string }, name: string) {
  return !!this[name]
}

export const mockElement = (data: StringDict): HTMLElement => {
  const attributes = []
  for (const key in data) attributes.push({ name: key, value: data[key] })

  return (Object.assign({ hasAttribute, attributes }, data) as {}) as HTMLElement
}
