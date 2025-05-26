import { concatPathName, Redirect } from "@/utils/common"
import Character from "@/app/(components)/character"
import Column from "@/app/(components)/column"
import { convert } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import List from "@/app/(components)/list"
import ListRender from "@/app/(components)/list/render"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import { Fetched } from "@/utils/hooks"
import { SaleProgramResponse } from "@/utils/interface"
import { useRouter } from "@/utils/functions"
import { Fragment } from "react"

const Discount = ({
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
            <Title>Mã giảm giá</Title>
            <List
              items={saleProgram.saleProgramDiscounts}
              silent
              onClick={(item) =>
                router.push(concatPathName(Redirect.DISCOUNT, item.discount.id))
              }
              column={["Thông tin", String(), "Mã giảm", "Loại"]}
              each={(saleProgramDiscount) => {
                const discount = saleProgramDiscount.discount
                return (
                  <Fragment>
                    <Row itemsCenter gap={16} className="col-span-2">
                      <Character text={discount.code}></Character>
                      <Column>
                        <Content className="line-clamp-1">
                          {discount.name}
                        </Content>
                        <Description lineClamp={1}>
                          {discount.description}
                        </Description>
                      </Column>
                    </Row>
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

export default Discount
