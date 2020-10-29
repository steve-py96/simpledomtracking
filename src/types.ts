export interface TrackingFactoryOptions<T> {
  /*
    a key you surely provide on every element, also to identify those items as tracked ones
    common to use should be keys like category or similar
  */
  detectionKey: T
  /**
    allows a custom prefix, default is track (=> data-track-yourKey)
   */
  customPrefix?: string
}

/**
  just a key=string value=string object
 */
export type StringDict = Record<string, string>
