import { Helper } from "@/utils/common"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Image from "@/app/(components)/image"
import Row from "@/app/(components)/row"
import Wrapper from "@/app/(components)/wrapper"

const Counter = () => {
  return (
    <Row gap={16}>
      <Wrapper>
        <Description>Tổng số chương trình bán hàng</Description>
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
              1,394
            </Content>
            chương trình
          </Row>
        </Row>
        <div className="w-full h-[1px] bg-gray-100"></div>
        <Row itemsCenter gap={4}>
          Có <span className="text-green-500">12</span> chương trình đang hoạt
          động
        </Row>
      </Wrapper>
      <Wrapper>
        <Description>Doanh thu từ chương trình bán hàng</Description>
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
              {Helper.Currency.vietNamDong(20384750)}
            </Content>
            <Content>tổng doanh thu</Content>
          </Column>
        </Row>
        <div className="w-full h-[1px] bg-gray-100"></div>
        <Row itemsCenter gap={4}>
          Thu thập từ <span className="text-green-500">12</span> chương trình.
        </Row>
      </Wrapper>
      <Wrapper>
        <Description>Doanh thu từ chương trình bán hàng</Description>
        <Row itemsCenter gap={16}>
          <div className="p-[16px] bg-gray-100 rounded-full">
            <Image
              dir="icon/promotional-program-product.svg"
              width={32}
              height={32}
            ></Image>
          </div>
          <Row itemsCenter gap={8} className="text-[#32cd32]">
            <Content size={24} className="font-bold">
              1846
            </Content>
            sản phẩm đã bán
          </Row>
        </Row>
        <div className="w-full h-[1px] bg-gray-100"></div>
        <Row itemsCenter gap={4}>
          Trên tồng số <span className="text-green-500">4342</span> sản phẩm
          đang chạy
        </Row>
      </Wrapper>
    </Row>
  )
}

export default Counter
