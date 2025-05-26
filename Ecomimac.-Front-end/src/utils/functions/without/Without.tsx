import { Fragment, ReactNode } from "react"
import { create } from "zustand"
import WithoutUI from "./Without.render"

export interface IStore {
  status: boolean
  node: ReactNode
  beside: boolean
  append: (status: boolean, node: ReactNode) => void
  setBeside: (status: boolean) => void
}

export class IWithout {
  append: (node: ReactNode) => void
  close: VoidFunction
}

export const withStore = create<IStore>((set) => ({
  beside: false,
  node: <Fragment />,
  status: false,
  /**
   * Set animation open overlay
   * @description
   * @param status
   * @returns
   */
  setBeside: (status: boolean) =>
    set((state) => ({ ...state, beside: status })),

  /**
   *
   * Insert overlay display
   * @description
   * @param status
   * @param node
   * @returns
   */
  append: (status, node) => set({ status, node }),
}))

export const useWithout = function () {
  const store = withStore()

  const append = (node: ReactNode) => {
    store.append(true, node)
    store.setBeside(true)
  }

  const close = () => {
    store.setBeside(false)
    store.append(false, <Fragment />)
  }
  return { append, close }
}

const Without = () => {
  const store = withStore()
  return <WithoutUI store={store} />
}

export default Without
