/**
 * Translation function, as given by i18next. The TFunction of rules-api types `options` as optional, which i18next 27 no
 * longer accepts: its `t` must be called either with a key alone or with defined options.
 */
export type TFunction = {
  (key: string | string[]): string
  (key: string | string[], options: Record<string, any>): string
}
