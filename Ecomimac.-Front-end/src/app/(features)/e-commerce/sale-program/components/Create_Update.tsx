import Button from "@/app/(components)/button"
import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"
import Input from "@/app/(components)/input"
import Popup from "@/app/(components)/popup"
import Title from "@/app/(components)/title"
import Row from "@/app/(components)/row"
import Calendar from "@/app/(components)/calendar"
import {
  RecordAndCounter,
  useEffectOnce,
  useForm,
  useGet,
  usePost,
  Validate,
} from "@/utils/hooks"
import RenderIf from "@/app/(components)/render-if"
import {
  DiscountResponse,
  ProductResponse,
  PromotionResponse,
  SaleProgramResponse,
} from "@/utils/interface"
import { RouteMap, Helper, Message } from "@/utils/common"
import { convert, OFF } from "@/app/(components)/common"
import Text from "@/app/(components)/text"
import Many from "@/app/(components)/many"
import { useEffect } from "react"
import { usePut } from "@/utils/hooks/Put"

export type RangePromotionProduct = "product" | "freeProduct"
export type RangePromotionQuantity = "quantity" | "freeQuantity"

export const INIT_QUANTITY_PRODUCT = 1

const validate: Validate<FormData> = {
  name: (name: string) => name,
  description: (description: string) => description,
  fromDate: (fromDate: Date) => fromDate,
  toDate: (toDate: Date) => toDate,
  discounts: (discounts: string) => discounts.length > 0,
  promotions: (promotions: string) => promotions.length > 0,
  products: (products: string) => products.length > 0,
}

export class FormData {
  id?: string
  name: string
  description: string
  fromDate: Date
  toDate: Date
  discounts: DiscountResponse[]
  discountIds?: string[]
  promotions: PromotionResponse[]
  promotionIds?: string[]
  products: ProductResponse[]
  productIds?: string[]
}

