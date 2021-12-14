export { setAttributes }

const setAttributes = (element: HTMLElement, data: Record<string, string>) => {
  for (const key in data) element.setAttribute(key, data[key])
}
