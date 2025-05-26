import { concatPathName, Helper, Redirect } from "@/utils/common"
import Column from "@/app/(components)/column"
import { convert } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import DateTime from "@/app/(components)/date-time"
import Description from "@/app/(components)/description"
import Image from "@/app/(components)/image"
import List from "@/app/(components)/list"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import { Fetched } from "@/utils/hooks"
import { SaleProgramResponse } from "@/utils/interface"
import { useRouter } from "@/utils/functions"
import { Fragment } from "react"

const Product = ({
  saleProgram,
}: {
  saleProgram: Fetched<SaleProgramResponse>
}) => {
  const router = useRouter()
  const isLoad = convert(!saleProgram.response)
  return (
    <Wrapper isLoad={isLoad}>
      <RenderIf
        reference={saleProgram.response}
        render={(saleProgram) => (
          <Fragment>
            <Title icon="icon/info.svg">Sản phẩm</Title>
            <List
              items={saleProgram.saleProgramProducts}
              fit
              silent
              onClick={(item) =>
                router.push(concatPathName(Redirect.PRODUCT, item.product.id))
              }
              column={["Thông tin", String(), "Ngày tạo", "Doanh thu"]}
              each={(saleProgramProduct) => {
                const product = saleProgramProduct.product
                return (
                  <Fragment>
                    <Row className="col-span-2" gap={8} itemsCenter>
                      <Image
                        width={48}
                        height={48}
                        className="rounded-full"
                        src={
                          Helper.Data.getAvatarProduct(product.imageProducts)
                            .url
                        }
                      ></Image>
                      <Column>
                        <Content>{product.name}</Content>
                        <Description lineClamp={2}>
                          {product.description}
                        </Description>
                      </Column>
                    </Row>

                    <DateTime dateTime={new Date(product.created)}></DateTime>
                    <Content className="text-right text-nowrap">
                      {Helper.Currency.vietNamDong(product.price)}
                    </Content>
                  </Fragment>
                )
              }}
            ></List>
          </Fragment>
        )}
      ></RenderIf>
    </Wrapper>
  )
}

export default Product
