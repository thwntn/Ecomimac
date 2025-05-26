import Column from "@/app/(components)/column"
import { FormData, PromotionProducts } from "."
import { Fetched, Form, RecordAndCounter } from "@/utils/hooks"
import { ProductResponse } from "@/utils/interface"
import Title from "@/app/(components)/title"
import Description from "@/app/(components)/description"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Dropdown from "@/app/(components)/dropdown"
import Content from "@/app/(components)/content"
import { limitQuantitySelection, QuantityType } from "../../_Meta"
import Input from "@/app/(components)/input"
import Icon from "@/app/(components)/icon"
const SETUP_PRODUCT_ID = "setup__product__id"

const Product = ({
  form,
  products,
}: {
  form: Form<FormData>
  products: Fetched<RecordAndCounter<ProductResponse>>
}) => {
  const gotoLast = () => {
    const reference = document.getElementById(SETUP_PRODUCT_ID)
    if (!reference || !reference.lastElementChild) return

    reference.lastElementChild.scrollIntoView({
      behavior: "smooth",
      block: "end",
    })
  }

  const addSlot = () => {
    const promotionProducts = Array.from(form.data.promotionProducts)
    const productWithSpace = promotionProducts.concat(new PromotionProducts())
    form.append("promotionProducts", productWithSpace)
    //
    setTimeout(gotoLast, 200)
  }

  const selectProduct = (product: ProductResponse, index: number) => {
    const promotionProducts = Array.from(form.data.promotionProducts)
    promotionProducts[index].product = product
    form.append("promotionProducts", promotionProducts)
  }

  const updateType = (type: QuantityType, index: number) => {
    const promotionProducts = Array.from(form.data.promotionProducts)
    promotionProducts[index].type = type
    form.append("promotionProducts", promotionProducts)
  }

  return (
    <Column gap={16} className="!grid">
      <Row itemsCenter justifyBetween gap={16}>
        <Column>
          <Title>Sản phẩm khuyến mãi</Title>
          <Description>
            Cài đặt hoặc điều chỉnh thời gian trên một thiết bị, hệ thống hoặc
            ứng dụng nào đó theo mong muốn của người dùng
          </Description>
        </Column>
        <Row size={0.1}>
          <Icon
            content="Thêm thiết lập sản phẩm"
            reflect
            dir="icon/create.svg"
            onClick={addSlot}
          ></Icon>
        </Row>
      </Row>
      <RenderIf
        reference={products.response}
        render={(products) => (
          <Row id={SETUP_PRODUCT_ID} gap={16} className="overflow-x-auto">
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
                      items={products.data}
                      label="Sản phẩm khuyến mãi"
                      onChange={(product) => selectProduct(product, index)}
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
                          onChange={(item) => updateType(item.enum, index)}
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
        )}
      ></RenderIf>
    </Column>
  )
}

export default Product
