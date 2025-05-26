import { IStore } from "./Without"

const WithoutUI = ({ store }: { store: IStore }) => {
  return store.status && store.node
}

export default WithoutUI
