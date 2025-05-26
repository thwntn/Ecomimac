import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"
import Input from "@/app/(components)/input"
import RenderIf from "@/app/(components)/render-if"
import Text from "@/app/(components)/text"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import { Fetched, Form } from "@/utils/hooks"
import Barcode from "react-barcode"
import { FormData } from "../Information"
import { ProductResponse } from "@/utils/interface"

const Details = ({
  form,
  product,
}: {
  form: Form<FormData>
  product: Fetched<ProductResponse>
}) => {
  return (
    <Wrapper>
      <Title icon="icon/info.svg">Thông tin cơ bản</Title>
      <Column gap={16}>
        <Column>
          <Title>Hình ảnh</Title>
          <Description>
            Hình minh họa bức ảnh và hình ảnh sẵn có hiện có hoặc bắt đầu tìm
            kiếm mới để khám phá
          </Description>
        </Column>

        <Input
          placeholder="T-shirt"
          label="Tên sản phầm"
          {...form.create("name")}
        ></Input>
        <Text
          placeholder="Sản phẩm đến từ ..."
          label="Mô tả sản phầm"
          {...form.create("description")}
        ></Text>
      </Column>

      <Column gap={16}>
        <Column>
          <Title>Mã vạch sản phầm</Title>
          <Description>
            Hình minh họa bức ảnh và hình ảnh sẵn có hiện có hoặc bắt đầu tìm
            kiếm mới để khám phá
          </Description>
        </Column>
        <RenderIf
          reference={product.response}
          render={(product) => (
            <Barcode
              value={product.code}
              fontSize={0}
              background="#00000000"
            ></Barcode>
          )}
        ></RenderIf>
      </Column>
    </Wrapper>
  )
}

export default Details
