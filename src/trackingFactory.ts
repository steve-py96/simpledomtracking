const data = 'data-'

export { trackingFactory }

const trackingFactory: Sdt.TrackingFactory = (obj, detectionKey, options) => {
  const { prefix } = options || {}
  const safePrefix = prefix || 'track'
  const trackingKeyDictionary: Record<string, keyof typeof obj> = {}
  const DOMKeyDictionary: Record<keyof typeof obj, string> = {} as Record<keyof typeof obj, string>
  const prefixString = (str: string) => `${data}${safePrefix}-${str}`

  for (const key in obj) {
    const value = prefixString(obj[key])

    trackingKeyDictionary[value] = key
    DOMKeyDictionary[key] = value
  }

  const detectionAttribute = detectionKey(DOMKeyDictionary)
  const isTracking = (element: HTMLElement) => element.hasAttribute(detectionAttribute)

  return {
    create: callback => callback(DOMKeyDictionary),
    isTracking,
    getTrackingData: (element: HTMLElement) => {
      const re: Record<string, string> = {}

      Array.prototype.forEach.call<NamedNodeMap, [(element: Attr) => void], void>(element.attributes, element => {
        if (!element.name.indexOf(data + safePrefix)) re[trackingKeyDictionary[element.name]] = element.value || ''
      })

      return re
    },
  }
}
