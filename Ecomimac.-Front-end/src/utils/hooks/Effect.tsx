import { EffectCallback, useEffect } from "react"

export const useEffectOnce = (effectCallback: EffectCallback) => {
  useEffect(effectCallback, []) // eslint-disable-line react-hooks/exhaustive-deps
  return
}
