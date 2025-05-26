import { MouseEvent } from "react"
import themes from "./index.module.scss"
import clsx from "clsx"
import { ON, Properties, Status, convert } from "../common/Types"
import Image from "../image"

interface IProps extends Properties {
  loading?: Status
  icon?: string
  sm?: boolean
  main?: boolean
}

const Button = (props: IProps) => {
  const customProps = Object.assign({}, props)
  customProps.className = clsx(props.className, themes.button, {
    [themes.loading]: props.loading === ON,
    [themes.main]: props.main,
    [themes.sm]: props.sm,
  })

  const onClick = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    props.loading === ON || (props.onClick && props.onClick(event))
  }

  delete customProps.main
  return (
    <button {...customProps} onClick={(event) => onClick(event)}>
      {props.loading === ON && <div className={themes.loader}></div>}
      {props.icon && <Image dir={props.icon} width={16} height={16} />}
      <div className={themes.children}>{props.children}</div>
    </button>
  )
}

export default Button
