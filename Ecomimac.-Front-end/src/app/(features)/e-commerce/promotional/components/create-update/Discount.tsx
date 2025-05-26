import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import { Form, RecordAndCounter } from "@/utils/hooks"
import { DiscountResponse } from "@/utils/interface"
import { FormData } from "."
import Dropdown from "@/app/(components)/dropdown"
import Content from "@/app/(components)/content"
import { limitQuantitySelection } from "../../_Meta"
import Input from "@/app/(components)/input"
import Icon from "@/app/(components)/icon"
const SETUP_PRODUCT_ID = "setup__product__id"

const Discount = ({
  discount,
  form,
}: {
  discount: RecordAndCounter<DiscountResponse>
  form: Form<FormData>
}) => {
  const gotoLast = () => {
    const reference = document.getElementById(SETUP_PRODUCT_ID)
    if (!reference || !reference.lastElementChild) return

    reference.lastElementChild.scrollIntoView({
      behavior: "smooth",
      block: "end",
    })
  }

  return (
    <Column gap={16} className="grid">
      <Row>
        <Column>
          <Title>Mã khuyến mãi</Title>
          <Description>
            Cung cấp để khách hàng sử dụng khi mua hàng hoặc sử dụng dịch vụ
          </Description>
        </Column>
        <Row size={0.1}>
          <Icon
            content="Thêm mã khuyến mãi"
            reflect
            dir="icon/create.svg"
            // onClick={addSlot}
          ></Icon>
        </Row>
      </Row>
      <Row>
        <Row id={"SETUP_PRODUCT_ID"} gap={16} className="overflow-x-auto">
          {Array.from({ length: form.data.promotionProducts.length }).map(
            (_, index) => (
              <Column
                key={index}
                className="border-[1px] min-w-[100%] border-gray-200 rounded-[8px] rounded-t-[8px]"
              >
                <Row
                  itemsCenter
                  justifyBetween
                  className="bg-gray-100 px-[12px] py-[4px] rounded-t-[8px]"
                >
                  <Description className="!text-gray-800">
                    Thiết lập {index + 1}
                  </Description>
                  <Description className="!text-red-500 hover:underline cursor-pointer">
                    Xoá
                  </Description>
                </Row>
                <Column padding={8} gap={8}>
                  <Dropdown
                    items={discount.data}
                    label="Mã khuyến mãi"
                    // onChange={(product) => selectProduct(product, index)}
                    each={(item) => (
                      <Column>
                        <Content>{item.name}</Content>
                        <Description lineClamp={1}>
                          {item.description}
                        </Description>
                      </Column>
                    )}
                    show={(item) => item.name}
                  ></Dropdown>
                  <Row gap={8}>
                    <Column>
                      <Dropdown
                        items={limitQuantitySelection}
                        label="Giới hạn bán"
                        each={(item) => item.name}
                        show={(item) => item.name}
                      ></Dropdown>
                    </Column>
                    <Column>
                      <Input label="Số lượng" placeholder="10"></Input>
                    </Column>
                  </Row>
                </Column>
              </Column>
            )
          )}
        </Row>
      </Row>
    </Column>
  )
}

export default Discount
