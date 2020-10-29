import type { TrackingFactoryOptions, StringDict } from './types'

export const trackingFactory = <T extends string>(
  obj: Record<T, string>,
  { detectionKey, customPrefix }: TrackingFactoryOptions<T>
) => {
  const prefix = `data-${customPrefix || 'track'}-`
  const trackingKeyDictionary: Record<string, T> = {} as Record<string, T>
  const DOMKeyDictionary: Record<T, string> = {} as Record<T, string>
  const prefixString = (str: string) => `${prefix}${str}`

  for (const i in obj) {
    const key = prefixString(obj[i])
    trackingKeyDictionary[key] = i
    DOMKeyDictionary[i] = key
  }

  const isTracking = (element: HTMLElement) => element.hasAttribute(DOMKeyDictionary[detectionKey])

  return {
    create: (callback: (param: Record<T, string>) => StringDict): StringDict => callback(DOMKeyDictionary),
    isTracking,
    getTrackingData: (element: HTMLElement) => {
      const re: StringDict = {}

      for (const key in element.dataset) {
        if (key.indexOf(prefix) === 0) re[trackingKeyDictionary[key]] = element.dataset[key] || ''
      }

      return re
    },
  }
}
