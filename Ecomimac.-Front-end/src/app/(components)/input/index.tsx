import clsx from "clsx"
import { ChangeEvent, Fragment, InputHTMLAttributes, useState } from "react"
import themes from "./index.module.scss"
import { OFF, Status } from "../common"
import RenderIf from "../render-if"
import Image from "../image"

const INPUT_TYPE_TEXT = "text"

interface IInputCustom extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  validated?: Status
  icon?: string
  error?: string
  silent?: boolean
  format?: (text: string) => string
}

const Input = (props: IInputCustom) => {
  const [value, set] = useState<string>()
  const inputCustomProps = Object.assign({}, props)
  const typeInput = props.type ? props.type : INPUT_TYPE_TEXT

  inputCustomProps.className = clsx(props.className, themes.input, {
    [themes.space]: props.icon,
  })

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange === undefined) return
    set(event.target.value)
    props.onChange(event)
  }

  inputCustomProps.onChange = onChange
  delete inputCustomProps.silent
  return (
    <div className={clsx(themes.frame, { [themes.auto]: props.silent })}>
      <RenderIf
        reference={props.icon}
        render={() => (
          <Image
            className={themes.icon}
            dir={props.icon}
            height={18}
            width={18}
          />
        )}
      ></RenderIf>

      <div
        className={clsx(themes.wrapper, {
          [themes.silent]: props.silent,
          [themes.error]: props.error,
        })}
      >
        <RenderIf
          reference={props.label}
          render={() => <span className={themes.label}>{props.label}</span>}
        ></RenderIf>

        <Fragment>
          <RenderIf
            reference={props.silent}
            render={(status) =>
              status && <div {...inputCustomProps}>{props.value}</div>
            }
          ></RenderIf>

          <div className={themes.format}>
            <RenderIf
              reference={props.silent === undefined || props.silent === false}
              render={() => <input {...inputCustomProps} type={typeInput} />}
            ></RenderIf>

            <RenderIf
              reference={value}
              render={(value) => (
                <RenderIf
                  reference={props.format}
                  render={(format) => (
                    <div className={themes.text}>{format(value)}</div>
                  )}
                />
              )}
            ></RenderIf>
          </div>
        </Fragment>
      </div>

      <RenderIf
        reference={props.validated === OFF && props.error}
        render={() => <span className={themes.message}>{props.error}</span>}
      ></RenderIf>
    </div>
  )
}

export default Input