const CreateUpdate = ({
  onExit,
  salePrograms,
}: {
  onExit: VoidFunction
  salePrograms?: SaleProgramResponse
}) => {
  const product = useGet<RecordAndCounter<ProductResponse>>(RouteMap.PRODUCT)
  const discount = useGet<RecordAndCounter<DiscountResponse>>(
    RouteMap.DISCOUNT
  )
  const promotion = useGet<RecordAndCounter<PromotionResponse>>(
    RouteMap.PROMOTION
  )
  const create = usePost(RouteMap.SALE_PROGRAM)
  const update = usePut(RouteMap.SALE_PROGRAM)
  const form = useForm<FormData>(Object(salePrograms), validate)

  const onSubmit = () => {
    const validated = form.validate.run()
    if (validated === OFF) return /// Not validated

    const discountIds = form.data.discounts.map((discount) => discount.id)
    const promotionIds = form.data.promotions.map((promotion) => promotion.id)
    const productIds = form.data.products.map((product) => product.id)

    const body = Object.assign(form.data, {
      discountIds,
      promotionIds,
      productIds,
    })

    if (form.data.id) update.request(body)
    else create.request(body)

    onExit()
  }

  useEffect(() => {
    if (salePrograms === undefined) return

    const [discounts, products, promotions]: [
      DiscountResponse[],
      ProductResponse[],
      PromotionResponse[]
    ] = [[], [], []]

    salePrograms.saleProgramDiscounts.forEach((saleProgramDiscount) =>
      discounts.push(saleProgramDiscount.discount)
    )
    salePrograms.saleProgramProducts.forEach((saleProgramProduct) =>
      products.push(saleProgramProduct.product)
    )
    salePrograms.saleProgramPromotions.forEach((saleProgramPromotion) =>
      promotions.push(saleProgramPromotion.promotion)
    )

    form.append("discounts", discounts)
    form.append("products", products)
    form.append("promotions", promotions)
  }, [salePrograms])

  const isLoad =
    convert(!product.response) ||
    convert(!discount.response) ||
    convert(!promotion.response)

  return (
    <Popup
      isLoad={isLoad}
      width={564}
      onExit={onExit}
      trigger={
        <Button onClick={onSubmit} main icon="icon/edit-light.svg">
          <RenderIf
            reference={salePrograms}
            reverse={<span>Tạo mới</span>}
            render={() => <span>Cập nhật</span>}
          ></RenderIf>
        </Button>
      }
      name="Chương trình khuyến mãi"
    >
      <Column gap={16}>
        <Column>
          <Title>Thông tin chi tiết</Title>
          <Description>
            Chiến lược marketing mà các doanh nghiệp sử dụng để thu hút khách
            hàng, tăng doanh số bán hàng và nâng cao nhận diện thương hiệu
          </Description>
        </Column>
        <Input
          autoFocus
          error={Message.CAN_NOT_EMPTY}
          label="Tên chương trình"
          placeholder="Giảm giá tháng 10"
          {...form.create("name")}
        ></Input>
        <Text
          error={Message.CAN_NOT_EMPTY}
          label="Mô tả"
          placeholder="Mua sản phẩm tặng miễn phí sản phẩm, ..."
          {...form.create("description")}
        ></Text>
      </Column>
      <Column gap={16}>
        <Column>
          <Title>Thiết lập thời gian</Title>
          <Description>
            Cài đặt hoặc điều chỉnh thời gian trên một thiết bị, hệ thống hoặc
            ứng dụng nào đó theo mong muốn của người dùng
          </Description>
        </Column>
        <Row gap={16}>
          <Calendar
            label="Ngày bắt đầu"
            error={Message.CAN_NOT_EMPTY}
            onChange={(date) =>
              form.append("fromDate", Helper.Time.format(date))
            }
            validated={form.validate.get("fromDate")}
          ></Calendar>
          <Calendar
            label="Ngày kết thúc"
            error={Message.CAN_NOT_EMPTY}
            onChange={(date) => form.append("toDate", Helper.Time.format(date))}
            validated={form.validate.get("toDate")}
          ></Calendar>
        </Row>
      </Column>

      <Column gap={8}>
        <Column>
          <Title>Khuyến mãi</Title>
          <Description>
            Các doanh nghiệp cung cấp để khách hàng sử dụng khi mua hàng hoặc sử
            dụng dịch vụ
          </Description>
        </Column>
        <RenderIf
          reference={promotion.response}
          render={(promotion) => (
            <Many
              values={form.data.promotions}
              items={promotion.data}
              each={(item) => <div>{item.name}</div>}
              onChange={(promotions) => form.append("promotions", promotions)}
              validated={form.validate.get("promotions")}
              error={Message.CAN_NOT_EMPTY}
            ></Many>
          )}
        ></RenderIf>
      </Column>

      <Column gap={8}>
        <Column>
          <Title>Mã giảm giá</Title>
          <Description>
            Các doanh nghiệp cung cấp để khách hàng sử dụng khi mua hàng hoặc sử
            dụng dịch vụ
          </Description>
        </Column>
        <RenderIf
          reference={discount.response}
          render={(discount) => (
            <Many
              values={form.data.discounts}
              items={discount.data}
              each={(item) => <div>{item.name}</div>}
              onChange={(discounts) => form.append("discounts", discounts)}
              validated={form.validate.get("discounts")}
              error={Message.CAN_NOT_EMPTY}
            ></Many>
          )}
        ></RenderIf>
      </Column>

      <Column gap={8}>
        <Column>
          <Title>Sản phẩm thuộc chương trình</Title>
          <Description>
            Các doanh nghiệp cung cấp để khách hàng sử dụng khi mua hàng hoặc sử
            dụng dịch vụ
          </Description>
        </Column>
        <RenderIf
          reference={product.response}
          render={(product) => (
            <Many
              values={form.data.products}
              items={product.data}
              each={(item) => <div>{item.name}</div>}
              onChange={(products) => form.append("products", products)}
              validated={form.validate.get("products")}
              error={Message.CAN_NOT_EMPTY}
            ></Many>
          )}
        ></RenderIf>
      </Column>
    </Popup>
  )
}

export default CreateUpdate
