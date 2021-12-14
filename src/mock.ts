export { mockElement }

function hasAttribute(this: Record<string, unknown>, name: string) {
  return !!this[name]
}

const mockElement = (data: Record<string, string>): HTMLElement => {
  const attributes: Array<Attr> = []
  for (const key in data) attributes.push({ name: key, value: data[key] } as Attr)

  return Object.assign(data, { hasAttribute, attributes }) as unknown as HTMLElement
}
