import Column from "@/app/(components)/column"
import Icon from "@/app/(components)/icon"
import Image from "@/app/(components)/image"
import Number from "@/app/(components)/number"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import { Fetched, RecordAndCounter } from "@/utils/hooks"
import { ProductResponse } from "@/utils/interface"

const Counter = ({
  product,
}: {
  product: Fetched<RecordAndCounter<ProductResponse>>
}) => {
  return (
    <Row className="h-fit">
      <Row gap={16}>
        <Wrapper className="h-[185px]">
          <div className="flex flex-col gap-[6px] bg-gray-100 p-[12px] rounded-[6px]">
            <Title>Tổng số sản phẩm</Title>
            <div className="flex items-end">
              <Number
                className="text-[24px] font-bold leading-[24px]"
                value={
                  product.response
                    ? product.response.page.total * product.response.page.limit
                    : 0
                }
              ></Number>
              &nbsp;
              <span>sản phẩm</span>
            </div>
          </div>
          <div className="flex gap-[24px] text-[12px] text-gray-600 px-[2px] min-w-[256px]">
            <div className="flex flex-col gap-[6px] w-[50%]">
              <span>Kích hoạt</span>
              <div className=" relative w-[100%] h-[6px] rounded-full overflow-hidden bg-[#00000019]">
                <div className=" absolute inset-0 w-[80%] bg-[#83C88C]"></div>
              </div>
            </div>
            <div className="flex flex-col gap-[6px] w-[50%]">
              <span>Không hoạt động</span>
              <div className=" relative w-[100%] h-[6px] rounded-full overflow-hidden bg-[#00000019]">
                <div className=" absolute inset-0 w-[20%] bg-[#F2BE41]"></div>
              </div>
            </div>
          </div>
        </Wrapper>
        {/* <Wrapper className="flex flex-[0.2] flex-col  justify-between bg-gradient-to-b from-[#80B1DF] to-[#F9D5E6] p-[24px] rounded-[16px]">
          <div className="bg-[#6B9AD2] p-[8px] rounded-[12px] w-fit">
            <Image dir="icon/invoice.product.fire.svg" width={32} height={32} />
          </div>
          <span>Bán chạy</span>
          <div className="flex flex-col gap-[4px]">
            <span>
              <span className="text-[16px] font-bold">3020</span> sản phẩm
            </span>
            <span className="text-gray-600 text-[12px]">
              Tăng thêm 3% so với tháng trước
            </span>
          </div>
        </Wrapper> */}
        <Wrapper className="flex flex-col  justify-between bg-gradient-to-b from-[#F7A398] to-[#FFDC9A] p-[24px] rounded-[16px] flex-[0.2]">
          <div className="bg-[#F5876A] p-[8px] rounded-[12px] w-fit">
            <Image
              dir="icon/invoice.product.recent.svg"
              width={32}
              height={32}
            />
          </div>
          <span>Recent</span>
          <div className="flex flex-col gap-[4px]">
            <span>
              <span className="text-[16px] font-bold">1440</span> sản phẩm
            </span>
            <span className="text-gray-600 text-[12px]">
              Tăng thêm 12% so với tháng trước
            </span>
          </div>
        </Wrapper>
        <Wrapper className="flex flex-col  justify-between bg-gradient-to-b from-[#9FD6BD] to-[#FEF2B3] p-[24px] rounded-[16px] flex-[0.2]">
          <div className="bg-[#7AC68C] p-[8px] rounded-[12px] w-fit">
            <Image dir="icon/invoice.product.top.svg" width={32} height={32} />
          </div>
          <span>Bán chạy</span>
          <div className="flex flex-col gap-[4px]">
            <span>
              <span className="text-[16px] font-bold">320</span> sản phẩm
            </span>
            <span className="text-gray-600 text-[12px]">
              Giảm 3% so với tháng trước
            </span>
          </div>
        </Wrapper>
      </Row>
    </Row>
  )
}

export default Counter
