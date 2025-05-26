import Button from "@/app/(components)/button"
import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"
import Dropdown from "@/app/(components)/dropdown"
import Input from "@/app/(components)/input"
import Popup from "@/app/(components)/popup"
import Title from "@/app/(components)/title"
import { QuantityType, promotionOptions, PromotionType } from "../../_Meta"
import Row from "@/app/(components)/row"
import Calendar from "@/app/(components)/calendar"
import {
  RecordAndCounter,
  useForm,
  useGet,
  usePatch,
  usePost,
  usePut,
} from "@/utils/hooks"
import RenderIf from "@/app/(components)/render-if"
import BuyOneGetOne from "./FreeProduct"
import { ProductResponse, PromotionResponse } from "@/utils/interface"
import { RouteMap, Helper } from "@/utils/common"
import { default as PromotionProductComponent } from "./PromotionProducts"
import { OFF } from "@/app/(components)/common"
import Text from "@/app/(components)/text"
import { TagResponse } from "@/utils/interface/Tag"
import OptionTag from "@/app/(components)/option-tag"

export type RangePromotionProduct = "product" | "freeProduct"
export type RangePromotionQuantity = "quantity" | "freeQuantity"

export const INIT_QUANTITY_PRODUCT = 1

export class PromotionProducts {
  productId: string
  product: ProductResponse
  freeProductId: string
  freeProduct: ProductResponse
  quantity: number
  freeQuantity: number
  type: QuantityType
}

export class FormData {
  id?: string
  name: string
  description: string
  fromDate: Date
  toDate: Date
  promotionType: PromotionType
  promotionProducts: PromotionProducts[]
  tags: TagResponse[]
}

const initialForm = {
  promotionProducts: [new ProductResponse()],
  tags: [],
}

const CreateUpdate = ({
  onExit,
  promotion,
}: {
  onExit: VoidFunction
  promotion?: PromotionResponse
}) => {
  const products = useGet<RecordAndCounter<ProductResponse>>(RouteMap.PRODUCT)
  const create = usePost<PromotionProducts>(RouteMap.PROMOTION)
  const update = usePut<PromotionProducts>(RouteMap.PROMOTION)

  const form = useForm<FormData>(Object.assign(initialForm, promotion))

  const onSubmit = () => {
    const validated = form.validate.run()
    if (validated === OFF) return

    const formdata = Object.assign(
      { tagIds: form.data.tags.map((tag) => tag.id) },
      form.data
    )

    if (formdata.id) update.request(formdata)
    else create.request(formdata)
    onExit()
  }
  return (
    <Popup
      width={564}
      onExit={onExit}
      trigger={
        <Button main icon="icon/edit-light.svg" onClick={onSubmit}>
          Tạo mới
        </Button>
      }
      name="Khuyến mãi"
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
          label="Tên chương trình"
          placeholder="Giảm giá tháng 10"
          {...form.create("name")}
        ></Input>
        <Text
          autoFocus
          label="Mô tả"
          placeholder="Mua sản phẩm tặng miễn phí sản phẩm, ..."
          {...form.create("description")}
        ></Text>
        <Dropdown
          items={promotionOptions}
          each={(item) => item.name}
          show={(item) => item.name}
          label="Loại chương trình"
          onChange={(item) => form.append("promotionType", item.enum)}
        ></Dropdown>
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
            onChange={(date) =>
              form.append("fromDate", Helper.Time.format(date))
            }
          ></Calendar>
          <Calendar
            label="Ngày kết thúc"
            onChange={(date) => form.append("toDate", Helper.Time.format(date))}
          ></Calendar>
        </Row>
      </Column>

      <RenderIf
        reference={form.data.promotionType === PromotionType.BOGO}
        render={() => (
          <BuyOneGetOne products={products} form={form}></BuyOneGetOne>
        )}
      ></RenderIf>

      <RenderIf
        reference={form.data.promotionType !== PromotionType.BOGO}
        render={() => (
          <PromotionProductComponent
            products={products}
            form={form}
          ></PromotionProductComponent>
        )}
      ></RenderIf>

      <Column>
        <Column>
          <Title>Gắn thẻ</Title>
          <Description>Gom nhóm khuy</Description>
        </Column>
        <OptionTag onChange={(tags) => form.append("tags", tags)}></OptionTag>
      </Column>
    </Popup>
  )
}

export default CreateUpdate
