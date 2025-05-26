import Column from "../column"
import { CustomIconNames } from "../common"
import Content from "../content"
import Image from "../image"
import RenderIf from "../render-if"
import themes from "./index.module.scss"

const Empty = ({ text }: { text?: string }) => {
  return (
    <Column
      justifyCenter
      itemsCenter
      padding={24}
      gap={16}
      className={themes.frame}
    >
      <Image dir={CustomIconNames.EMPTY} width={120} height={120}></Image>
      <RenderIf
        reference={text}
        render={(text) => <Content>{text}</Content>}
      ></RenderIf>
    </Column>
  )
}

export default Empty
