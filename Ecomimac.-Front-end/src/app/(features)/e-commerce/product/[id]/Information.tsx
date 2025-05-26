import { useForm, useGet } from "@/utils/hooks"
import { convert } from "@/app/(components)/common"
import Container from "@/app/(components)/container"
import Frame from "@/app/(components)/frame"
import RenderIf from "@/app/(components)/render-if"
import { RouteMap, Redirect } from "@/utils/common"
import { useParams } from "next/navigation"
import { ProductResponse } from "@/utils/interface"
import Row from "@/app/(components)/row"
import Image from "@/app/(components)/image"
import Column from "@/app/(components)/column"
import Title from "@/app/(components)/title"
import Description from "@/app/(components)/description"
import Button from "@/app/(components)/button"
import { useEffect } from "react"
import { useRouter, useWithout } from "@/utils/functions"
import { INIT_WITH_PRODUCT } from "@/app/(features)/invoice/create/components/Information"
import Color from "./components/Color"
import Wrapper from "@/app/(components)/wrapper"
import Input from "@/app/(components)/input"
import Dropdown from "@/app/(components)/dropdown"
import Line from "@/app/(components)/line"
import Details from "./components/Details"
import Content from "@/app/(components)/content"
import Icon from "@/app/(components)/icon"
import Pagination from "@/app/(components)/pagination"

interface IParams {
  [key: string]: string
  id: string
}

export class FormData {
  name: string
  description: string
}

