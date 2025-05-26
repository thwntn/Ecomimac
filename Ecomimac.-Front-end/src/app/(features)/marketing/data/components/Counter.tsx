import { RouteMap, Helper, formatNumber } from "@/utils/common"
import Column from "@/app/(components)/column"
import { convert } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Image from "@/app/(components)/image"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Wrapper from "@/app/(components)/wrapper"
import { useGet } from "@/utils/hooks"
import { Fragment } from "react"
import { DataCounterResponse } from "@/utils/interface/Data"
import Title from "@/app/(components)/title"
import Character from "@/app/(components)/character"

const Counter = () => {
  const fetchCounter = useGet<DataCounterResponse>(
    RouteMap.DATA + "/" + RouteMap.COUNTER
  )
  const isLoad = convert(!fetchCounter.response)
  return (
    <Row gap={16}>
      <Wrapper isLoad={isLoad}>
        <RenderIf
          reference={fetchCounter.response}
          render={(counter) => (
            <Fragment>
              <Description>Nguồn dữ liệu đã tạo</Description>
              <Row itemsCenter gap={16}>
                <div className="p-[16px] bg-gray-100 rounded-full">
                  <Image
                    dir="icon/promotional-program-program.svg"
                    width={32}
                    height={32}
                  ></Image>
                </div>
                <Row itemsCenter gap={8} className="text-[#1ca7ec]">
                  <Content size={24} className="font-bold">
                    {counter.quantityData}
                  </Content>
                  nhóm
                </Row>
              </Row>
              <div className="w-full h-[1px] bg-gray-100"></div>
              <Content>Từ các tập dữ liệu đã nhập hoặc tạo thủ công</Content>
            </Fragment>
          )}
        ></RenderIf>
      </Wrapper>
      <Wrapper isLoad={isLoad}>
        <RenderIf
          reference={fetchCounter.response}
          render={(counter) => (
            <Fragment>
              <Description>Dòng dữ liệu đã nạp</Description>
              <Row gap={16} itemsCenter>
                <div className="p-[16px] bg-gray-100 rounded-full">
                  <Image
                    dir="icon/promotional-program-currency.svg"
                    width={32}
                    height={32}
                  ></Image>
                </div>
                <Column className="text-[#FFA500]">
                  <Content size={24} className="font-bold">
                    {formatNumber(counter.quantityImport)}
                  </Content>
                  <Content>bản ghi hợp lệ</Content>
                </Column>
              </Row>
              <div className="w-full h-[1px] bg-gray-100"></div>
              <Content>Tổng số khách hàng được nhập vào hệ thống</Content>
            </Fragment>
          )}
        ></RenderIf>
      </Wrapper>
      <Wrapper isLoad={isLoad} gap={8}>
        <RenderIf
          reference={fetchCounter.response}
          render={(counter) => (
            <Fragment>
              <Description>Gần đây</Description>
              <Column gap={8}>
                {counter.recent.map((item, index) => (
                  <Row key={index} itemsCenter gap={8}>
                    <Character text={item.name.toUpperCase()}></Character>
                    <Column>
                      <Content lineClamp={1}>{item.name}</Content>
                      <Description lineClamp={1}>
                        {item.description}
                      </Description>
                    </Column>
                  </Row>
                ))}
              </Column>
              <div className="w-full h-[1px] bg-gray-100"></div>
              <Content>
                Lần cập nhật gần nhất: {Helper.Time.format(new Date())}
              </Content>
            </Fragment>
          )}
        ></RenderIf>
      </Wrapper>
    </Row>
  )
}

export default Counter
