import Row from "@/app/(components)/row"
import Column from "@/app/(components)/column"
import Wrapper from "@/app/(components)/wrapper"
import { SoundNames, useSound } from "@/utils/hooks/Sound"
import {
  BankAccountResponse,
  CustomerResponse,
  DiscountResponse,
  InvoiceResponse,
  PaymentResponse,
  ProductResponse,
  SettingResponse,
  InvoiceStatusResponse,
} from "@/utils/interface"
import {
  useAccount,
  Validate,
  useEffectOnce,
  useForm,
  useFormat,
  useGet,
  usePost,
} from "@/utils/hooks"
import {
  ActivityNames,
  RouteMap,
  Helper,
  PaymentNames,
  Redirect,
} from "@/utils/common"
import { Fragment, useState } from "react"
import RenderIf from "@/app/(components)/render-if"
import { useWithout } from "@/utils/functions"
import Container from "@/app/(components)/container"
import Information from "./components/Information"
import Title from "@/app/(components)/title"
import Description from "@/app/(components)/description"
import Image from "@/app/(components)/image"
import Button from "@/app/(components)/button"
import Content from "@/app/(components)/content"
import Checkbox from "@/app/(components)/checkbox"
import { convert } from "@/app/(components)/common"
import Frame from "@/app/(components)/frame"

export const INVOICE_PREVIEW_ID = "__invoice_preview_popup"
export const WINDOWS_CONFIG = ["PRINT", "width=540,height=640"]

const getDescription = (format: any) =>
  `Hóa đơn ngày ${format.dateTime(new Date())}`

const getDetail = (
  invoiceProducts: InvoiceProduct[],
  discount: DiscountResponse
) => {
  const totalCost = invoiceProducts.reduce(
    (sum, current) =>
      sum +
      Number(current.price) * current.quantity -
      Number(current.price * current.maxSaleAmount),
    0
  )

  const discountPrice =
    Number(discount.amount) + Number(discount.percent) * totalCost

  return [totalCost, discountPrice]
}

export interface CreateInvoice {
  code: string
  description: string
  discountId?: string
  discount?: DiscountResponse
  profileId?: string
  customerId?: string
  customer?: CustomerResponse
  payment: PaymentResponse
  monetaryUnit: string
  status?: InvoiceStatusResponse
  invoiceProducts: InvoiceProduct[]
}

export interface InvoiceProduct extends ProductResponse {
  quantity: number
}

interface Tracking {
  type: string
  jsonData: string
}

const validate: Validate<CreateInvoice> = {
  code: (code: string) => code.length > 0,
  description: (description: string) => description.length > 0,
  payment: (payment: unknown) => payment,
  monetaryUnit: (monetaryUnit: string) => monetaryUnit,
  invoiceProducts: (invoiceProducts: []) => invoiceProducts.length > 0,
}

