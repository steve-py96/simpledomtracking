import type { TrackingFactoryOptions, StringDict } from './types'

const data = 'data-'

export const trackingFactory = <T extends string>(
  obj: Record<T, string>,
  { detectionKey, customPrefix }: TrackingFactoryOptions<T>
) => {
  const prefix = customPrefix || 'track'
  const trackingKeyDictionary: Record<string, T> = {} as Record<string, T>
  const DOMKeyDictionary: Record<T, string> = {} as Record<T, string>
  const prefixString = (str: string) => `${data}${prefix}-${str}`

  for (const i in obj) {
    const key = prefixString(obj[i])

    trackingKeyDictionary[key] = i
    DOMKeyDictionary[i] = key
  }

  const detectionAttribute = detectionKey(DOMKeyDictionary)
  const isTracking = (element: HTMLElement) => element.hasAttribute(detectionAttribute)

  return {
    create: (callback: (param: Record<T, string>) => StringDict): StringDict => callback(DOMKeyDictionary),
    isTracking,
    getTrackingData: (element: HTMLElement) => {
      const re: StringDict = {}

      Array.prototype.forEach.call(element.attributes, element => {
        if (!element.name.indexOf(data + prefix)) re[trackingKeyDictionary[element.name]] = element.value || ''
      })

      return re
    },
  }
}
