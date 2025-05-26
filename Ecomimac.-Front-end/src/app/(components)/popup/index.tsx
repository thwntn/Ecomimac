import { Fragment, HTMLAttributes, ReactNode, useState } from "react"
import themes from "./index.module.scss"
import clsx from "clsx"
import Skeleton from "./skeleton"
import { CustomIconNames, OFF, ON, Status } from "../common"
import RenderIf from "../render-if"
import Button from "../button"
import Image from "../image"

interface IPopupCustom extends HTMLAttributes<HTMLDivElement> {
  onExit?: VoidFunction
  isLoad?: Status
  trigger?: ReactNode
  name?: string
  width: number
}

const Popup = (props: IPopupCustom) => {
  const popupCustom = Object.assign({}, props)
  const [animation, updateAnimation] = useState(false)

  popupCustom.className = clsx(
    props.className,
    themes.wrapper,
    animation ? themes.out : themes.in
  )
  popupCustom.onClick = (event) => event.stopPropagation()
  popupCustom.style = Object.assign({ width: props.width }, props.style)

  delete popupCustom.onExit
  delete popupCustom.isLoad

  const onExit = function () {
    updateAnimation(true)
    props.onExit && setTimeout(props.onExit, 240)
  }

  return (
    <Fragment>
      <div onClick={onExit} className={clsx(themes.frame)}>
        <div {...popupCustom}>
          <RenderIf
            reference={props.isLoad}
            render={(item) => item === ON && <Skeleton />}
          ></RenderIf>

          <RenderIf
            reference={props.isLoad === OFF || props.isLoad === undefined}
            render={() => (
              <Fragment>
                <RenderIf
                  reference={props.name}
                  render={() => (
                    <div className={themes.header}>
                      <Image
                        dir={CustomIconNames.FORM}
                        width={16}
                        height={16}
                      ></Image>
                      <span className={themes.name}>{props.name}</span>
                    </div>
                  )}
                ></RenderIf>

                <div
                  className={clsx(themes.element, {
                    [themes.isForm]: props.name && props.trigger,
                  })}
                >
                  {props.children}
                </div>

                <RenderIf
                  reference={props.trigger}
                  render={() => (
                    <div className={themes.action}>
                      <Button icon={CustomIconNames.CLOSE} onClick={onExit}>
                        Đóng cửa sổ
                      </Button>
                      <RenderIf
                        reference={
                          props.trigger &&
                          (props.isLoad === OFF || props.isLoad === undefined)
                        }
                        render={() => props.trigger}
                      ></RenderIf>
                    </div>
                  )}
                ></RenderIf>
              </Fragment>
            )}
          ></RenderIf>
        </div>
      </div>
    </Fragment>
  )
}

export default Popup
