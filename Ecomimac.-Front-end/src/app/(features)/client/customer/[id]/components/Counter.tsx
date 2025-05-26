import { Helper, VNCurrency } from "@/utils/common"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Image from "@/app/(components)/image"
import Row from "@/app/(components)/row"
import State from "@/app/(components)/state"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"

const Counter = () => {
  return (
    <Row gap={16}>
      <Row size={4}>
        <Wrapper className="min-h-[174px]">
          <Row justifyBetween>
            <Title>Tổng tích luỹ</Title>
            <State
              background="#dfeff2"
              color="#0c5663"
              name="Hội viên bạch kim"
            ></State>
          </Row>
          <Content className="text-[24px] font-bold text-green-500">
            {VNCurrency(65000000)}
          </Content>
          <div className="w-full border-t border-dashed"></div>
          <Row itemsCenter gap={8} className="text-[12px]">
            <Image dir="icon/ecommerce-up.svg" width={16} height={16}></Image>
            <span>
              Tăng thêm <span className="text-green-500">5%</span> so với tháng
              trước
            </span>
          </Row>
        </Wrapper>
      </Row>
      <Row size={8} gap={16}>
        <Wrapper className="min-h-[174px]">
          <Title>Tổng số hoá đơn & đơn hàng</Title>
          <Row itemsCenter gap={4}>
            <Content className="text-[24px] font-bold text-red-500">
              520
            </Content>{" "}
            Hoá đơn
          </Row>
          <div className="w-full border-t border-dashed"></div>
          <Row itemsCenter gap={8} className="text-[12px]">
            <Image dir="icon/ecommerce-down.svg" width={16} height={16}></Image>
            <span>
              Gỉảm <span className="text-red-500">15%</span> so với tháng trước
            </span>
          </Row>
        </Wrapper>
        <Wrapper className="min-h-[174px]">
          <Title>Trạng thái đơn hàng</Title>
          <Column>
            <Row itemsCenter gap={4}>
              <Content className="text-[16px] font-bold text-purple-500">
                500
              </Content>
              đơn hàng hoàn tất
            </Row>
            <Row itemsCenter gap={4}>
              <Content className="text-[16px] font-bold text-yellow-600">
                20
              </Content>
              đang chờ xử lí
            </Row>
          </Column>
          <div className="w-full border-t border-dashed"></div>
          <Row itemsCenter gap={8} className="text-[12px]">
            <Image dir="icon/ecommerce-up.svg" width={16} height={16}></Image>
            <span>
              Tỉ lệ chênh lệch là <span className="text-green-500">80%</span>
            </span>
          </Row>
        </Wrapper>
      </Row>
    </Row>
  )
}

export default Counter
