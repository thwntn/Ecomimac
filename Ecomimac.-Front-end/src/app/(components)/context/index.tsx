import { ReactNode } from "react"
import Icon from "../icon"
import themes from "./index.module.scss"
import clsx from "clsx"
import RenderIf from "../render-if"
import { CustomIconNames, LEFT, Position, RIGHT, Status } from "../common"
import Image from "../image"

export class ContextElement {
  constructor(icon: string, label: ReactNode, callback?: VoidFunction) {
    this.callback = callback
    this.label = label
    this.icon = icon
  }
  callback?: VoidFunction
  label: ReactNode
  icon: string
}

const Context = ({
  items,
  icon,
  trigger,
  position,
}: {
  items: ContextElement[]
  icon?: string
  trigger?: ReactNode
  position?: Position
}) => {
  return (
    <div className={themes.frame}>
      <RenderIf reference={trigger} render={() => trigger}></RenderIf>
      <RenderIf
        reference={trigger === undefined}
        render={() => <Icon dir={icon || CustomIconNames.CONTEXT}></Icon>}
      ></RenderIf>
      <ul
        className={clsx(themes.context, {
          [themes.right]: position === RIGHT,
          [themes.left]: position === LEFT,
        })}
      >
        {items.map((item, index) => (
          <li key={index} className={themes.item} onClick={item.callback}>
            <Image dir={item.icon} width={20} height={20}></Image>
            <div>{item.label}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Context