const Invoice = () => {
  const without = useWithout()
  const [format, account] = [useFormat(), useAccount()]

  const createForm = function () {
    const data = {
      code: Helper.Random.string(20).toUpperCase(),
      profileId: account.profile.id,
      invoiceProducts: [],
      description: "Hóa đơn ngày " + format.dateTime(new Date()),
    }
    return data
  }

  const sound = useSound()
  const setting = useGet<SettingResponse>(RouteMap.SETTING)
  const createInvoice = usePost<InvoiceResponse>(RouteMap.INVOICE)
  const createActivity = usePost(RouteMap.ACTIVITY)
  const form = useForm<CreateInvoice>(createForm(), validate)
  const [tracking, updateTracking] = useState<Array<Tracking>>([])
  const bankAccount = useGet<BankAccountResponse>(
    RouteMap.INVOICE + "/" + RouteMap.BANK_ACCOUNT
  )

  const addTracking = (type: string) =>
    updateTracking((previous) => [
      ...previous,
      { type, jsonData: form.data.code },
    ])

  const createInitialForm = () => ({
    description: getDescription(format),
    code: Helper.Random.string(20).toUpperCase(),
    profileId: account.profile.id,
    invoiceProducts: [],
  })

  const savePrint = () => {
    const status = form.validate.run()
    if (status === 0) return

    create()
  }

  const creditPayment = (invoiceId: string) => {
    const cost = form.data.invoiceProducts.reduce(
      (current, next) =>
        current + (next.price - next.maxSaleAmount * next.price),
      0
    )

    const discount = form.data.discount
      ? form.data.discount.amount + form.data.discount.percent * cost
      : 0

    // without.append(
    //   <Credit
    //     onFinish={() => print(invoiceId)}
    //     amount={cost - discount}
    //     onExit={without.close}
    //     code={form.data.code}
    //   />
    // )
  }

  const create = () =>
    createInvoice
      .request({
        ...form.data,
        customerId: form.data.customer ? form.data.customer.id : undefined,
        discountId: form.data.discount ? form.data.discount.id : undefined,
      })
      .then((response) => {
        form.set(createInitialForm())
        form.validate.reset()
        setting.fetch({})
        sound(SoundNames.Success)
        ///
        const isCredit = form.data.payment.type === PaymentNames.CREDIT
        /// Wait transaction banking
        if (isCredit) creditPayment(response.id)
        else print(response.id)

        createActivity.request({ activities: tracking })
      })

  const print = (invoiceId: string) => {
    const print = window.open(
      process.env.NEXT_PUBLIC_HOST +
        Redirect.INVOICE +
        Redirect.PRINT +
        "/" +
        invoiceId,
      WINDOWS_CONFIG[0],
      WINDOWS_CONFIG[1]
    )
    const element = document.getElementById(INVOICE_PREVIEW_ID)
    if (!print || !element) return

    print.document.write(element.innerHTML)
    print.document.close()
    print.print()
  }

  const isLoad = convert(!bankAccount.response)
  useEffectOnce(() => addTracking(ActivityNames.INVOICE_CREATE))
  return (
    <Frame>
      <Row justifyBetween>
        <Container></Container>
        <Row justifyEnd gap={16}>
          <Button icon="icon/view.svg">Xem trước</Button>
          <Button icon="icon/create-light.svg" main onClick={savePrint}>
            Tạo hoá đơn
          </Button>
        </Row>
      </Row>
      <Row gap={24}>
        <Column size={8} gap={24}>
          <Information
            addTracking={addTracking}
            getSetting={setting}
            form={form}
          />
        </Column>
        <Column size={4} gap={24}>
          <Wrapper>
            <Column>
              <Title>Khách hàng</Title>
              <Description>Hội viên của hàng</Description>
            </Column>
            <RenderIf
              reference={form.data.customer}
              render={(customer) => (
                <Fragment>
                  <Row itemsCenter gap={8}>
                    <Image
                      className="rounded-full"
                      src={customer.image}
                      width={48}
                      height={48}
                    ></Image>
                    <Column>
                      <Title>{customer.name}</Title>
                      <Description>{customer.fullName}</Description>
                    </Column>
                  </Row>
                  <Row
                    itemsCenter
                    gap={8}
                    className="border-t py-[8px] border-gray-50"
                  >
                    <Column>
                      <Title>{customer.address}</Title>
                      <Description>{customer.phone}</Description>
                    </Column>
                  </Row>
                </Fragment>
              )}
            ></RenderIf>
          </Wrapper>
          <Wrapper isLoad={isLoad}>
            <Column>
              <Title>Phương thức thanh toán</Title>
              <Description>Tối ưu giao dich</Description>
            </Column>
            <RenderIf
              reference={bankAccount.response}
              render={(bankAccount) => (
                <Fragment>
                  <Column
                    className="bg-gradient-to-r from-[#74EBD5] to-[#9FACE6] rounded-[8px] p-[16px] text-white"
                    gap={8}
                  >
                    <Row justifyBetween>
                      <Image
                        width={24}
                        height={24}
                        dir="icon/invoice-mastercard.svg"
                      ></Image>
                      <Title className="uppercase">{bankAccount.bankId}</Title>
                    </Row>
                    <Row>
                      <Content className="text-[20px] font-bold">
                        $6.293,00
                      </Content>
                    </Row>
                    <Row justifyBetween>
                      <Column>
                        <Content>Mã thẻ</Content>
                        <Content>**** **** **** 2385</Content>
                      </Column>
                      <Column itemsEnd>
                        <Content>Ngày hết hạn</Content>
                        <Content>20/25</Content>
                      </Column>
                    </Row>
                    <Row gap={4}>
                      <Title>{bankAccount.accountNane}</Title>
                    </Row>
                  </Column>
                </Fragment>
              )}
            ></RenderIf>
          </Wrapper>
          <RenderIf
            reference={form.data.discount}
            render={(discount) => {
              const [totalCost, discountPrice] = getDetail(
                form.data.invoiceProducts,
                discount
              )

              return (
                <Wrapper>
                  <Column gap={8}>
                    <Column>
                      <Title>Giá trị hoá đơn</Title>
                      <Description>
                        Tổng tiền hoá đơn (bao gồm thuế, mã giảm giá, VAT)
                      </Description>
                    </Column>

                    <Row gap={4}>
                      <Title>Giảm giá:</Title>
                      <div>{Helper.Currency.vietNamDong(discountPrice)}</div>
                    </Row>

                    <Column>
                      <RenderIf
                        reference={form.data.invoiceProducts.length > 0}
                        render={() => (
                          <Row gap={4} itemsCenter>
                            <Description>Tổng đơn:</Description>
                            <Title className="text-[14px] text-orange-400">
                              {Helper.Currency.vietNamDong(totalCost)}
                            </Title>
                          </Row>
                        )}
                      ></RenderIf>

                      <RenderIf
                        reference={form.data.invoiceProducts.length > 0}
                        render={() => (
                          <Row itemsCenter gap={4}>
                            <Description>Thành tiền:</Description>
                            <Title className="text-[18px] text-green-600">
                              {Helper.Currency.vietNamDong(
                                totalCost - discountPrice
                              )}
                            </Title>
                          </Row>
                        )}
                      ></RenderIf>
                    </Column>

                    <Row className="border-t pt-[12px] border-gray-100">
                      <Row justifyBetween>
                        <Row itemsCenter gap={8}>
                          <Image
                            width={24}
                            height={24}
                            dir="icon/invoice-email.svg"
                          ></Image>
                          <Content>Gửi PDF đến khách hàng</Content>
                        </Row>
                        <Checkbox></Checkbox>
                      </Row>
                    </Row>
                  </Column>
                </Wrapper>
              )
            }}
          ></RenderIf>
        </Column>
      </Row>
    </Frame>
  )
}

export default Invoice
