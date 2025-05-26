import Button from "@/app/(components)/button"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Editor from "@/app/(components)/editor"
import Icon from "@/app/(components)/icon"
import Image from "@/app/(components)/image"
import Input from "@/app/(components)/input"
import OptionTag from "@/app/(components)/option-tag"
import Popup from "@/app/(components)/popup"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import Upload from "@/app/(components)/upload"
import { RouteMap } from "@/utils/common"
import { Message } from "@/utils/common/Constant"
import {
  useEffectOnce,
  useForm,
  usePatch,
  usePost,
  Validate,
} from "@/utils/hooks"
import { ProductResponse } from "@/utils/interface"
import { TagResponse } from "@/utils/interface/Tag"
import { useCallback } from "react"

export class FormObject {
  id?: string
  name: string
  price: number
  description: string
  sale: number
  htmlDetail: string
  images: File[]
  tags: TagResponse[]
}

const validate: Validate<FormObject> = {
  description: (content: string) => content && content.length > 20,
  name: (content: string) => content.length > 0,
  price: (price: number) => price > 0,
  images: (images: [] | undefined) => images && images.length > 0,
  sale: (sale: number) => sale && Number(sale) >= 0 && Number(sale) <= 1,
  htmlDetail: (content: string) => content,
  tags: (tags: TagResponse[]) => tags.length > 0,
}

const initialForm = {
  tags: [],
}

const CreateUpdate = ({
  product,
  onExit,
}: {
  product?: ProductResponse
  onExit: VoidFunction
}) => {
  const form = useForm<FormObject>(
    Object.assign(initialForm, product),
    validate
  )

  const [updateImage, create, update] = [
    usePost(RouteMap.PRODUCT + "/" + RouteMap.UPDATE_IMAGE),
    usePost<ProductResponse>(RouteMap.PRODUCT),
    usePatch<ProductResponse>(RouteMap.PRODUCT),
  ]

  const fetchImage = async () => {
    if (product === undefined) return

    const images = (
      await Promise.all(
        product.imageProducts.map(
          async (item) =>
            await fetch(item.url)
              .then((response) => response.blob())
              .catch(() => new Blob())
        )
      )
    ).map((item) => new File([item], item.type))
    form.append("images", images)
  }

  const onFinish = useCallback(() => {
    const status = form.validate.run()
    if (status === 0) return

    const request = Object.assign(
      { tagIds: form.data.tags.map((tag) => tag.id) },
      form.data
    )

    const promise =
      form.data.id === undefined
        ? create.request(request, { silent: true })
        : update.request(request, {
            pathname: request.id,
            silent: true,
          })

    promise
      .then((response) => {
        if (form.data.images.length === 0) return

        const formData = new FormData()
        form.data.images.forEach((item) => formData.append(item.name, item))
        updateImage.request(formData, {
          pathname: response.id,
        })
      })
      .finally(() => form.set(initialForm))

    onExit()
  }, [form, create, update])

  const removeImage = function (file: File) {
    const images = form.data.images.filter((item) => item !== file)
    form.append("images", images)
  }

  useEffectOnce(() => void fetchImage())
  return (
    <Popup
      name="Tạo mới"
      trigger={
        <Button main onClick={onFinish}>
          Hoàn tất
        </Button>
      }
      width={564}
      onExit={onExit}
    >
      <Column gap={20} size={7}>
        <Column>
          <Title>1. Tổng quan</Title>
          <Description>
            Tên gọi của sản phẩm mà người bán muốn người mua nhận biết. Tên của
            nhóm các sản phẩm có ít nhất một đặc tính chung tương tự nào đó.
          </Description>
        </Column>
        <Input
          autoFocus
          label="Tên sản phẩm *"
          placeholder="Bánh, khăn, túi,..."
          error={Message.CONTENT_NOT_EMPTY}
          {...form.create("name")}
        ></Input>
        <Row gap={12}>
          <Input
            label="Giá bán *"
            placeholder="100000"
            error={Message.CONTENT_NOT_EMPTY}
            {...form.create("price")}
          ></Input>
          <Input
            label="Giảm giá *"
            placeholder="0.1"
            error={Message.CHECK_VALUE}
            {...form.create("sale")}
          ></Input>
        </Row>
        <Column>
          <Title>2. Mô tả</Title>
          <Description>
            Product thông tin, hay còn gọi là sản phẩm số (digital product), là
            một loại sản phẩm phi vật lý mà bạn có thể tạo ra.
          </Description>
        </Column>
        <Input
          label="Mô tả *"
          placeholder="Các thông tin của sản phẩm: Tên, thông tin, hình ảnh, thuộc tính, giá, tình trạng sản phẩm"
          error={Message.CONTENT_SHORT}
          {...form.create("description")}
        ></Input>
        <Row>
          <Editor
            label="Thông tin *"
            onChange={(content) => form.append("htmlDetail", content)}
            placeholder="Information, thuôc tính, ghi chú,..."
            value={form.data.htmlDetail}
          ></Editor>
        </Row>
        <Column>
          <Title>3. Hình ảnh</Title>
          <Description>
            Chụp ảnh sản phẩm cho bạn biết rất nhiều về sản phẩm từ kích thước,
            hình dạng, màu sắc và thậm chí cả cách sử dụng nó.
          </Description>
        </Column>
        <Upload
          onChange={(files) => {
            console.log(files)

            form.append(
              "images",
              form.data.images ? form.data.images.concat(files) : files
            )
          }}
          accept={[".png", ".jpg", ".web", ".jpeg"]}
        ></Upload>
        <Column gap={2}>
          <Title>Xem trước</Title>

          <RenderIf
            reference={form.data.images === undefined}
            render={() => <Description>Chưa có hình ảnh</Description>}
          ></RenderIf>

          <Content className="text-[#ff1515] text-[10px]">
            {form.validate.get("images") === 0 && Message.CAN_NOT_EMPTY}
          </Content>
          <Row className="max-w-[100%] overflow-auto" gap={12}>
            {form.data.images?.map((item, index) => (
              <div className="relative border rounded-[12px]" key={index}>
                <Image
                  className="rounded-[12px]"
                  width={120}
                  height={120}
                  src={URL.createObjectURL(item)}
                ></Image>
                <div
                  onClick={() => removeImage(item)}
                  className="absolute bg-[#ffffffc2] backdrop-blur-[4px] border rounded-full right-[4px] top-[4px]"
                >
                  <Icon dir="icon/remove.svg"></Icon>
                </div>
              </div>
            ))}
          </Row>
        </Column>
      </Column>
      <Column gap={16}>
        <Column>
          <Title>5. Gắn thẻ</Title>
          <Description>
            Tên gọi của sản phẩm mà người bán muốn người mua nhận biết. Tên của
            nhóm các sản phẩm có ít nhất một đặc tính chung tương tự nào đó.
          </Description>
        </Column>
        <OptionTag onChange={(tags) => form.append("tags", tags)}></OptionTag>
      </Column>
    </Popup>
  )
}

export default CreateUpdate
