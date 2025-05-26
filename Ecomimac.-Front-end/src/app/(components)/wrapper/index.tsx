import clsx from "clsx"
import themes from "./index.module.scss"
import Skeleton from "./skeleton"
import { OFF, ON, Properties, Status } from "../common"
import RenderIf from "../render-if"

interface IProps extends Properties {
  isLoad?: Status
  padding?: number
  gap?: number
}

const Wrapper = (props: IProps) => {
  const customProps = Object.assign({}, props)

  customProps.className = clsx(props.className, themes.frame)
  customProps.style = { ...props.style, gap: props.gap, padding: props.padding }
  delete customProps.gap
  delete customProps.isLoad
  delete customProps.padding

  return (
    <div {...customProps}>
      <RenderIf
        reference={props.isLoad === ON}
        render={() => <Skeleton></Skeleton>}
      ></RenderIf>
      <RenderIf
        reference={props.isLoad === undefined || props.isLoad == OFF}
        render={() => props.children}
      ></RenderIf>
    </div>
  )
}

export default Wrapper
