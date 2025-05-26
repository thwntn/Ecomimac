import { ReactNode } from "react"
import themes from "./index.module.scss"
export type ActionFunction<T> = ((item: T[]) => ReactNode)[]

const Actions = function <T>({
  action,
  current,
}: {
  action: ActionFunction<T>
  current: T
}) {
  return (
    <div className={themes.frame} onClick={(event) => event.stopPropagation()}>
      <div className={themes.wrapper}>
        <ul className={themes.action}>
          {action.map((action, index) => (
            <div key={index}>{action([current])}</div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Actions
