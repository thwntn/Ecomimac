import Content from "../content"
import themes from "./index.module.scss"
import Image from "../image"
import { CustomIconNames } from "../common"

interface IProps {
  onClick?: VoidFunction
  content: string
  icon?: string
}

const Reference = (props: IProps) => {
  return (
    <div className={themes.frame} onClick={props.onClick}>
      <Content className={themes.title}>{props.content}</Content>
      <Image
        className={themes.icon}
        dir={props.icon ?? CustomIconNames.REFERENCE}
        width={24}
        height={24}
      />
    </div>
  )
}

export default Reference
