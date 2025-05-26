import { Fragment, HTMLAttributes, ReactNode, useState } from "react"
import themes from "./index.module.scss"
import clsx from "clsx"
import Skeleton from "./skeleton"
import { ON, Status } from "../common"
import RenderIf from "../render-if"

interface IOverlayCustom extends HTMLAttributes<HTMLDivElement> {
  onExit?: VoidFunction
  loading?: Status
  width?: number
}

const Overlay = (props: IOverlayCustom) => {
  const popupCustom = Object.assign({}, props)
  const [animation, updateAnimation] = useState(false)

  popupCustom.className = clsx(props.className, themes.wrapper, {
    [themes.wrapperOut]: animation,
  })
  popupCustom.onClick = (event) => event.stopPropagation()
  popupCustom.style = { ...props.style, width: props.width }

  delete popupCustom.onExit
  delete popupCustom.loading

  const onExit = function () {
    updateAnimation(true)
    props.onExit && setTimeout(props.onExit, 200)
  }

  return (
    <Fragment>
      <div
        className={clsx(themes.frame, { [themes.frameOut]: animation })}
        onClick={onExit}
      >
        <div {...popupCustom}>
          <RenderIf
            reference={props.loading}
            render={(item) => item === ON && <Skeleton />}
          ></RenderIf>

          <div className={themes.element}>{props.children}</div>
        </div>
      </div>
    </Fragment>
  )
}

export default Overlay
