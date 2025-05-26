import { HubMethodName } from "@/utils/common/Constant"
import {
  Fetched,
  QueryOptions,
  RecordAndCounter,
  useDelete,
  useEffectOnce,
} from "@/utils/hooks"
import { RouteMap } from "@/utils/common"
import { ProductResponse } from "@/utils/interface"
import { useConfirm, useConnection, useWithout } from "@/utils/functions"
import { Fragment } from "react"
import CreateUpdate from "./Create_Update"
import { Helper, Redirect } from "@/utils/common"
import { default as CustomList } from "@/app/(components)/list"
import { RIGHT, convert } from "@/app/(components)/common"
import Icon from "@/app/(components)/icon"
import Context, { ContextElement } from "@/app/(components)/context"
import Row from "@/app/(components)/row"
import Image from "@/app/(components)/image"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import DateTime from "@/app/(components)/date-time"
import Number from "@/app/(components)/number"
import { useRouter } from "@/utils/functions"
import RenderIf from "@/app/(components)/render-if"
import ListRender from "@/app/(components)/list/render"
import Tag from "@/app/(components)/tag"
import State from "@/app/(components)/state"

const List = ({
  getProduct,
}: {
  getProduct: Fetched<RecordAndCounter<ProductResponse>>
}) => {
  const router = useRouter()
  const connection = useConnection()
  const [remove, confirm, without] = [
    useDelete(RouteMap.PRODUCT),
    useConfirm(),
    useWithout(),
  ]

  const onRemove = (items: ProductResponse[]) =>
    confirm(() => remove.request({ data: items.map((item) => item.id) }))

  useEffectOnce(() =>
    connection.effectOn(HubMethodName.UPDATE_PRODUCT, () =>
      getProduct.fetch({ params: new QueryOptions(), silent: true })
    )
  )

  return (
    <Row padding={8}>
      <RenderIf
        reverse={<ListRender column={6} />}
        reference={getProduct.response}
        render={(product) => (
          <CustomList
            page={Helper.Data.withPagination(getProduct, (page, limit) =>
              getProduct.fetch({ params: new QueryOptions({ page, limit }) })
            )}
            column={[
              "Tên sản phẩm",
              "",
              "Gắn thẻ",
              "",
              "Ngày tạo",
              "Đã bán",
              "Trạng thái",
              "Giảm giá",
              "Đơn giá",
            ]}
            action={[
              ([item]) => (
                <Icon
                  onClick={() =>
                    without.append(
                      <CreateUpdate onExit={without.close} product={item} />
                    )
                  }
                  dir="icon/edit.svg"
                />
              ),
              ([item]) => (
                <Context
                  position={RIGHT}
                  items={[
                    new ContextElement("icon/edit.svg", "Edit", () =>
                      without.append(
                        <CreateUpdate onExit={without.close} product={item} />
                      )
                    ),
                    new ContextElement("icon/trash.svg", "Delete", () =>
                      onRemove([item])
                    ),
                  ]}
                ></Context>
              ),
            ]}
            onClick={(item) => router.push(Redirect.PRODUCT + "/" + item.id)}
            items={product.data}
            each={(product) => (
              <Fragment>
                <Row gap={8} className="col-span-2" itemsCenter>
                  <Image
                    className="rounded-full border border-slate-100"
                    width={48}
                    height={48}
                    src={
                      Helper.Data.getAvatarProduct(product.imageProducts).url
                    }
                  ></Image>
                  <Column>
                    <Content>{product.name}</Content>
                    <Description lineClamp={1}>
                      {product.description}
                    </Description>
                  </Column>
                </Row>

                <Row className="col-span-2">
                  <Tag
                    items={product.productTags.map((item) => item.tag)}
                  ></Tag>
                </Row>

                <DateTime dateTime={new Date(product.created)} />

                <Content>{product.invoiceProducts.length} sản phẩm</Content>

                <State
                  background="#2c6bff13"
                  color="#359eff"
                  name="Đang hoạt động"
                ></State>

                <Row>{product.salePercent}</Row>

                <Content>
                  <Number
                    value={product.price}
                    format={(value) => Helper.Currency.vietNamDong(value)}
                  ></Number>
                </Content>
              </Fragment>
            )}
          ></CustomList>
        )}
      ></RenderIf>
    </Row>
  )
}

export default List
