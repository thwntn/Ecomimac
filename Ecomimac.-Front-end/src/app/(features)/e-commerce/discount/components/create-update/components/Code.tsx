import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import { discountCodeSelectOptions } from "../../_meta"
import { Form, RecordAndCounter, useGet } from "@/utils/hooks"
import { FormObject } from ".."
import Dropdown from "@/app/(components)/dropdown"
import { RouteMap, DiscountCode, Helper, Message } from "@/utils/common"
import Input from "@/app/(components)/input"
import { ProductResponse } from "@/utils/interface"

const Code = ({ form }: { form: Form<FormObject> }) => {
  const products = useGet<RecordAndCounter<ProductResponse>>(RouteMap.PRODUCT)

  const getTypeMode = () =>
    discountCodeSelectOptions.find(
      (item) => item.enum === form.data.discountCode
    )

  return (
    <Column gap={16}>
      <Column>
        <Title>4. Giá trị</Title>
        <Description>Thiết lập giá trị hoá đơn, chặn trên, ...</Description>
      </Column>
      <Dropdown
        label="Loại mã gỉam giá"
        reference={getTypeMode()}
        items={discountCodeSelectOptions}
        each={(item) => item.name}
        show={(item) => item.name}
        onChange={(item) => form.append("discountCode", item.enum)}
      ></Dropdown>

      <RenderIf
        reference={form.data.discountCode == DiscountCode.PERCENT}
        render={() => (
          <Row gap={20}>
            <Input
              label="Giảm theo % hoá đơn"
              placeholder="0.2"
              type="number"
              error={Message.CHECK_VALUE}
              {...form.create("percent")}
            ></Input>
            <Input
              label="Giảm tối đa"
              placeholder="50000"
              type="number"
              error={Message.CHECK_VALUE}
              {...form.create("maxAmount")}
            ></Input>
          </Row>
        )}
      ></RenderIf>

      <RenderIf
        reference={form.data.discountCode == DiscountCode.AMOUNT}
        render={() => (
          <Input
            label="Giá giảm cho tổng hoá đơn"
            placeholder="20000"
            error={Message.UNDER_ZERO}
            {...form.create("amount")}
          ></Input>
        )}
      ></RenderIf>
    </Column>
  )
}

export default Code
