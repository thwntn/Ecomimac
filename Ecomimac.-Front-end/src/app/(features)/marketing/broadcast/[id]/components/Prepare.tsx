import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Image from "@/app/(components)/image"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"

const Prepare = () => {
  return (
    <Column justifyCenter itemsCenter padding={120}>
      <Column itemsCenter>
        <Image
          dir="icon/broadcast/data-queue.gif"
          width={256}
          height={256}
        ></Image>
        <Column className="w-[356px] text-center" itemsCenter gap={8}>
          <Title size={20}>Thiết lập hàng đợi, chuẩn bị dữ liệu</Title>
          <Description>
            Hệ thống đang thiết lập nội dung, đối tượng và tối ưu hóa để chiến
            dịch đạt hiệu quả tốt nhất...
          </Description>
        </Column>
      </Column>
    </Column>
  )
}

export default Prepare
