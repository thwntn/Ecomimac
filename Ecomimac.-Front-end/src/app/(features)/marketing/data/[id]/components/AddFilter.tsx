import { concatPathName, Message, RouteMap, upperFirstLetter } from "@/utils/common"
import { useForm, useGet, usePost, Validate } from "@/utils/hooks"
import { DataResponse, OperatorResponse } from "@/utils/interface/Data"
import Button from "@/app/(components)/button"
import Column from "@/app/(components)/column"
import { convert, OFF } from "@/app/(components)/common"
import Description from "@/app/(components)/description"
import Dropdown from "@/app/(components)/dropdown"
import Input from "@/app/(components)/input"
import Popup from "@/app/(components)/popup"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"

interface IProps {
  information: DataResponse
  onExit: () => void
}

interface FormData {
  dataId: string
  column: string
  value: string
  operator: number
}

const validate: Validate<FormData> = {
  dataId: (dataId: string) => dataId,
  column: (column: string) => column,
  value: (value: string) => value,
  operator: (operator: number) => [0, 1, 2, 3].includes(operator),
}

const AddFilter = (props: IProps) => {
  const form = useForm<FormData>({ dataId: props.information.id }, validate)
  const postOperator = usePost(concatPathName(RouteMap.FILTER))

  const fetchOperator = useGet<Array<OperatorResponse>>(
    concatPathName(RouteMap.FILTER, RouteMap.OPERATOR)
  )

  const columnSelection = props.information.parseSchema.map((item) => ({
    value: undefined,
    name: item,
  }))

  const onFinish = () => {
    if (form.validate.run() === OFF) return
    postOperator.request(form.data)
    props.onExit()
  }

  const isLoad = convert(!fetchOperator.response)
  return (
    <Popup
      isLoad={isLoad}
      width={645}
      onExit={props.onExit}
      name="Bộ lọc"
      trigger={
        <Button icon="icon/edit-light.svg" main onClick={onFinish}>
          Hoàn tất
        </Button>
      }
    >
      <Column gap={8}>
        {/* Title */}
        <Column>
          <Title>Cột áp dụng bộ lọc</Title>
          <Description>Bộ lọc sử dụng trong nguồn dữ liệu</Description>
        </Column>
        {/* Dropdown */}
        <Dropdown
          {...form.create("column")}
          error={Message.CAN_NOT_EMPTY}
          items={columnSelection}
          label="Cột áp dụng bộ lọc"
          each={(item) => upperFirstLetter(item.name)}
          onChange={(item) => form.append("column", item.name)}
        ></Dropdown>
      </Column>
      {/* Operator & Value */}
      <Column gap={8}>
        <Column>
          <Title>Cột áp dụng bộ lọc</Title>
          <Description>Bộ lọc sử dụng trong nguồn dữ liệu</Description>
        </Column>
        {/* Operator */}
        <Row gap={16} itemsCenter>
          <RenderIf
            reference={fetchOperator.response}
            render={(operator) => (
              <Dropdown
                {...form.create("operator")}
                error={Message.CAN_NOT_EMPTY}
                items={operator}
                label="Toán tử"
                each={(item) => item.title}
                onChange={(item) => form.append("operator", item.key)}
              ></Dropdown>
            )}
          ></RenderIf>
          {/* Value */}
          <Input
            label="Giá trị"
            error={Message.CAN_NOT_EMPTY}
            placeholder="Nhập giá trị"
            {...form.create("value")}
          ></Input>
        </Row>
      </Column>
    </Popup>
  )
}

export default AddFilter
