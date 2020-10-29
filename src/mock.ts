function hasAttribute(this: { [key: string]: string }, name: string) {
  return !!this[name]
}

export const mockElement = (data: {}): HTMLElement =>
  Object.assign({ hasAttribute, dataset: data }, data) as HTMLElement
