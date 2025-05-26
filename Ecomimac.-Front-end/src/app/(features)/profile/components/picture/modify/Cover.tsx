import { Fetched, useForm, usePost } from "@/utils/hooks"
import { Fragment } from "react"
import Popup from "@/app/(components)/popup"
import { ON } from "@/app/(components)/common"
import RenderIf from "@/app/(components)/render-if"
import Content from "@/app/(components)/content"
import Upload from "@/app/(components)/upload"
import Picture from ".."
import { AccountResponse } from "@/utils/interface"
import { RouteMap } from "@/utils/common"
import { toFormData } from "axios"
import Icon from "@/app/(components)/icon"
import Button from "@/app/(components)/button"

export interface FormData {
  objectURL: string
  file: File
}

const Cover = ({
  onExit,
  account,
}: {
  onExit: VoidFunction
  account: Fetched<AccountResponse>
}) => {
  const form = useForm<FormData>()
  const avatar = usePost(RouteMap.PROFILE + "/" + RouteMap.UPDATE_COVER)

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

  return (
    <Popup
      name="Cập nhật hình nền"
      width={512}
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
          if (form.data.objectURL)
            data.profile.coverPicture = form.data.objectURL
          return (
            <Fragment>
              <Content>1. Chọn ảnh hoặc kéo thả ảnh vào ô tải lên</Content>
              <Upload
                onChange={(files) => files.length > 0 && onUpload(files)}
              ></Upload>
              <Content>2. Quan sát thay đổi</Content>
              <Picture account={account} silent={ON} />
            </Fragment>
          )
        }}
      ></RenderIf>
    </Popup>
  )
}

export default Cover
