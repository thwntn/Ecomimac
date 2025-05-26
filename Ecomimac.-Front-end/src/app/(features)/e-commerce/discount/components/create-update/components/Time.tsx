import { DiscountTimeFrameType, Message } from "@/utils/common"
import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import { discountSelectOptions, ObjectType } from "../../_meta"
import { Form } from "@/utils/hooks"
import { FormObject } from ".."
import Dropdown from "@/app/(components)/dropdown"
import Calendar from "@/app/(components)/calendar"

const Time = ({ form }: { form: Form<FormObject> }) => {
  const onSelectType = (value: ObjectType<DiscountTimeFrameType>) =>
    form.append("discountTimeFrameType", value.enum)

  const getTimeFrameMode = () =>
    discountSelectOptions.find(
      (item) => item.enum === form.data.discountTimeFrameType
    )

  return (
    <Column gap={16}>
      <Column>
        <Title>2. Thời gian áp dụng</Title>
        <Description>
          Hoá đơn cố định không giới hạn thời gian. Hoá đơn linh động chỉ được
          mở trong khoảng thời gian nhất định
        </Description>
      </Column>
      <Row>
        <RenderIf
          reference={getTimeFrameMode()}
          render={(select) => (
            <Dropdown
              label="Thời hạn mã giảm giá"
              reference={select}
              onChange={onSelectType}
              show={(item) => item.name}
              items={discountSelectOptions}
              each={(item) => <div>{item.name}</div>}
            ></Dropdown>
          )}
        ></RenderIf>
      </Row>
      <RenderIf
        reference={
          form.data.discountTimeFrameType === DiscountTimeFrameType.TIME_FRAME
        }
        render={() => (
          <Row gap={16}>
            <Calendar
              label="Ngày bắt đầu"
              onChange={(date) => form.append("fromDate", date)}
              validated={form.validate.get("fromDate")}
            ></Calendar>
            <Calendar
              label="Ngày kết thúc"
              onChange={(date) => form.append("toDate", date)}
              validated={form.validate.get("toDate")}
              error={Message.END_DATE}
            ></Calendar>
          </Row>
        )}
      ></RenderIf>
    </Column>
  )
}

export default Time
