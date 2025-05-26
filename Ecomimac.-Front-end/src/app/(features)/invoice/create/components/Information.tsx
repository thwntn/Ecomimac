import {
  SoundNames,
  useConfirm,
  useConnection,
  useSound,
  useWithout,
} from "@/utils/functions"
import { Fragment, useCallback } from "react"
import {
  HubMethodName,
  RouteMap,
  ActivityNames,
  Helper,
  Message,
  DiscountType,
} from "@/utils/common"
import Column from "@/app/(components)/column"
import Row from "@/app/(components)/row"
import Wrapper from "@/app/(components)/wrapper"
import Title from "@/app/(components)/title"
import Input from "@/app/(components)/input"
import { ON, convert } from "@/app/(components)/common"
import Calendar from "@/app/(components)/calendar"
import Text from "@/app/(components)/text"
import Icon from "@/app/(components)/icon"
import Dropdown from "@/app/(components)/dropdown"
import Image from "@/app/(components)/image"
import Content from "@/app/(components)/content"
import Loading from "@/app/(components)/loading"
import RenderIf from "@/app/(components)/render-if"
import Description from "@/app/(components)/description"
import {
  CustomerResponse,
  DiscountResponse,
  PaymentResponse,
  ProductResponse,
  SettingResponse,
  InvoiceStatusResponse,
} from "@/utils/interface"
import {
  Fetched,
  Form,
  RecordAndCounter,
  useEffectOnce,
  useGet,
} from "@/utils/hooks"
import { useSearchParams } from "next/navigation"
import { CreateInvoice } from "../Create"
import Button from "@/app/(components)/button"
import Create from "../../../client/customer/components/Create_Update"

export const INIT_WITH_PRODUCT = "initWithProduct"

enum FormKeys {
  Products = "invoiceProducts",
  ProfileId = "profileId",
  Code = "code",
}

export enum MonetaryEnum {
  USD = "USD",
  VND = "VND",
}

export interface Monetary {
  name: string
  code: string
}

interface Scanner {
  code: string
  productId: string
  profileId: string
}

export interface InvoiceProduct extends ProductResponse {
  quantity: number
}

