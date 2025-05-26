"use client"

import { Validate, useForm, usePost } from "@/utils/hooks"
import { RouteMap } from "@/utils/common"
import { KabanCategoryResponse } from "@/utils/interface"
import { OFF } from "@/app/(components)/common"
import { Message } from "@/utils/common"
import Popup from "@/app/(components)/popup"
import Button from "@/app/(components)/button"
import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"
import Input from "@/app/(components)/input"
import Icon from "@/app/(components)/icon"

export interface FormData {
  name: string
}

const validate: Validate<FormData> = {
  name: (name: string) => name,
}

const CreateUpdate = ({
  kaban,
  onExit,
}: {
  kaban?: KabanCategoryResponse
  onExit: VoidFunction
}) => {
  const form = useForm(Object(kaban), validate)
  const create = usePost(RouteMap.KABAN_CATEGORIES)

  const save = () => {
    const status = form.validate.run()
    if (status === OFF) return

    create.request(form.data)
    onExit()
  }

  return (
    <Popup
      name="Create trạng thái công việc"
      onExit={onExit}
      width={456}
      trigger={
        <Icon dir="icon/done.svg" onClick={save}>
          Create
        </Icon>
      }
    >
      <Column gap={16}>
        <Description>
          Status công việc trong dự án giúp cho người quản lý, người phụ trách
          công việc kiểm soát được tiến độ công việc của bản thân, và những
          người xung quanh
        </Description>
        <Input
          autoFocus
          {...form.create("name")}
          placeholder="Chờ thực hiện"
          label="Tên trạng thái"
          error={Message.CAN_NOT_EMPTY}
        ></Input>
      </Column>
    </Popup>
  )
}

export default CreateUpdate
