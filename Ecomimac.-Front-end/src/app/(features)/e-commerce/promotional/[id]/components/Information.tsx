import { Helper } from "@/utils/common"
import Column from "@/app/(components)/column"
import { convert } from "@/app/(components)/common"
import Description from "@/app/(components)/description"
import Input from "@/app/(components)/input"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import State from "@/app/(components)/state"
import TimeRange from "@/app/(components)/time-range"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import { Fetched } from "@/utils/hooks"
import { PromotionProduct, PromotionResponse } from "@/utils/interface"
import { Fragment } from "react"

const Information = ({
  getPromotion,
}: {
  getPromotion: Fetched<PromotionResponse>
}) => {
  const isLoad = convert(!getPromotion.response)
  return (
    <Wrapper isLoad={isLoad}>
      <Title icon="icon/info.svg">Thông tin khuyến mãi</Title>
      <RenderIf
        reference={getPromotion.response}
        render={(promotion) => (
          <Fragment>
            <Row>
              <Column>
                <Title>{promotion.name}</Title>
                <Description>{promotion.description}</Description>
              </Column>
            </Row>
            <Row>
              <Row>
                <Input
                  silent
                  label="Ngày tạo"
                  value={Helper.Time.format(promotion.created)}
                ></Input>
              </Row>
              <Row>
                <Input
                  silent
                  label="Số lượng sản phẩm"
                  value={promotion.promotionProducts.length}
                ></Input>
              </Row>
            </Row>
            <Row>
              <Column gap={8}>
                <Description>Khung thời gian diễn ra</Description>
                <TimeRange
                  fromDate={new Date(promotion.fromDate)}
                  toDate={new Date(promotion.toDate)}
                ></TimeRange>
              </Column>
              <Column>
                <State
                  background="#2c6bff13"
                  color="#359eff"
                  name="Đang hoạt động"
                ></State>
              </Column>
            </Row>
          </Fragment>
        )}
      ></RenderIf>
    </Wrapper>
  )
}

export default Information
