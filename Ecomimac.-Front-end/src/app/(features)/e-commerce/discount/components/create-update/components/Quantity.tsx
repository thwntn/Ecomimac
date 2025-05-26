import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"
import Dropdown from "@/app/(components)/dropdown"
import Title from "@/app/(components)/title"
import { quantitySelectOptions } from "../../_meta"
import { Form } from "@/utils/hooks"
import { FormObject } from ".."
import RenderIf from "@/app/(components)/render-if"
import { DiscountQuantityType, Message } from "@/utils/common"
import Input from "@/app/(components)/input"

const Quantity = ({ form }: { form: Form<FormObject> }) => {
  const getQuantityMode = () =>
    quantitySelectOptions.find(
      (item) => item.enum === form.data.discountQuantityType
    )

  return (
    <Column gap={16}>
      <Column>
        <Title>5. Số lượng</Title>
        <Description>Số lượng mã giảm dần theo hoá đơn bán hàng</Description>
      </Column>
      <Dropdown
        label="Số lượng mã"
        reference={getQuantityMode()}
        items={quantitySelectOptions}
        each={(item) => item.name}
        show={(item) => item.name}
        onChange={(item) => form.append("discountQuantityType", item.enum)}
      ></Dropdown>
      <RenderIf
        reference={
          form.data.discountQuantityType === DiscountQuantityType.WITH_QUANTITY
        }
        render={() => (
          <Input
            label="Số lượng"
            placeholder="1000"
            type="number"
            error={Message.UNDER_ZERO}
            {...form.create("quantity")}
          ></Input>
        )}
      ></RenderIf>
    </Column>
  )
}

export default Quantity
