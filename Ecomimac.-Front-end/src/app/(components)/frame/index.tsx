import clsx from "clsx"
import { HTMLAttributes } from "react"
import themes from "./index.module.scss"

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const Frame = (props: IProps) => {
  const customProps = Object.assign({}, props)
  customProps.className = clsx(props.className, themes.frame)

  return (
    <div {...customProps}>
      <div className={themes.element}>{props.children}</div>
    </div>
  )
}

export default Frame
