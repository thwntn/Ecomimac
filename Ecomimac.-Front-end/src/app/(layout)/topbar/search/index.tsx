import Column from "@/app/(components)/column"
import { ON } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Image from "@/app/(components)/image"
import Overlay from "@/app/(components)/overlay"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"

const SearchUI = ({ onExit }: { onExit: VoidFunction }) => {
  return (
    <Overlay onExit={onExit} width={546}>
      <Column>
        <Row size={12} gap={8}>
          <Image dir="icon/search.svg" width={24} height={24} />
          <input
            className=" outline-none w-full text-[16px] font-bold bg-transparent"
            placeholder="Tìm kiếm..."
          ></input>
        </Row>
        <Row className="pt-[16px]">
          <ul className="flex flex-col gap-[12px] w-full">
            <li className=" border-t border-dashed pt-[12px]">
              <Content>Thông tin thống kê</Content>
              <Description>https://minimals.cc/dashboard</Description>
            </li>
            <li className=" border-t border-dashed pt-[12px]">
              <Content>Chỉnh sửa nội dung</Content>
              <Description>http://spend.ico.io</Description>
            </li>
          </ul>
        </Row>
      </Column>
    </Overlay>
  )
}

export default SearchUI
