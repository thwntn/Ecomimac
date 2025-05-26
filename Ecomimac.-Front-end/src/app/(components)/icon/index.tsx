import clsx from "clsx"
import { Properties } from "../common/Types"
import themes from "./index.module.scss"
import RenderIf from "../render-if"
import Image from "../image"

const defaultIconSize = 20

interface IProps extends Properties {
  content?: string
  reflect?: boolean
  indicator?: number
  size?: number
  dir: string
  onClick?: VoidFunction
}

const Icon = (props: IProps) => {
  const customProps = Object.assign({}, props)
  customProps.className = clsx(themes.frame, props.className, {
    [themes.description]: props.onClick,
  })

  delete customProps.reflect
  return (
    <div {...customProps}>
      <RenderIf
        reference={props.indicator}
        render={(indicator) => (
          <div className={themes.indicator}>{indicator}</div>
        )}
      />
      <Image
        dir={props.dir}
        width={props.size ?? defaultIconSize}
        height={props.size ?? defaultIconSize}
        className={themes.icon}
      />
      <RenderIf
        reference={customProps.content}
        render={(content) => (
          <div
            className={clsx(themes.content, {
              [themes.reflect]: props.reflect,
            })}
          >
            {content}
          </div>
        )}
      ></RenderIf>
    </div>
  )
}

export default Icon
