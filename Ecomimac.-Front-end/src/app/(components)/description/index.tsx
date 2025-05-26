import { HTMLAttributes } from "react"
import themes from "./index.module.scss"
import clsx from "clsx"

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  lineClamp?: number
}

const Description = (props: IProps) => {
  const customProps = Object.assign({}, props)

  customProps.style = { ...props.style, WebkitLineClamp: props.lineClamp }
  customProps.className = clsx(props.className, themes.description, {
    [themes.lineClamp]: props.lineClamp,
  })

  delete customProps.lineClamp
  return <p {...customProps}></p>
}

export default Description
