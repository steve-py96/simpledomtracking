export {}

declare global {
  namespace Sdt {
    interface TrackingFactoryOptions {
      prefix?: string
    }

    type TrackingFactory = <T extends string>(
      obj: Record<T, string>,
      detectionKey: (params: typeof obj) => typeof obj[T],
      options?: TrackingFactoryOptions
    ) => {
      create: (callback: (param: Record<T, string>) => Record<string, string>) => Record<string, string>
      isTracking: (element: HTMLElement) => boolean
      getTrackingData: (element: HTMLElement) => Record<string, string>
    }
  }
}
