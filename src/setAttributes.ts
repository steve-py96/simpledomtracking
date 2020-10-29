export const setAttributes = (element: HTMLElement, data: {}) => {
  for (const key in data) element.setAttribute(key, data[key])
}
