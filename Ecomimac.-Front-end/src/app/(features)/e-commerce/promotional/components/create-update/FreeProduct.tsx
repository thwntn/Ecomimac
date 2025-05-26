import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"
import Title from "@/app/(components)/title"
import {
  FormData,
  PromotionProducts,
  RangePromotionProduct,
  RangePromotionQuantity,
} from "."
import { Fetched, Form, RecordAndCounter } from "@/utils/hooks"
import { ProductResponse } from "@/utils/interface"
import Dropdown from "@/app/(components)/dropdown"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Input from "@/app/(components)/input"
import Content from "@/app/(components)/content"
import Image from "@/app/(components)/image"
import { Helper } from "@/utils/common"
import Icon from "@/app/(components)/icon"
const SETUP_PRODUCT_ID = "setup__product__id"

const FreeProduct = ({
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
    form.append(
      "promotionProducts",
      form.data.promotionProducts.concat(new PromotionProducts())
    )
    //
    setTimeout(gotoLast, 200)
  }

  const updateProduct = (
    key: RangePromotionProduct,
    product: ProductResponse,
    index: number
  ) => {
    const promotionProducts = Array.from(form.data.promotionProducts)
    const promotionProduct = promotionProducts[index]

    if (promotionProduct === undefined) return
    promotionProduct[key] = product

    key === "product" && (promotionProduct.productId = product.id)
    key === "freeProduct" && (promotionProduct.freeProductId = product.id)

    form.append("promotionProducts", promotionProducts)
  }

  const changeQuantity = (
    key: RangePromotionQuantity,
    quantity: number,
    index: number
  ) => {
    const promotionProducts = Array.from(form.data.promotionProducts)
    const promotionProduct = promotionProducts[index]

    if (promotionProduct === undefined) return
    promotionProduct[key] = quantity
    form.append("promotionProducts", promotionProducts)
  }

  return (
    <Column gap={16} className="!grid">
      <Row itemsCenter gap={16}>
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
                  className="border-[1px] min-w-full border-gray-200 rounded-[8px] rounded-t-[8px]"
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
                    <Row gap={8}>
                      <Column size={8}>
                        <Dropdown
                          items={products.data}
                          label="Sản phẩm khuyến mãi"
                          onChange={(product) =>
                            updateProduct("product", product, index)
                          }
                          each={(item) => (
                            <Row gap={8} itemsCenter>
                              <Image
                                src={
                                  Helper.Data.getAvatarProduct(
                                    item.imageProducts
                                  ).url
                                }
                                width={48}
                                height={48}
                                className="rounded-full"
                              ></Image>
                              <Column>
                                <Content>{item.name}</Content>
                                <Description lineClamp={1}>
                                  {item.description}
                                </Description>
                              </Column>
                            </Row>
                          )}
                          show={(item) => item.name}
                        ></Dropdown>
                      </Column>
                      <Column size={4}>
                        <Input
                          onChange={(event) =>
                            changeQuantity(
                              "quantity",
                              Number(event.target.value),
                              index
                            )
                          }
                          defaultValue={2}
                          label="Số lượng mua tối thiểu"
                        ></Input>
                      </Column>
                    </Row>
                    <Row gap={8}>
                      <Column size={8}>
                        <Dropdown
                          items={products.data}
                          label="Sản phẩm tặng thêm"
                          onChange={(product) =>
                            updateProduct("freeProduct", product, index)
                          }
                          each={(item) => (
                            <Row gap={8} itemsCenter>
                              <Image
                                src={
                                  Helper.Data.getAvatarProduct(
                                    item.imageProducts
                                  ).url
                                }
                                width={48}
                                height={48}
                                className="rounded-full"
                              ></Image>
                              <Column>
                                <Content>{item.name}</Content>
                                <Description lineClamp={1}>
                                  {item.description}
                                </Description>
                              </Column>
                            </Row>
                          )}
                          show={(item) => item.name}
                        ></Dropdown>
                      </Column>
                      <Column size={4}>
                        <Input
                          defaultValue={2}
                          label="Số lượng"
                          onChange={(event) =>
                            changeQuantity(
                              "freeQuantity",
                              Number(event.target.value),
                              index
                            )
                          }
                        ></Input>
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

export default FreeProduct
