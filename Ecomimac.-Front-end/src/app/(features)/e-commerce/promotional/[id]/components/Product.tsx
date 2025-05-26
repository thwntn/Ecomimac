import { Helper } from "@/utils/common"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import DateTime from "@/app/(components)/date-time"
import Description from "@/app/(components)/description"
import Image from "@/app/(components)/image"
import List from "@/app/(components)/list"
import ListRender from "@/app/(components)/list/render"
import Profile from "@/app/(components)/profile"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import { Fetched } from "@/utils/hooks"
import { PromotionResponse } from "@/utils/interface"
import { Fragment } from "react"

const Product = ({
  getPromotion,
}: {
  getPromotion: Fetched<PromotionResponse>
}) => {
  return (
    <Row padding={8}>
      <RenderIf
        reference={getPromotion.response}
        reverse={<ListRender column={5} />}
        render={(promotion) => (
          <List
            column={[
              "Thông tin",
              "",
              "Sản phẩm khuyến mãi",
              "",
              "Ngày tạo",
              "Nguòi tạo",
              "Số lượng",
            ]}
            items={promotion.promotionProducts}
            each={(promotionProduct) => (
              <Fragment>
                <Row className="col-span-2" itemsCenter gap={8}>
                  <Image
                    src={
                      Helper.Data.getAvatarProduct(
                        promotionProduct.buyProduct.imageProducts
                      ).url
                    }
                    className="rounded-full"
                    width={56}
                    height={56}
                  ></Image>
                  <Column>
                    <Content>{promotionProduct.buyProduct.name}</Content>
                    <Description lineClamp={2}>
                      {promotionProduct.buyProduct.description}
                    </Description>
                  </Column>
                </Row>

                <Row gap={8} className="col-span-2">
                  <RenderIf
                    reference={promotionProduct.freeProduct}
                    render={(freeProduct) => (
                      <Fragment>
                        <Image
                          src={
                            Helper.Data.getAvatarProduct(
                              freeProduct.imageProducts
                            ).url
                          }
                          width={56}
                          height={56}
                          className="rounded-full"
                        ></Image>
                        <Column>
                          <Content>{promotionProduct.freeProduct.name}</Content>
                          <Description lineClamp={2}>
                            {promotionProduct.freeProduct.description}
                          </Description>
                        </Column>
                      </Fragment>
                    )}
                  ></RenderIf>
                </Row>

                <DateTime
                  dateTime={new Date(promotionProduct.buyProduct.created)}
                ></DateTime>

                <Profile
                  avatar={promotionProduct.buyProduct.profile.avatar}
                  name={promotionProduct.buyProduct.profile.name}
                  email={promotionProduct.buyProduct.profile.email}
                ></Profile>

                <Row>{promotionProduct.quantity} sản phẩm</Row>
              </Fragment>
            )}
          ></List>
        )}
      ></RenderIf>
    </Row>
  )
}

export default Product
