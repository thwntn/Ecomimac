import { create } from "zustand"
import ConfirmUI from "./Confirm.render"
import { withStore } from "../without/Without"
import { ReactNode, useEffect } from "react"
import { useEffectOnce } from "@/utils/hooks"

const DEFAULT_CONTENT = {
  title: "Xác nhận thao tác",
  description:
    "Bạn có chắc muốn thực hiện hành động này, thao tác sẽ không thể hoàn tác.",
}

export interface Content {
  title: string
  description: string
}

export interface IStore {
  content: Content
  callback: undefined | Function
  extension: ReactNode | undefined
  open: (
    callback: VoidFunction,
    content?: Content,
    extension?: ReactNode
  ) => void
  close: VoidFunction
}

const INITIAL_STORE = {
  extension: undefined,
  content: DEFAULT_CONTENT,
  callback: undefined,
}

const useStore = create<IStore>((set) => ({
  ...INITIAL_STORE,
  open: (callback, content, extension) => set({ callback, content, extension }),
  close: () => set(INITIAL_STORE),
}))

export const useConfirm = () => {
  const store = useStore()
  const main = withStore()

  const open = (
    callback: VoidFunction,
    content: Content = DEFAULT_CONTENT,
    extension: ReactNode = undefined
  ) => {
    store.open(callback, content, extension)
    main.setBeside(true)
  }

  return open
}

const Confirm = () => {
  const without = withStore()
  const store = useStore()
  const callback = store.callback

  const close = () => {
    store.close()
    without.setBeside(false)
  }
  return <ConfirmUI store={store} callback={callback} close={close} />
}

export default Confirm
