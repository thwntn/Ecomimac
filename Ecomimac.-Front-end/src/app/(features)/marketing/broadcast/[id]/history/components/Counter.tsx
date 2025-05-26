import Column from "@/app/(components)/column"
import { convert } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Image from "@/app/(components)/image"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Wrapper from "@/app/(components)/wrapper"
import { formatNumber, Helper } from "@/utils/common"
import { Fetched } from "@/utils/hooks"
import { CounterHistoryBroadcastResponse } from "@/utils/interface"
import { Fragment } from "react"

interface IProps {
  fetchCounterHistory: Fetched<CounterHistoryBroadcastResponse>
}

const Counter = (props: IProps) => {
  const isLoad = convert(props.fetchCounterHistory.isWait === true)
  return (
    <Row gap={16}>
      <Wrapper isLoad={isLoad}>
        <RenderIf
          reference={props.fetchCounterHistory.response}
          render={(counter) => (
            <Fragment>
              <Description>Số lượng lần chạy chiến dịch</Description>
              <Row itemsCenter gap={16}>
                <div className="p-[16px] bg-gray-100 rounded-full">
                  <Image
                    dir="icon/broadcast/times.svg"
                    width={32}
                    height={32}
                  ></Image>
                </div>
                <Column className="text-[#1ca7ec]">
                  <Content size={24} className="font-bold">
                    {counter.runCount}
                  </Content>
                  <span>lần chạy</span>
                </Column>
              </Row>
              <div className="w-full h-[1px] bg-gray-100"></div>
              <Row itemsCenter gap={4}>
                Lần cập nhật cuối: {Helper.Time.format(new Date())}
              </Row>
            </Fragment>
          )}
        ></RenderIf>
      </Wrapper>
      <Wrapper isLoad={isLoad}>
        <RenderIf
          reference={props.fetchCounterHistory.response}
          render={(counter) => (
            <Fragment>
              <Description>Tổng số tin nhắn đã gửi</Description>
              <Column>
                <Row gap={16} itemsCenter>
                  <Image
                    dir="icon/broadcast/success-counter.svg"
                    width={26}
                    height={26}
                  ></Image>
                  <Row className="text-[#0ad17b]" itemsCenter gap={6}>
                    <Content size={20} className="font-bold">
                      {formatNumber(counter.successCountCount)}
                    </Content>
                    <Content>tin nhắn gửi thành công</Content>
                  </Row>
                </Row>
                <Row gap={16} itemsCenter>
                  <Image
                    dir="icon/broadcast/error-counter.svg"
                    width={22}
                    height={22}
                  ></Image>
                  <Row className="text-[#ff4e3b]" itemsCenter gap={6}>
                    <Content size={20} className="font-bold">
                      {formatNumber(counter.failedCount)}
                    </Content>
                    <Content>tin lỗi</Content>
                  </Row>
                </Row>
              </Column>
              <div className="w-full h-[1px] bg-gray-100 m-[2px]"></div>
              <Row itemsCenter gap={4}>
                Tổng cộng
                <b>
                  {formatNumber(
                    counter.successCountCount + counter.failedCount
                  )}
                </b>
                tin nhắn
              </Row>
            </Fragment>
          )}
        ></RenderIf>
      </Wrapper>
      <Wrapper isLoad={isLoad}>
        <RenderIf
          reference={props.fetchCounterHistory.response}
          render={(counter) => (
            <Fragment>
              <Description>
                Ước tính Chi phí gửi tin nhắn (
                {formatNumber(counter.priceEstimatePerMessage)} vnđ/ tin nhắn)
              </Description>
              <Row itemsCenter gap={16}>
                <div className="p-[16px] bg-gray-100 rounded-full">
                  <Image
                    dir="icon/broadcast/currency-counter.svg"
                    width={32}
                    height={32}
                  ></Image>
                </div>
                <Row itemsCenter gap={8} className="text-[#6736cf]">
                  <Content size={24} className="font-bold">
                    {formatNumber(
                      counter.successCountCount *
                        counter.priceEstimatePerMessage
                    )}
                    &nbsp; vnđ
                  </Content>
                </Row>
              </Row>
              <div className="w-full h-[1px] bg-gray-100"></div>
              <Row itemsCenter gap={4}>
                Trên tồng số
                <span className="text-green-500">{counter.runCount}</span> lần
                chạy gửi tin
              </Row>
            </Fragment>
          )}
        ></RenderIf>
      </Wrapper>
    </Row>
  )
}

export default Counter
