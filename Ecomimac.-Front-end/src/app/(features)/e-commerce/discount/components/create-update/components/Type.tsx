import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import { discountTypeSelectOptions } from "../../_meta"
import { Form, RecordAndCounter, useGet } from "@/utils/hooks"
import { FormObject } from ".."
import Dropdown from "@/app/(components)/dropdown"
import { RouteMap } from "@/utils/common"
import { ProductResponse } from "@/utils/interface"

const Type = ({ form }: { form: Form<FormObject> }) => {
  const products = useGet<RecordAndCounter<ProductResponse>>(RouteMap.PRODUCT)

  const getTypeMode = () =>
    discountTypeSelectOptions.find(
      (item) => item.enum === form.data.discountType
    )

  return (
    <Column gap={16}>
      <Column>
        <Title>3. Phạm vi mã giảm giá</Title>
        <Description>Thiết lập giá trị hoá đơn, chặn trên, ...</Description>
      </Column>
      <Dropdown
        label="Loại mã giảm giá"
        reference={getTypeMode()}
        items={discountTypeSelectOptions}
        each={(item) => item.name}
        show={(item) => item.name}
        onChange={(item) => form.append("discountType", item.enum)}
      ></Dropdown>
    </Column>
  )
}

export default Type
