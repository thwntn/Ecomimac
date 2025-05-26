import Column from "@/app/(components)/column"
import { convert } from "@/app/(components)/common"
import Image from "@/app/(components)/image"
import Row from "@/app/(components)/row"
import Wrapper from "@/app/(components)/wrapper"
import { Fetched, RecordAndCounter } from "@/utils/hooks"
import { CustomerResponse } from "@/utils/interface"

interface IProps {
  customer: Fetched<RecordAndCounter<CustomerResponse>>
}

const Counter = ({ customer }: IProps) => {
  const isLoad = convert(!customer.response)
  return (
    <Row gap={16}>
      <Row size={4}>
        <Wrapper isLoad={isLoad}>
          <Row gap={16}>
            <div className="p-[20px] bg-blue-100 rounded-full">
              <Image
                dir="icon/ecommerce-customer.svg"
                width={32}
                height={32}
              ></Image>
            </div>
            <Column>
              <span>Tổng số khách hàng</span>
              <div className="flex items-center gap-[8px]">
                {customer.response && (
                  <span className="text-[24px] font-bold text-[#3480eb]">
                    5,047
                  </span>
                )}
              </div>
            </Column>
          </Row>
          <Row
            itemsCenter
            gap={8}
            className="text-[12px] border-t border-dashed border-gray-100 pt-[12px]"
          >
            <Image dir="icon/ecommerce-up.svg" width={16} height={16}></Image>
            <span>
              Tăng thêm <span className="text-green-500">5%</span> so với tháng
              trước
            </span>
          </Row>
        </Wrapper>
      </Row>
      <Row size={4}>
        <Wrapper isLoad={isLoad}>
          <Row gap={16}>
            <div className="p-[20px] bg-green-100 rounded-full">
              <Image
                dir="icon/ecommerce-member.svg"
                width={32}
                height={32}
              ></Image>
            </div>
            <Column>
              <span>Hội viên</span>
              <div className="flex items-center gap-[8px]">
                {customer.response && (
                  <span className="text-[24px] font-bold text-[#00A76F]">
                    2,054
                  </span>
                )}
              </div>
            </Column>
          </Row>
          <Row
            itemsCenter
            gap={8}
            className="text-[12px] border-t border-dashed border-gray-100 pt-[12px]"
          >
            <Image dir="icon/ecommerce-down.svg" width={16} height={16}></Image>
            <span>
              Giảm <span className="text-red-500">10%</span> so với tháng trước
            </span>
          </Row>
        </Wrapper>
      </Row>
      <Row size={4}>
        <Wrapper isLoad={isLoad}>
          <Row gap={16}>
            <div className="p-[20px] bg-orange-100 rounded-full">
              <Image
                dir="icon/ecommerce-pending.svg"
                width={32}
                height={32}
              ></Image>
            </div>
            <Column>
              <span>Chờ xác thực</span>
              <div className="flex items-center gap-[8px]">
                {customer.response && (
                  <span className="text-[24px] font-bold text-[#f0b01a]">
                    286
                  </span>
                )}
              </div>
            </Column>
          </Row>
          <Row
            itemsCenter
            gap={8}
            className="text-[12px] border-t border-dashed border-gray-100 pt-[12px]"
          >
            <Image dir="icon/ecommerce-down.svg" width={16} height={16}></Image>
            <span>
              Giảm <span className="text-red-500">10%</span> so với tháng trước
            </span>
          </Row>
        </Wrapper>
      </Row>
    </Row>
  )
}

export default Counter
