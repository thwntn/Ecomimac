import Container from "@/app/(components)/container"
import Frame from "@/app/(components)/frame"
import Ticket from "./components/ticket"
import Wrapper from "@/app/(components)/wrapper"
import Button from "@/app/(components)/button"
import Row from "@/app/(components)/row"
import Input from "@/app/(components)/input"
import { useParams } from "next/navigation"
import { useGet } from "@/utils/hooks"
import { RouteMap, Helper } from "@/utils/common"
import { DiscountResponse } from "@/utils/interface"
import { convert } from "@/app/(components)/common"
import RenderIf from "@/app/(components)/render-if"
import { Fragment } from "react"
import Column from "@/app/(components)/column"
import Profile from "@/app/(components)/profile"
import { useWithout } from "@/utils/functions"
import CreateUpdate from "../components/create-update"
import Invoice from "./components/Invoice"
import Title from "@/app/(components)/title"
import Analyst from "./components/Analyst"
import Line from "@/app/(components)/line"

interface IParams {
  [key: string]: string
  id: string
}

const Information = () => {
  const without = useWithout()
  const params = useParams<IParams>()
  const discount = useGet<DiscountResponse>(RouteMap.DISCOUNT + "/" + params.id)
  return (
    <Frame>
      <Row justifyBetween>
        <Container></Container>
        <Row size={0.1} gap={8}>
          <Row size={1}>
            <RenderIf
              reference={discount.response}
              render={(data) => (
                <Button
                  onClick={() =>
                    without.append(
                      <CreateUpdate
                        onExit={() => {
                          without.close()
                          discount.fetch({
                            silent: true,
                          })
                        }}
                        discount={data}
                      ></CreateUpdate>
                    )
                  }
                  icon="icon/edit.svg"
                >
                  Chỉnh sửa
                </Button>
              )}
            ></RenderIf>
          </Row>
          <Button main icon="icon/create-light.svg">
            Sử dụng
          </Button>
        </Row>
      </Row>
      <Ticket discount={discount}></Ticket>
      <Line name="Tổng quan & thiết lập"></Line>
      <Row gap={24}>
        <Column gap={24} size={8}>
          <Wrapper
            className="relative"
            isLoad={convert(discount.response === undefined)}
          >
            <Title icon="icon/info.svg">Thông tin chi tiết</Title>
            <RenderIf
              reference={discount.response}
              render={(discount) => (
                <Fragment>
                  <Row gap={32}>
                    <Column gap={8}>
                      <Input
                        silent
                        label="Tên mã giảm giá"
                        value={discount.name}
                      ></Input>
                      <Input
                        silent
                        label="Mô tả"
                        value={discount.description}
                      ></Input>
                      <Input
                        silent
                        label="Mã code"
                        value={discount.code}
                      ></Input>
                      <Input
                        silent
                        label="Ngày tạo"
                        value={Helper.Time.format(discount.created)}
                      ></Input>
                      <Input
                        silent
                        label="Áp dụng từ ngày"
                        value={Helper.Time.format(discount.fromDate)}
                      ></Input>
                      <Input
                        silent
                        label="Áp dụng đến ngày"
                        value={Helper.Time.format(discount.toDate)}
                      ></Input>
                    </Column>
                    <Column gap={8}>
                      <Column gap={8} className="pb-[8px]">
                        <label className="text-[10px] text-gray-400">
                          Người tạo
                        </label>
                        <Profile
                          name={discount.profile.name}
                          avatar={discount.profile.avatar}
                          email={discount.profile.email}
                        ></Profile>
                      </Column>
                      <Input
                        silent
                        label="Số tiền giảm trên hoá đơn"
                        value={Helper.Currency.vietNamDong(discount.amount)}
                      ></Input>
                      <Input
                        silent
                        label="Phần trăm giảm giá theo hoá đơn"
                        value={discount.percent + "%"}
                      ></Input>
                      <Input
                        silent
                        label="Tổng số hoá đơn đã áp dụng"
                        value={discount.invoiceDiscounts.length}
                      ></Input>
                    </Column>
                  </Row>
                </Fragment>
              )}
            ></RenderIf>
          </Wrapper>

          <RenderIf
            reference={discount.response}
            render={(discount) => <Invoice></Invoice>}
          ></RenderIf>
        </Column>

        <Row size={4}>
          <RenderIf
            reference={discount.response}
            render={(discount) => <Analyst discount={discount}></Analyst>}
          ></RenderIf>
        </Row>
      </Row>
    </Frame>
  )
}

export default Information
