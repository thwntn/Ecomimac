import { upperFirstLetter } from "@/utils/common"
import { Fetched } from "@/utils/hooks"
import { DataResponse } from "@/utils/interface/Data"
import Character from "@/app/(components)/character"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import List from "@/app/(components)/list"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Wrapper from "@/app/(components)/wrapper"
import { Fragment } from "react"

interface IProps {
  fetchData: Fetched<DataResponse>
}

const Link = (props: IProps) => {
  return (
    <Wrapper>
      <RenderIf
        reference={props.fetchData.response}
        render={(data) => (
          <Column>
            <List
              column={["Tên truyền thông", "", "Gửi theo"]}
              items={data.broadcasts}
              silent
              fit
              each={(item) => (
                <Fragment>
                  <Row itemsCenter gap={8} className="col-span-2">
                    <Character text={item.name}></Character>
                    <Column>
                      <Content lineClamp={1}>{item.name}</Content>
                      <Description lineClamp={1}>
                        {item.description}
                      </Description>
                    </Column>
                  </Row>
                  <Row itemsCenter gap={4}>
                    <RenderIf
                      reference={item.sendKey}
                      reverse={<Description>Chưa thiết lập</Description>}
                      render={() => (
                        <Fragment>
                          <Description>Cột:</Description>
                          <Content>{upperFirstLetter(item.sendKey)}</Content>
                        </Fragment>
                      )}
                    ></RenderIf>
                  </Row>
                </Fragment>
              )}
            ></List>
          </Column>
        )}
      ></RenderIf>
    </Wrapper>
  )
}

export default Link