const Information = ({
  form,
  getSetting,
  addTracking,
}: {
  addTracking: (type: string) => void
  form: Form<CreateInvoice>
  getSetting: Fetched<SettingResponse>
}) => {
  const without = useWithout()
  const search = useSearchParams()
  const [connection, confirm, sound] = [
    useConnection(),
    useConfirm(),
    useSound(),
  ]
  const customer = useGet<RecordAndCounter<CustomerResponse>>(RouteMap.CUSTOMER)
  const infoCustomer = useGet<CustomerResponse>(RouteMap.CUSTOMER)
  const infoProduct = useGet<ProductResponse>(RouteMap.PRODUCT, {
    initial: false,
  })
  const statusInvoice = useGet<Array<InvoiceStatusResponse>>(
    RouteMap.INVOICE_STATUS
  )
  const infoDiscount = useGet<DiscountResponse>(RouteMap.DISCOUNT)
  const infoPayment = useGet<PaymentResponse>(RouteMap.PAYMENTS)
  const payment = useGet<Array<PaymentResponse>>(RouteMap.PAYMENTS)
  const product = useGet<RecordAndCounter<ProductResponse>>(RouteMap.PRODUCT)
  const itemProduct = useGet<ProductResponse>(RouteMap.PRODUCT)
  const discount = useGet<DiscountResponse[]>(
    RouteMap.INVOICE + "/" + RouteMap.DISCOUNT,
    { params: { discountType: DiscountType.INVOICE } }
  )
  const monetarism = Object.keys(MonetaryEnum).map((key) => ({
    name: Object(MonetaryEnum)[key],
    code: key,
  }))

  const initWithProduct = () => {
    const productId = search.get(INIT_WITH_PRODUCT)
    if (!productId) return
    infoProduct
      .fetch({ pathname: productId })
      .then((response) => add([response]))
  }

  const add = useCallback(
    (products: ProductResponse[]) => {
      addTracking(ActivityNames.INVOICE_ADD_PRODUCT)

      const duplicate = products.filter(
        (product) =>
          form.data.invoiceProducts.find((item) => item.id === product.id) ===
          undefined
      )

      products.forEach((product) => (product.quantity = 1))
      form.data.invoiceProducts = form.data.invoiceProducts.concat(duplicate)
      form.append(FormKeys.Products, [...form.data.invoiceProducts])
    },
    [form.data]
  )

  const remove = function (product: ProductResponse) {
    addTracking(ActivityNames.INVOICE_CHANGE_QUANTITY_PRODUCT)

    confirm(
      () => {
        addTracking(ActivityNames.INVOICE_REMOVE_PRODUCT)
        //
        form.append(
          FormKeys.Products,
          form.data.invoiceProducts.filter((item) => item.id !== product.id)
        )
      },
      {
        title: Message.INVOICE_REMOVE_PRODUCT,
        description: "",
      }
    )
  }

  const update = function (product: ProductResponse, quantity: number) {
    addTracking(ActivityNames.INVOICE_CHANGE_QUANTITY_PRODUCT)

    const find = form.data.invoiceProducts.find(
      (item) => item.id === product.id
    )
    if (find === undefined) return

    find.quantity = quantity
    form.append(FormKeys.Products, [...form.data.invoiceProducts])
  }

  const scanner = useCallback((productId: string) => {
    addTracking(ActivityNames.INVOICE_SCAN_PRODUCT)

    itemProduct.fetch({ pathname: productId }).then((product) => {
      if (product === undefined) return

      sound(SoundNames.Success)
      add([product])
    })
  }, [])

  const loadDefault = useCallback(() => {
    const setting = getSetting.response
    if (!setting) return

    if (setting.DEFAULT_CUSTOMER)
      infoCustomer
        .fetch({ pathname: setting.DEFAULT_CUSTOMER })
        .then((data) => form.append("customer", data))

    if (setting.DEFAULT_DISCOUNT)
      infoDiscount
        .fetch({ pathname: setting.DEFAULT_DISCOUNT })
        .then((data) => form.append("discount", data))

    if (setting.DEFAULT_PAYMENT)
      infoPayment
        .fetch({ pathname: setting.DEFAULT_PAYMENT })
        .then((data) => form.append("payment", data))
  }, [getSetting.response, form])

  useEffectOnce(() => {
    initWithProduct()
    loadDefault()

    return connection.effectOn(
      HubMethodName.SCANNER_PRODUCT,
      (data: Scanner) => data.code === form.data.code && scanner(data.productId)
    )
  })

  const isLoad = convert(
    !statusInvoice.response ||
      !customer.response ||
      !discount.response ||
      !payment.response
  )

  return (
    <Row>
      <Column gap={24}>
        <Row>
          <Wrapper isLoad={isLoad}>
            <Row>
              <Row itemsCenter gap={8}>
                <Image dir="icon/main.logo.svg" width={48} height={48}></Image>
                <Column>
                  <Title>Titan.co</Title>
                  <Description>support.titanco@gmail.com</Description>
                </Column>
              </Row>
              <Column size={1} className=" whitespace-nowrap">
                <Description>Ijen Bounce Stree 101</Description>
                <Description>Madang City, 5034</Description>
                <Description>7 District, Ho Chi Minh</Description>
              </Column>
            </Row>
            <Row gap={12}>
              <Input silent label="Mã hoá đơn" {...form.create("code")}></Input>
              <Calendar label="Ngày giao dịch"></Calendar>
            </Row>

            <RenderIf
              reference={statusInvoice.response}
              render={(statusInvoice) => (
                <Row>
                  <Dropdown
                    label="Trạng thái"
                    onChange={(item) => form.append("status", item)}
                    items={statusInvoice}
                    each={(item) => (
                      <Column>
                        <Content>{item.title}</Content>
                        <Description>
                          {Helper.Format.capitalize(item.description)}
                        </Description>
                      </Column>
                    )}
                    show={(item) => item.title}
                  ></Dropdown>
                </Row>
              )}
            ></RenderIf>

            <Row>
              <Text
                label="Ghi chú"
                placeholder="Mô tả, ghi chú, thông tin giao dịch, ..."
                {...form.create("description")}
              ></Text>
            </Row>
          </Wrapper>
        </Row>
        <Wrapper isLoad={isLoad}>
          <Fragment>
            <Row itemsCenter className="justify-between">
              <Column>
                <Title>Khách hàng & thanh toán</Title>
                <Description>Khách hàng & thanh toán</Description>
              </Column>
              <Icon
                dir="icon/invoice-setting.svg"
                // onClick={() =>
                //   without.append(<Setting onExit={without.close}></Setting>)
                // }
              ></Icon>
            </Row>
            <Row gap={16} itemsCenter>
              <RenderIf
                reference={customer.response}
                render={(customer) => (
                  <Dropdown
                    {...form.create("customer")}
                    label="Khách hàng"
                    items={customer.data}
                    reference={form.data.customer}
                    show={(item) => item.name}
                    each={(item) => (
                      <Fragment>
                        <Row itemsCenter gap={12}>
                          <Image
                            src="https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg"
                            width={36}
                            height={36}
                            className="rounded-full"
                          ></Image>
                          <Column>
                            <Row className="justify-between">
                              <Content>{item.name}</Content>
                              <Content className="text-[10px] text-gray-500">
                                {Helper.Time.format(item.birthday)}
                              </Content>
                            </Row>
                            <Content className="text-[10px] text-gray-500">
                              {item.phone}
                            </Content>
                          </Column>
                        </Row>
                      </Fragment>
                    )}
                    onChange={(item) => {
                      form.append("customer", item)
                      form.append("customerId", item.id)
                    }}
                  ></Dropdown>
                )}
              ></RenderIf>
              <Button
                icon="icon/invoice-customer.svg"
                onClick={() =>
                  without.append(<Create onExit={without.close}></Create>)
                }
              >
                Thêm khách hàng
              </Button>
            </Row>
            <Row gap={16}>
              <RenderIf
                reference={payment.response}
                render={(payment) => (
                  <Dropdown
                    {...form.create("payment")}
                    show={(item) => item.name}
                    reference={form.data.payment}
                    error={Message.CAN_NOT_EMPTY}
                    label="Phương thức thanh toán"
                    items={payment}
                    each={(item) => item.name}
                    onChange={(item) => form.append("payment", item)}
                  ></Dropdown>
                )}
              ></RenderIf>
              <Dropdown
                label="Đơn vị"
                {...form.create("monetaryUnit")}
                error={Message.CAN_NOT_EMPTY}
                show={(item) => item.name}
                items={monetarism}
                each={(item) => item.name}
                onChange={(item) => form.append("monetaryUnit", item.code)}
              ></Dropdown>
            </Row>
            <RenderIf
              reference={discount.response}
              render={(discount) => (
                <Dropdown
                  label="Giảm giá"
                  {...form.create("discount")}
                  show={(item) => item.name}
                  reference={form.data.discount}
                  items={discount}
                  each={(item) => (
                    <Row>
                      <Column size={10}>
                        <Title>{item.name}</Title>
                        <Description>{item.description}</Description>
                      </Column>
                      <Column itemsEnd>
                        <Content>
                          {Helper.Currency.vietNamDong(item.amount)} -{" "}
                          {item.percent}%
                        </Content>
                        <Description>Giảm tối đa 35.000 đ</Description>
                      </Column>
                    </Row>
                  )}
                  onChange={(item) => form.append("discount", item)}
                ></Dropdown>
              )}
            ></RenderIf>
          </Fragment>
        </Wrapper>
        {/* <Selected
          isLoad={isLoad}
          form={form}
          add={add}
          remove={remove}
          update={update}
        /> */}
      </Column>
    </Row>
  )
}

export default Information