const Information = () => {
  const params = useParams<IParams>()
  const product = useGet<ProductResponse>(RouteMap.PRODUCT + "/" + params.id)
  const router = useRouter()
  const form = useForm<FormData>()

  const createInvoiceWithProduct = (product: ProductResponse) =>
    router.push(
      Redirect.INVOICE +
        Redirect.CREATE +
        "?" +
        INIT_WITH_PRODUCT +
        "=" +
        product.id
    )

  useEffect(
    () => void (product.response && form.set(product.response)),
    [product.response]
  )
  return (
    <Frame>
      <Row itemsCenter justifyBetween>
        <Container></Container>
        <Row gap={8} size={0.1}>
          <RenderIf
            reference={product.response}
            render={(product) => (
              <Button
                icon="icon/create.svg"
                onClick={() => createInvoiceWithProduct(product)}
              >
                Tạo hoá đơn với sản phẩm
              </Button>
            )}
          ></RenderIf>
          <Button main icon="icon/tick.svg">
            Lưu thay đổi
          </Button>
        </Row>
      </Row>
      <Row gap={24}>
        <Column size={8} gap={24}>
          <Details form={form} product={product}></Details>
          <Wrapper>
            <Title icon="icon/info.svg">Phương tiện</Title>
            <Column>
              <Title>Hình ảnh</Title>
              <Description>
                Hình minh họa bức ảnh và hình ảnh sẵn có hiện có hoặc bắt đầu
                tìm kiếm mới để khám phá
              </Description>
            </Column>
            <RenderIf
              reference={product.response}
              render={(product) => (
                <Row gap={8}>
                  {product.imageProducts.map((imageProduct) => (
                    <Image
                      className="rounded-[8px]"
                      src={imageProduct.url}
                      width={156}
                      height={156}
                    ></Image>
                  ))}
                  <div className="w-[156px] aspect-square flex justify-center items-center bg-gray-100 text-[20px] rounded-[8px] cursor-pointer">
                    +
                  </div>
                </Row>
              )}
            ></RenderIf>
          </Wrapper>

          <Line name="Lưu kho"></Line>
          <Wrapper>
            <Column>
              <Title>Cung ứng</Title>
              <Description>Số lượng sản phẩm còn lại trong kho</Description>
            </Column>
            <Row gap={8}>
              <Input label="Lô hàng" value="NHAP_TET_2025"></Input>
              <Input
                label="Ngày nhập"
                value={new Date().toLocaleString()}
              ></Input>
              <Input label="Số lượng còn lại" value={7496}></Input>
            </Row>
          </Wrapper>

          <Line name="Đánh giá & bình luận"></Line>
          <Wrapper>
            <Column>
              <Title>Đánh giá</Title>
              <Description>Phản hồi của khách hành & đánh giá</Description>
            </Column>
            <Row gap={16}>
              <Column
                itemsCenter
                justifyCenter
                gap={8}
                size={0.1}
                className="min-w-[120px]"
              >
                <Image
                  dir="icon/rating-star.svg"
                  width={64}
                  height={64}
                ></Image>
                4.7 trên tổng 5
              </Column>
              <Column>
                {Array.from({
                  length: 5,
                }).map((item, index) => (
                  <Row itemsCenter gap={8} key={index}>
                    <Row>
                      <Content className="text-nowrap w-[16px] text-center">
                        {5 - index}
                      </Content>
                      <Content>★</Content>
                    </Row>
                    <div className="w-full relative h-[4px] bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-yellow-400"
                        style={{ width: Math.ceil(Math.random() * 100) + "%" }}
                      ></div>
                    </div>
                    <Description className="text-nowrap w-[120px]">
                      {Math.ceil(Math.random() * 1000)} đánh giá
                    </Description>
                  </Row>
                ))}
              </Column>
            </Row>
          </Wrapper>

          <Wrapper>
            <Column>
              <Title>Bình luận</Title>
              <Description>Phản hồi của khách hành & đánh giá</Description>
            </Column>
            <Column gap={16}>
              {Array.from({ length: 5 }).map((item, index) => (
                <Row gap={12}>
                  <Image
                    src="https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-6/479999925_1196104401937163_6715623908309723525_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=H3GaVN1x-dkQ7kNvgFJGwyi&_nc_oc=Adhac3F5Ushu4osiLw2sorHnS2f2A9YhWojsNl3XYCHhverH8BMoWPk9XnT_AuDLnnhr1LcRFEtpXk2Ya4SB-mcR&_nc_zt=23&_nc_ht=scontent.fsgn2-10.fna&_nc_gid=ANX7c6zRPXHCsDclARTnXhQ&oh=00_AYAP4T6ZmGgNu9rMIYxz46dAWz8FH7JPAwOBqBmckxht5g&oe=67BD0863"
                    width={48}
                    height={48}
                    className="rounded-full"
                  ></Image>
                  <Column>
                    <Column className="min-h-[48px]" justifyCenter>
                      <Title>Thiên Tân</Title>
                      <Description>{new Date().toLocaleString()}</Description>
                    </Column>
                    <Column gap={8}>
                      <Content>
                        Happy share a snapshot of the Comment Section we have
                        worked on for an education platform.
                      </Content>
                      <Row itemsStart>
                        <Row itemsCenter size={0.1}>
                          <Icon
                            size={32}
                            dir="icon/product-comment-like.svg"
                          ></Icon>
                          <Content>1862</Content>
                        </Row>
                        <Row itemsCenter size={0.1}>
                          <Icon
                            size={32}
                            dir="icon/product-comment-like.svg"
                            className="rotate-180"
                          ></Icon>
                          <Content>6</Content>
                        </Row>
                      </Row>
                    </Column>
                  </Column>
                </Row>
              ))}
            </Column>
            <Row justifyCenter>
              <Pagination></Pagination>
            </Row>
          </Wrapper>
        </Column>
        <Column size={4} gap={24}>
          <Wrapper>
            <Title>Thuộc tính & phân loại</Title>
            <Column gap={16}>
              <Column>
                <Title>Trạng thái sản phầm</Title>
                <Description>
                  Hình minh họa bức ảnh và hình ảnh sẵn có hiện có hoặc bắt đầu
                  tìm kiếm mới để khám phá
                </Description>
              </Column>
              <Dropdown
                label="Trạng thái sản phẩm"
                items={[
                  {
                    label: "Kích hoạt",
                  },
                ]}
                each={(item) => item.label}
                show={(item) => item.label}
              ></Dropdown>
            </Column>
            <Column gap={16}>
              <Column>
                <Title>Thuộc tính</Title>
                <Description>
                  Hình minh họa bức ảnh và hình ảnh sẵn có hiện
                </Description>
              </Column>
              <Dropdown
                label="Danh mục sản phẩm"
                items={[
                  {
                    label: "Phần mềm & ứng dụng",
                  },
                ]}
                each={(item) => item.label}
                show={(item) => item.label}
              ></Dropdown>

              <Dropdown
                label="Loại sản phầm"
                items={[
                  {
                    label: "Người dùng cuối",
                  },
                ]}
                each={(item) => item.label}
                show={(item) => item.label}
              ></Dropdown>

              <Color></Color>
            </Column>
          </Wrapper>
          <Wrapper>
            <Title>Giá sản phầm</Title>
            <Input label="Giá sản phẩm" value={"540.000đ"}></Input>
            <Row gap={16}>
              <Input label="Discount" value={"10%"}></Input>
              <Dropdown
                label="Chọn mã giảm giá"
                items={[
                  {
                    label: "Chương trình tháng 4",
                  },
                ]}
                each={(item) => item.label}
                show={(item) => item.label}
              ></Dropdown>
            </Row>
          </Wrapper>
        </Column>
      </Row>

      {/* <Column gap={32}>
        <Row gap={24}>
          <Row>
            <RenderIf
              reference={product.response}
              render={(product) => (
                <Column gap={24}>
                  <Carousel
                    items={product.imageProducts}
                    each={(item) => (
                      <Image
                        src={item.url}
                        width="100%"
                        height="256px"
                        className="aspect-[2/1.5]"
                      ></Image>
                    )}
                  ></Carousel>
                  <Row justifyBetween>
                    <Profile
                      avatar={product.profile.avatar}
                      name={product.profile.name}
                      email={product.profile.email}
                    ></Profile>
                    <Reference content="Trang sản phẩm"></Reference>
                  </Row>
                  <Column gap={4}>
                    <Title className="text-[18px]">{product.name}</Title>
                    <Description>{product.description}</Description>
                  </Column>
                  <Row gap={8}>
                    <Button
                      icon="icon/create-light.svg"
                      main
                      onClick={() => createInvoiceWithProduct(product)}
                    >
                      Create với hoá đơn
                    </Button>
                    <Button
                      onClick={() =>
                        without.append(
                          <CreateUpdate
                            onExit={without.close}
                            product={product}
                          ></CreateUpdate>
                        )
                      }
                    >
                      Edit
                    </Button>
                  </Row>
                </Column>
              )}
            ></RenderIf>
          </Row>
          <Column gap={16}>
            <Wrapper>
              <Title>Mã định danh sản phẩm</Title>
              <RenderIf
                reference={product.response}
                render={(product) => (
                  <Fragment>
                    <Barcode
                      value={product.code}
                      fontSize={14}
                      textMargin={8}
                      background="#00000000"
                    ></Barcode>
                    <Title>Price</Title>
                    <Title className="text-[16px] font-bold">
                      {Helper.Currency.vietNamDong(product.price)}
                    </Title>
                  </Fragment>
                )}
              ></RenderIf>
            </Wrapper>
            <Wrapper>
              <Size></Size>
              <Color></Color>
            </Wrapper>
          </Column>
        </Row>
        <Row>
          <RenderIf
            reference={product.response}
            render={(product) => (
              <Editor staticMode={ON} value={product.htmlDetail}></Editor>
            )}
          ></RenderIf>
        </Row>
      </Column> */}
    </Frame>
  )
}

export default Information
