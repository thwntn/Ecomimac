import { concatPathName, DataType, Message, RouteMap } from "@/utils/common"
import { useForm, usePost, Validate } from "@/utils/hooks"
import { DataResponse } from "@/utils/interface/Data"
import Button from "@/app/(components)/button"
import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"
import Dropdown from "@/app/(components)/dropdown"
import Input from "@/app/(components)/input"
import Popup from "@/app/(components)/popup"
import RenderIf from "@/app/(components)/render-if"
import Text from "@/app/(components)/text"
import Title from "@/app/(components)/title"
import { typeDataSelections } from "../_"
import Excel from "./Excel"
import { OFF } from "@/app/(components)/common"

interface IProps {
  onExit(): void
}

export interface FormData {
  type: number
  name: string
  description: string
  file?: File
}

const validate: Validate<FormData> = {
  type: (type: DataType) => Object.values(DataType).includes(type),
  description: (description: string) => description,
  name: (name: string) => name,
  file: (file: File, formdata: FormData) => {
    if (formdata.type === DataType.IMPORT_FROM_EXCEL) return file
    return true
  },
}

const CreateUpdate = (props: IProps) => {
  const form = useForm<FormData>({}, validate)
  const create = usePost<DataResponse>(RouteMap.DATA)
  const add = usePost<DataResponse>(RouteMap.DATA)

  const onSubmit = () => {
    //
    //  Summary:
    //    Validate form input
    //
    //  Returns:
    //
    if (form.validate.run() === OFF) return

    //
    //  Summary:
    //    Request create data
    //
    //  Returns:
    //
    create.request(form.data).then((response) => {
      if (
        (form.data.type === DataType.IMPORT_FROM_EXCEL) === false ||
        form.data.file === undefined
      )
        return

      const data = new FormData()
      data.append("formFiles", form.data.file)
      add.request(data, {
        pathname: concatPathName(response.id, RouteMap.IMPORT),
      })
    })
    props.onExit()
  }
  return (
    <Popup
      onExit={props.onExit}
      width={654}
      name="Dữ liệu"
      trigger={
        <Button icon="icon/edit-light.svg" main onClick={onSubmit}>
          Hoàn tất
        </Button>
      }
    >
      <Column gap={8}>
        <Column>
          <Title>Nguồn dữ liệu</Title>
          <Description>
            Đặt tên để phân loại và quản lý dễ dàng. Ví dụ: Danh sách khách hàng
            chiến dịch T12.
          </Description>
        </Column>
        <Input
          label="Tên"
          error={Message.CAN_NOT_EMPTY}
          placeholder="Dữ liệu khách hàng tiềm năng, ..."
          {...form.create("name")}
        ></Input>
        <Text
          label="Mô tả"
          error={Message.CAN_NOT_EMPTY}
          placeholder="Quảng cáo sản phẩm chương trình cuối năm, ..."
          {...form.create("description")}
        ></Text>
      </Column>

      <Column gap={8}>
        <Column>
          <Title>Cách nhập dữ liệu</Title>
          <Description>
            Chọn cách bạn muốn đưa dữ liệu vào hệ thống. Hiện tại hỗ trợ nhập từ
            Excel.
          </Description>
        </Column>
        <Dropdown
          {...form.create("type")}
          label="Loại dữ liệu"
          error={Message.CAN_NOT_EMPTY}
          onChange={(item) => form.append("type", item.enum)}
          items={typeDataSelections}
          each={(item) => item.name}
        ></Dropdown>
      </Column>

      <RenderIf
        reference={form.data.type === DataType.IMPORT_FROM_EXCEL}
        render={() => <Excel form={form}></Excel>}
      ></RenderIf>
    </Popup>
  )
}

export default CreateUpdate
