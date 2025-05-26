import Button from "@/app/(components)/button"
import AreaChart, { Data } from "@/app/(components)/chart/area"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Frame from "@/app/(components)/frame"
import Image from "@/app/(components)/image"
import Row from "@/app/(components)/row"
import Switch from "@/app/(components)/group"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import PolaChart from "@/app/(components)/chart/pola"
import Description from "@/app/(components)/description"
import { useAccount, useGet } from "@/utils/hooks"
import { RouteMap, FORMAT_TIME_DATE, Helper } from "@/utils/common"
import Carousel from "@/app/(components)/carousel"
import { Fragment } from "react"
import { InvoiceResponse, InvoiceStatusResponse } from "@/utils/interface"
import List from "@/app/(components)/list"
import RenderIf from "@/app/(components)/render-if"
import State from "@/app/(components)/state"
import Counter from "./components/Counter"
import Line from "@/app/(components)/line"
import { convert } from "@/app/(components)/common"

export const data: Data[] = [
  {
    name: "Tháng này",
    color: "#e6e6e6",
    data: [
      {
        x: "Mua bán",
        y: 100,
      },
      {
        x: "Thu nhập",
        y: 30,
      },
      {
        x: "Công việc tự do",
        y: 40,
      },
      {
        x: "Whitespace",
        y: 70,
      },
      {
        x: "Du lịch",
        y: 76,
      },
      {
        x: "Hoàn tiền",
        y: 35,
      },
      {
        x: "Server",
        y: 14,
      },
      {
        x: "Đầu tư",
        y: 84,
      },
    ],
  },
  {
    name: "Tháng trước",
    color: "#635beb",
    data: [
      {
        x: "Mua bán",
        y: 34,
      },
      {
        x: "Thu nhập",
        y: 100,
      },
      {
        x: "Công việc tự do",
        y: 76,
      },
      {
        x: "Whitespace",
        y: 12,
      },
      {
        x: "Du lịch",
        y: 44,
      },
      {
        x: "Hoàn tiền",
        y: 84,
      },
      {
        x: "Server",
        y: 3,
      },
      {
        x: "Đầu tư",
        y: 17,
      },
    ],
  },
]

const carousel = [
  {
    url: "https://cdn.dribbble.com/users/1723105/screenshots/16203931/media/48cc8ff33541b4f4aaa4485e017d5eab.png?resize=768x576&vertical=center",
  },
  {
    url: "https://massets.appsflyer.com/wp-content/uploads/2021/03/Smart-Banners-leverage-onelink-deep-linking-technology.jpg",
  },
]

const Home = () => {
  const account = useAccount()
  const status = useGet<InvoiceStatusResponse[]>(RouteMap.INVOICE_STATUS)
  const recent = useGet<InvoiceResponse[]>(
    RouteMap.INVOICE + "/" + RouteMap.RECENT
  )
  return (
    <Frame>
      <Row gap={24}>
        <Row size={8}>
          <Wrapper className="h-[284px] bg-gradient-to-br ">
            <Row padding={16}>
              <Column gap={32} size={12}>
                <Column gap={8}>
                  <Title size={24}>
                    Mừng bạn trở lại 🎉 <br /> {account.profile.name}
                  </Title>
                  <Content>
                    Chiến dịch quản bá sản phẩm <br /> tính năng mới vừa được
                    phát hành nâng cao hiệu suất 34.6%.
                  </Content>
                </Column>
                <Button className="w-fit" main>
                  Trải nghiệm ngay
                </Button>
              </Column>
              <Column size={0.1} className="px-[24px]">
                <Row justifyBetween>
                  <Image dir="image/new.png" width={226} height={204}></Image>
                </Row>
              </Column>
            </Row>
          </Wrapper>
        </Row>
        <Row size={4}>
          <Carousel
            items={carousel}
            each={(item) => (
              <div className="w-full relative">
                <Image
                  src={item.url}
                  className="flex-1"
                  width={"100%"}
                  height={284}
                ></Image>
              </div>
            )}
          ></Carousel>
        </Row>
      </Row>
      <Line name="Hoá đơn điện tử"></Line>
      <Row gap={24}>
        <Row size={4}>
          <Wrapper className="h-[426px]">
            <Column>
              <Title>Thông kê hoá đơn theo trạng thái</Title>
              <Description>30 ngày gần nhất</Description>
            </Column>
            <PolaChart></PolaChart>
          </Wrapper>
        </Row>
        <Row size={8}>
          <Wrapper isLoad={convert(!recent.response)}>
            <Column>
              <Title>Hoá đơn gần đây</Title>
              <Description>5 Hoá đơn thành lập gần nhất</Description>
            </Column>
            <RenderIf
              reference={status.response}
              render={(status) => (
                <RenderIf
                  reference={recent.response}
                  render={(invoices) => (
                    <List
                      silent
                      column={[
                        "Mã hoá đơn",
                        "Số tiền",
                        "Trạng thái",
                        "Ngày tạo",
                      ]}
                      items={invoices}
                      each={(invoice) => {
                        const configure = status.find(
                          (item) => item.key === invoice.status
                        )
                        if (configure === undefined)
                          return <Fragment></Fragment>
                        return (
                          <Fragment>
                            <Content>{invoice.code}</Content>
                            <Content>
                              {Helper.Currency.vietNamDong(invoice.latestPrice)}
                            </Content>
                            <State
                              name={configure.title}
                              background={configure.backgroundColor}
                              color={configure.color}
                            ></State>
                            <Content>
                              {Helper.Time.format(
                                invoice.created,
                                FORMAT_TIME_DATE
                              )}
                            </Content>
                          </Fragment>
                        )
                      }}
                    ></List>
                  )}
                ></RenderIf>
              )}
            ></RenderIf>
          </Wrapper>
        </Row>
      </Row>
      <Counter></Counter>
      <Line name="Giao dịch"></Line>
      <Row gap={20}>
        <Column size={8}>
          <Wrapper>
            <Column>
              <Title>Giao dịch gần đây</Title>
            </Column>
            <Column size={6}>
              <Row gap={24}>
                <Switch
                  items={[
                    { label: "30 ngày trước", value: 1 },
                    { label: "7 ngày trước", value: 1 },
                  ]}
                ></Switch>
                <Button>Chi tiết</Button>
              </Row>
            </Column>
            <div className="pointer-events-none">
              <AreaChart series={data}></AreaChart>
            </div>
          </Wrapper>
        </Column>
        <Column size={4}>
          <Wrapper>
            <Row>
              <Column>
                <Title>Available Balance</Title>
                <Content>Active Balance</Content>
              </Column>
              <Column size={6}>
                <Button>Windows</Button>
              </Column>
            </Row>
            <Row>
              <Column>
                <Title className="text-[24px]">$ 90,200.10</Title>
                <Content>Debit Card - Visa</Content>
              </Column>
              <Column>
                <AreaChart height={100} series={data}></AreaChart>
              </Column>
            </Row>
          </Wrapper>
        </Column>
      </Row>
    </Frame>
  )
}

export default Home
