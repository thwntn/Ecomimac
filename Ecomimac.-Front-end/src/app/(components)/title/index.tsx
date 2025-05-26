import clsx from "clsx"
import { HTMLAttributes } from "react"
import themes from "./index.module.scss"
import Image from "../image"

interface IProps extends HTMLAttributes<HTMLDivElement> {
  icon?: string
  size?: number
  lineClamp?: number
}

const Title = (props: IProps) => {
  const customProps = Object.assign({}, props)

  customProps.style = {
    ...props.style,
    fontSize: props.size,
    WebkitLineClamp: props.lineClamp,
  }
  customProps.className = clsx(props.className, themes.title, {
    [themes.lineClamp]: props.lineClamp,
  })

  delete customProps.lineClamp
  delete customProps.icon
  return (
    <div className={themes.frame}>
      {props.icon && <Image dir={props.icon} width={16} height={16}></Image>}
      <div {...customProps}>{props.children}</div>
    </div>
  )
}

export default Title
