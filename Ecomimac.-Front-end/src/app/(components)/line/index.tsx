import { Fragment } from "react"
import RenderIf from "../render-if"
import Row from "../row"
import Title from "../title"

const Line = ({ name }: { name?: string }) => {
  return (
    <Row justifyCenter padding={8} itemsCenter gap={8}>
      <RenderIf
        reference={name}
        render={() => (
          <Fragment>
            <div className="border-gray-100 w-[8px] h-[8px] bg-[#3c3c3c] rounded-[2px]"></div>
            <Title>{name}</Title>
          </Fragment>
        )}
      ></RenderIf>

      <div className="border-t border-gray-100 flex-[1]"></div>
    </Row>
  )
}

export default Line
