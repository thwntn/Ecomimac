import { Helper } from "@/utils/common"
import Character from "@/app/(components)/character"
import Column from "@/app/(components)/column"
import { convert } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import DateTime from "@/app/(components)/date-time"
import Description from "@/app/(components)/description"
import List from "@/app/(components)/list"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import { Fetched } from "@/utils/hooks"
import { SaleProgramPromotionResponse, SaleProgramResponse } from "@/utils/interface"
import { Fragment } from "react"

const Promotion = ({
  saleProgram,
}: {
  saleProgram: Fetched<SaleProgramResponse>
}) => {
  const isLoad = convert(!saleProgram.response)
  return (
    <Wrapper isLoad={isLoad}>
      <RenderIf
        reference={saleProgram.response}
        render={(saleProgram) => (
          <Fragment>
            <Title icon="icon/info.svg">Khuyến mãi</Title>
            <List
              items={saleProgram.saleProgramPromotions}
              fit
              silent
              column={["Thông tin", String(), "Ngày tạo", "Doanh thu"]}
              each={(saleProgramProduct) => {
                const promotion = saleProgramProduct.promotion
                return (
                  <Fragment>
                    <Row className="col-span-2" itemsCenter gap={8}>
                      <Character text={promotion.name}></Character>
                      <Column>
                        <Content>{promotion.name}</Content>
                        <Description lineClamp={1}>
                          {promotion.description}
                        </Description>
                      </Column>
                    </Row>
                    <DateTime dateTime={new Date(promotion.created)}></DateTime>
                    <Content className="text-right">
                      {promotion.promotionType}
                    </Content>
                  </Fragment>
                )
              }}
            ></List>
          </Fragment>
        )}
      ></RenderIf>
    </Wrapper>
  )
}

export default Promotion
