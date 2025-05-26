import themes from "./index.module.scss"
import clsx from "clsx"
import { OFF, ON, Properties, Status } from "../common"
import { Fragment } from "react"
import RenderIf from "../render-if"
import Editable from "./editable"

interface IInputCustom extends Properties {
  onChange?: (htmlContent: string) => void
  staticMode?: Status
  placeholder?: string
  label?: string
  validated?: Status
  icon?: string
  error?: string
  silent?: Status
  value: string
}

const Editor = (props: IInputCustom) => {
  const inputCustomProps = Object.assign({}, props)

  inputCustomProps.className = clsx(props.className, themes.input, {
    [themes.space]: props.icon,
  })

  delete inputCustomProps.silent
  delete inputCustomProps.onChange
  return (
    <div className={themes.frame}>
      <div
        className={clsx({
          [themes.wrapper]:
            props.staticMode === undefined || props.staticMode === OFF,
          [themes.silent]: props.silent === ON,
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
              status === ON && (
                <div {...inputCustomProps} onChange={undefined}>
                  {props.value}
                </div>
              )
            }
          ></RenderIf>
          <RenderIf
            reference={props.silent === undefined || props.silent === OFF}
            render={() => (
              <Editable
                staticMode={props.staticMode}
                onChange={props.onChange}
                htmlContent={props.value}
              ></Editable>
            )}
          ></RenderIf>
        </Fragment>
      </div>
      {props.validated === OFF && props.error && (
        <span className={themes.message}>{props.error}</span>
      )}
    </div>
  )
}

export default Editor
