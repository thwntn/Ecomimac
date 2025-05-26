import { RouteMap, Helper } from "@/utils/common"
import Line from "@/app/(components)/line"
import Column from "@/app/(components)/column"
import { convert } from "@/app/(components)/common"
import Description from "@/app/(components)/description"
import Icon from "@/app/(components)/icon"
import Input from "@/app/(components)/input"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import State from "@/app/(components)/state"
import TimeRange from "@/app/(components)/time-range"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import { Fetched, useGet } from "@/utils/hooks"
import { SaleProgramResponse, SaleProgramStatusResponse } from "@/utils/interface"
import { Fragment } from "react"

const Detail = ({
  saleProgram,
}: {
  saleProgram: Fetched<SaleProgramResponse>
}) => {
  const isLoad = convert(!saleProgram.response)
  const getStatus = useGet<SaleProgramStatusResponse[]>(
    RouteMap.SALE_PROGRAM + "/" + RouteMap.STATUS
  )
  return (
    <Wrapper isLoad={isLoad}>
      <RenderIf
        reference={saleProgram.response}
        render={(saleProgram) => (
          <Fragment>
            <Row itemsCenter justifyBetween>
              <Title icon="icon/info.svg">Thông tin chương trình</Title>
              <Icon dir="icon/more.svg"></Icon>
            </Row>
            <Column gap={8}>
              <Title className="font-bold">{saleProgram.name}</Title>
              <Description lineClamp={2}>{saleProgram.description}</Description>
            </Column>
            <Column gap={8}>
              <Row gap={16}>
                <Input
                  silent
                  label="Ngày tạo"
                  value={Helper.Time.format(saleProgram.created)}
                ></Input>
                <Input
                  silent
                  label="Sản phẩm"
                  value={saleProgram.saleProgramProducts.length}
                ></Input>
              </Row>
              <Row itemsCenter gap={16}>
                <Column size={6}>
                  <Input
                    silent
                    label="Mã giảm giá"
                    value={saleProgram.saleProgramDiscounts.length}
                  ></Input>
                </Column>
                <Column size={6}>
                  <RenderIf
                    reference={getStatus.response}
                    render={(status) => {
                      const information = status.find(
                        (item) => item.key === saleProgram.status
                      )
                      if (information === undefined) return

                      return (
                        <Column gap={8}>
                          <Description>Trạng thái</Description>
                          <State
                            background={information.backgroundColor}
                            color={information.color}
                            name={information.title}
                          ></State>
                        </Column>
                      )
                    }}
                  ></RenderIf>
                </Column>
              </Row>
            </Column>
          </Fragment>
        )}
      ></RenderIf>
    </Wrapper>
  )
}

export default Detail
