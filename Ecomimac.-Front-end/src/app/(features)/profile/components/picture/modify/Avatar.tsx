import { Fetched, useForm, usePost } from "@/utils/hooks"
import { Fragment } from "react"
import Popup from "@/app/(components)/popup"
import Button from "@/app/(components)/button"
import { ON } from "@/app/(components)/common"
import RenderIf from "@/app/(components)/render-if"
import Content from "@/app/(components)/content"
import Upload from "@/app/(components)/upload"
import Picture from ".."
import { AccountResponse } from "@/utils/interface"
import { RouteMap } from "@/utils/common"
import { toFormData } from "axios"
import Icon from "@/app/(components)/icon"
import Title from "@/app/(components)/title"
import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"

export interface FormData {
  objectURL: string
  file: File
}

const Avatar = ({
  onExit,
  account,
}: {
  onExit: VoidFunction
  account: Fetched<AccountResponse>
}) => {
  const form = useForm<FormData>()
  const avatar = usePost(RouteMap.PROFILE + "/" + RouteMap.CHANGE_AVATAR)

  const onUpload = (files: File[]) => {
    const file = files[0]
    form.set({
      objectURL: URL.createObjectURL(file),
      file,
    })
  }

  const onUpdate = () => {
    const data = toFormData(form.data)
    avatar.request(data)
    onExit()
  }
  1
  return (
    <Popup
      name="Hình đại diện"
      width={564}
      onExit={onExit}
      trigger={
        <Button main icon="icon/edit-light.svg" onClick={onUpdate}>
          Hoàn tất
        </Button>
      }
    >
      <RenderIf
        reference={account.response}
        render={(data) => {
          if (form.data.objectURL) data.profile.avatar = form.data.objectURL
          return (
            <Fragment>
              <Column>
                <Title>1. Chọn ảnh</Title>
                <Description>
                  Cho phép người dùng chọn một hình ảnh từ máy tính, thư viện
                  hoặc URL để gắn vào một nội dung cụ thể
                </Description>
              </Column>
              <Upload
                onChange={(files) => files.length > 0 && onUpload(files)}
              ></Upload>
              <Column>
                <Title>2. Xem trước</Title>
                <Description>Xem trước hình ảnh</Description>
              </Column>
              <Picture account={account} silent={ON} />
            </Fragment>
          )
        }}
      ></RenderIf>
    </Popup>
  )
}

export default Avatar
