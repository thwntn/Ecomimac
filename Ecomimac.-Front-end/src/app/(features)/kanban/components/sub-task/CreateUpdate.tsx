"use client"

import { Validate, useForm, usePost } from "@/utils/hooks"
import { KabanResponse } from "@/utils/interface"
import { RouteMap } from "@/utils/common"
import { OFF } from "@/app/(components)/common"
import { Message } from "@/utils/common"
import Popup from "@/app/(components)/popup"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Input from "@/app/(components)/input"
import Editor from "@/app/(components)/editor"
import Upload from "@/app/(components)/upload"
import RenderIf from "@/app/(components)/render-if"
import Image from "@/app/(components)/image"
import Icon from "@/app/(components)/icon"

export interface FormObject {
  title: string
  kabanCategoryId?: string
  htmlContent: string
  file: File
}

const validate: Validate<FormObject> = {
  title: (title: string) => title,
  file: () => true,
  htmlContent: (htmlContent: File) => htmlContent,
}

const CreateUpdate = ({
  onExit,
  kaban,
  kabanCategoryId,
}: {
  onExit: VoidFunction
  kaban?: KabanResponse
  kabanCategoryId: string
}) => {
  const form = useForm<FormObject>({ ...kaban, kabanCategoryId }, validate)
  const create = usePost<KabanResponse>(RouteMap.KABANS)
  const image = usePost(RouteMap.KABANS + "/" + RouteMap.IMAGE)

  const save = () => {
    const status = form.validate.run()
    if (status === OFF) return

    onExit()
    create.request(form.data).then((response) => {
      if (form.data.file === undefined) return

      const formData = new FormData()
      formData.append(form.data.file.name, form.data.file)
      //
      image.request(formData, {
        pathname: response.id,
      })
    })
  }
  return (
    <Popup
      name="Tạo công việc"
      trigger={
        <Icon dir="icon/done.svg" onClick={save}>
          Create
        </Icon>
      }
      onExit={onExit}
      width={546}
    >
      <Column gap={8}>
        <Content>1. Tiêu đề</Content>
        <Description>
          Bản tiêu chuẩn công việc là một loại văn bản dùng để miêu tả những yêu
          cầu của nhà tuyển dụng dành cho ứng viên về một vị trí công việc
        </Description>
        <Input
          {...form.create("title")}
          autoFocus
          error={Message.CAN_NOT_EMPTY}
          label="Mô tả công việc"
          placeholder="Làm báo cáo thống kê tốc độ phát triển..."
        ></Input>
      </Column>
      <Column gap={8}>
        <Content>2. Mô tả công việc</Content>
        <Description>
          Bản tiêu chuẩn công việc là một loại văn bản dùng để miêu tả những yêu
          cầu của nhà tuyển dụng dành cho ứng viên về một vị trí công việc
        </Description>
        <Editor
          value={form.data.htmlContent}
          placeholder="Bản tiêu chuẩn công việc là một loại văn bản..."
          label="Mô tả công việc"
          onChange={(content) => form.append("htmlContent", content)}
        />
      </Column>
      <Column gap={8}>
        <Content>2. Hình ảnh minh hoạ</Content>
        <Description>
          Bản tiêu chuẩn công việc là một loại văn bản dùng để miêu tả những yêu
          cầu của nhà tuyển dụng dành cho ứng viên về một vị trí công việc
        </Description>
        <Upload onChange={(files) => form.append("file", files.at(0))} />
        <RenderIf
          reference={form.data.file}
          render={(image) => (
            <Image
              width="100%"
              height="auto"
              className=" aspect-[2/1.5]"
              src={URL.createObjectURL(image)}
            ></Image>
          )}
        />
      </Column>
    </Popup>
  )
}

export default CreateUpdate
