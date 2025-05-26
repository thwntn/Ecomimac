import { HTMLAttributes } from "react"
import themes from "./index.module.scss"
import clsx from "clsx"

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  size?: number
  lineClamp?: number
}

const Content = (props: IProps) => {
  const customProps = Object.assign({}, props)

  const custom = {
    WebkitLineClamp: props.lineClamp,
    fontSize: props.size,
  }

  customProps.style = Object.assign(custom, props.style)
  customProps.className = clsx(props.className, themes.content, {
    [themes.lineClamp]: props.lineClamp,
  })

  delete customProps.lineClamp
  return <p {...customProps}></p>
}

export default Content
