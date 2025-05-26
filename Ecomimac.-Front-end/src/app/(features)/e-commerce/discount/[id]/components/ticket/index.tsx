import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"
import Image from "@/app/(components)/image"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import { Fetched } from "@/utils/hooks"
import { DiscountResponse } from "@/utils/interface"
import dayjs from "dayjs"
import themes from "./index.module.scss"
import { Fragment } from "react"
import Wrapper from "@/app/(components)/wrapper"
import Content from "@/app/(components)/content"
import { DiscountTimeFrameType } from "@/utils/common"

const Ticket = ({ discount }: { discount: Fetched<DiscountResponse> }) => {
  const getPercentProgress = (discount: DiscountResponse) => {
    if (!discount.fromDate || !discount.toDate) return 0

    const timeFromDate = new Date(discount.fromDate).getTime()
    const timeToDate = new Date(discount.toDate).getTime()
    const timeCurrent = new Date().getTime()

    const total = timeToDate - timeFromDate
    const current = timeCurrent - timeFromDate
    if (current < 0 || current > total) return undefined

    const percent = (current / total) * 100
    return percent.toFixed(2)
  }

  return (
    <RenderIf
      reference={discount.response}
      render={(discount) => {
        const percentProgress = getPercentProgress(discount)

        return (
          <Wrapper className={themes.frame}>
            <Row gap={16}>
              <Column>
                <Title>{discount.name}</Title>
                <div className="flex items-center gap-[8px]">
                  <span className="text-[24px] font-bold uppercase text-blue-400">
                    {discount.code}
                  </span>
                </div>
                <Description>Đã có {discount.applied} lượt dùng</Description>
              </Column>
              <RenderIf
                reference={discount.percent}
                render={(percent) => (
                  <div className={themes.discount}>
                    {percent} <span className="text-[10px]">%</span>
                    <div className={themes.flag}></div>
                  </div>
                )}
              ></RenderIf>
            </Row>
            <Row
              itemsCenter
              gap={16}
              className="text-[12px] border-t border-dashed border-gray-100 py-[8px]"
            >
              <RenderIf
                reference={
                  !discount.fromDate ||
                  !discount.toDate ||
                  discount.discountTimeFrameType ===
                    DiscountTimeFrameType.NORMAL
                }
                render={() => (
                  <Content className="pt-[16px]">
                    Mã giảm giá vô thời hạn
                  </Content>
                )}
              ></RenderIf>

              <RenderIf
                reference={
                  discount.fromDate &&
                  discount.toDate &&
                  discount.discountTimeFrameType ===
                    DiscountTimeFrameType.TIME_FRAME
                }
                render={() => (
                  <Fragment>
                    <div>
                      <div className="text-[24px] font-bold">
                        {dayjs(discount.fromDate).format("HH:mm")}
                      </div>
                      <div className="whitespace-nowrap">
                        {dayjs(discount.fromDate).format("DD-MM-YYYY")}
                      </div>
                    </div>
                    <div className=" relative w-full h-[16px] bg-[#0000000d] rounded-full overflow-hidden flex items-center">
                      <RenderIf
                        reference={percentProgress}
                        render={() => (
                          <div
                            className="absolute whitespace-nowrap flex items-center justify-end px-[8px] text-white font-bold left-0 h-[16px] bg-gradient-to-r rounded-full from-[#c1f1ff] to-[#4fcdff]"
                            style={{
                              width: percentProgress + "%",
                              minWidth: 120,
                            }}
                          >
                            {dayjs().format("HH:mm, DD-MM-YYYY")}
                          </div>
                        )}
                      ></RenderIf>
                    </div>
                    <div>
                      <div className="text-[24px] font-bold">
                        {dayjs(discount.toDate).format("HH:mm")}
                      </div>
                      <div className="whitespace-nowrap">
                        {dayjs(discount.toDate).format("DD-MM-YYYY")}
                      </div>
                    </div>
                  </Fragment>
                )}
              ></RenderIf>
            </Row>
            <Row
              itemsCenter
              gap={8}
              className="text-[12px] border-t border-dashed border-gray-100 pt-[16px]"
            >
              <RenderIf
                reference={discount.compare >= 0}
                render={() => (
                  <Fragment>
                    <Image
                      dir="icon/ecommerce-up.svg"
                      width={16}
                      height={16}
                    ></Image>
                    <span>
                      Tăng thêm{" "}
                      <span className="text-green-500">
                        {discount.compare}%
                      </span>{" "}
                      so với tháng trước
                    </span>
                  </Fragment>
                )}
              ></RenderIf>

              <RenderIf
                reference={discount.compare < 0}
                render={() => (
                  <Fragment>
                    <Image
                      dir="icon/ecommerce-down.svg"
                      width={16}
                      height={16}
                    ></Image>
                    <span>
                      Giảm{" "}
                      <span className="text-red-500">{-discount.compare}%</span>{" "}
                      so với tháng trước
                    </span>
                  </Fragment>
                )}
              ></RenderIf>
            </Row>
          </Wrapper>
        )
      }}
    ></RenderIf>
  )
}

export default Ticket
