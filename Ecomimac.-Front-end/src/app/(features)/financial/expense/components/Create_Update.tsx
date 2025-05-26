import Button from "@/app/(components)/button"
import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"
import Dropdown from "@/app/(components)/dropdown"
import Input from "@/app/(components)/input"
import Popup from "@/app/(components)/popup"
import Title from "@/app/(components)/title"
import Row from "@/app/(components)/row"
import Calendar from "@/app/(components)/calendar"
import { RecordAndCounter, useForm, useGet, usePatch, usePost } from "@/utils/hooks"
import {
  ExpenseCategoryResponse,
  ExpenseResponse,
  ProductResponse,
} from "@/utils/interface"
import { RouteMap, concatPathName, Helper } from "@/utils/common"
import { OFF } from "@/app/(components)/common"
import Text from "@/app/(components)/text"
import { usePut } from "@/utils/hooks/Put"
import OptionTag from "@/app/(components)/option-tag"
import { TagResponse } from "@/utils/interface/Tag"

export type RangePromotionProduct = "product" | "freeProduct"
export type RangePromotionQuantity = "quantity" | "freeQuantity"

export class FormData {
  id?: string
  name: string
  description: string
  fromDate: Date
  toDate: Date
  tags: TagResponse[]
}

const CreateUpdate = ({
  onExit,
  expenseCategory,
}: {
  onExit: VoidFunction
  expenseCategory?: ExpenseCategoryResponse
}) => {
  const create = usePost<ExpenseResponse>(RouteMap.EXPENSE_CATEGORY)
  const update = usePut<ExpenseResponse>(RouteMap.EXPENSE_CATEGORY)

  const form = useForm<FormData>(
    Object.assign(
      {
        promotionProducts: [new ProductResponse()],
        tags: [],
      },
      expenseCategory
    )
  )

  const onSubmit = () => {
    const validated = form.validate.run()
    if (validated === OFF) return /// Not validated

    const request = Object.assign(form.data, {
      tagIds: form.data.tags.map((tag) => tag.id),
    })

    if (form.data.id) update.request(request)
    else create.request(request)

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
      name="Danh mục chi tiêu"
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
          label="Tên danh mục"
          placeholder="Giảm giá tháng 10"
          {...form.create("name")}
        ></Input>
        <Text
          autoFocus
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
            onChange={(date) =>
              form.append("fromDate", Helper.Time.format(date))
            }
          ></Calendar>
          <Calendar
            label="Ngày kết thúc"
            onChange={(date) => form.append("toDate", Helper.Time.format(date))}
          ></Calendar>
        </Row>

        <Column gap={16}>
          <Column>
            <Title>Thiết lập thẻ</Title>
            <Description>
              Gắn nhãn hoặc đánh dấu một đối tượng trong hệ thống như sản phẩm,
              bài viết, tài liệu, hoặc dữ liệu khác
            </Description>
          </Column>
          <OptionTag onChange={(tags) => form.append("tags", tags)}></OptionTag>
        </Column>
      </Column>
    </Popup>
  )
}

export default CreateUpdate
