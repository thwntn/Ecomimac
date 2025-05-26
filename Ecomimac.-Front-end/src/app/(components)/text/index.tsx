import clsx from "clsx"
import { InputHTMLAttributes } from "react"
import themes from "./index.module.scss"
import { Status } from "../common"

interface IInputCustom extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  validated?: Status
}

const Text = (props: IInputCustom) => {
  const inputCustomProps = Object.assign({}, props)
  inputCustomProps.className = clsx(props.className, themes.input, {
    [themes.error]: props.error,
  })
  return (
    <div className={themes.frame}>
      <div className={themes.wrapper}>
        {props.label && <span className={themes.label}>{props.label}</span>}
        <textarea {...inputCustomProps} />
      </div>
      {props.validated === 0 && props.error && (
        <span className={themes.message}>{props.error}</span>
      )}
    </div>
  )
}

export default Text
