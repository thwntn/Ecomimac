import {
  CashDescriptionResponse,
  ExpenseTransactionResponse,
} from "@/utils/interface"
import { Fetched, useFormat, useGet } from "@/utils/hooks"
const SERIES_THIS_MONTH = "This month"
const SERIES_LAST_MONTH = "Last month"
import { Fragment } from "react"
import AreaChart from "@/app/(components)/chart/area"
import PolaChart from "@/app/(components)/chart/pola"
import { Helper } from "@/utils/common"
import Frame from "@/app/(components)/frame"
import Container from "@/app/(components)/container"
import Wrapper from "@/app/(components)/wrapper"
import Content from "@/app/(components)/content"
import Title from "@/app/(components)/title"
import List from "@/app/(components)/list"
import { ON } from "@/app/(components)/common"
import Image from "@/app/(components)/image"
import RenderIf from "@/app/(components)/render-if"
import Column from "@/app/(components)/column"
import Description from "@/app/(components)/description"

export const images = [
  "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?cs=srgb&dl=pexels-olly-874158.jpg&fm=jpg",
  "https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg",
  "https://www.theladders.com/wp-content/uploads/man_outside_091318.jpg",
  "https://i.guim.co.uk/img/media/808b031d10688602deb60849458557ee2a714992/1141_94_4025_2415/master/4025.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=26fb24ef5ee6c8a55083613588f3bc16",
]

export class Expenditure {
  constructor(
    public dashboard: Fetched<DashboardResponse>,
    public chart: () => any
  ) {}
}

export interface Counter {
  totalItem: number
  totalCost: number
  thisMonth: number
}

export interface Value {
  name: string
  dateTime: string
  quantity: number
}

export interface ExpenditureResponse<T> {
  counter: Counter
  chart: IChart
  recent: T[]
}

export interface IChart {
  thisMonth: Value[]
  lastMonth: Value[]
}

export class DashboardResponse {
  cash: ExpenditureResponse<CashDescriptionResponse>
  expenseTransaction: ExpenditureResponse<ExpenseTransactionResponse>
}

export interface IChartMap {
  name: string
  data: number[]
}

export enum Path {
  Dashboard = "Dashboard",
  Expenditure = "Expenditure",
}

const Dashboard = () => {
  const format = useFormat()
  const expenditure = useGet<DashboardResponse>(
    Path.Dashboard + "/" + Path.Expenditure
  )

  const chart = (): any => {
    if (!expenditure.response) return []

    const thisMonth =
      expenditure.response.expenseTransaction.chart.thisMonth.map((item) => ({
        x: format.date(item.name),
        y: Number(item.quantity),
      }))
    const lastMonth =
      expenditure.response.expenseTransaction.chart.lastMonth.map((item) => ({
        x: format.date(item.name),
        y: Number(item.quantity),
      }))
    return [
      { name: SERIES_THIS_MONTH, data: thisMonth, color: "#E9EEF1" },
      { name: SERIES_LAST_MONTH, data: lastMonth, color: "#5E72B7" },
    ]
  }

  return (
    <Frame>
      <RenderIf
        reference={expenditure.response}
        render={(dashboard) => (
          <Fragment>
            <Container></Container>
            <div className="grid grid-cols-4 gap-[12px]">
              <Wrapper>
                <Content>Tông số chi tiêu</Content>
                <Content className="text-[24px] font-bold">243</Content>
                <Content className="text-gray-500 text-[12px]">
                  Tháng gần nhất
                </Content>
              </Wrapper>
              <Wrapper>
                <Content>Tông chi phí</Content>
                <Content className="text-[24px] text-blue-700 font-bold">
                  {Helper.Currency.vietNamDong(34602833)}
                </Content>
                <Content className="text-gray-500 text-[12px]">
                  Tháng gần nhất
                </Content>
              </Wrapper>
              <Wrapper>
                <Content>Tông số chi tiêu</Content>
                <Content className="text-[24px] font-bold">243</Content>
                <Content className="text-gray-500 text-[12px]">
                  Tháng gần nhất
                </Content>
              </Wrapper>
              <Wrapper>
                <Content>Tông số chi tiêu</Content>
                <Content className="text-[24px] font-bold">243</Content>
                <Content className="text-gray-500 text-[12px]">
                  Tháng gần nhất
                </Content>
              </Wrapper>
            </div>
            <div className="flex gap-[24px]">
              <div className="flex-1 gap-[24px] flex flex-col">
                <Wrapper>
                  <Title>Analyst</Title>
                  <AreaChart series={chart()}></AreaChart>
                </Wrapper>
                <div className="rounded-[12px] flex flex-col gap-[12px]">
                  <List
                    column={["Name", String(), "Paid", "Created", "Cost"]}
                    items={dashboard.expenseTransaction.recent}
                    fit
                    each={(item) => (
                      <Fragment>
                        <Column className="line-clamp-1 col-span-2">
                          <Content>{item.name}</Content>
                          <Description lineClamp={1}>
                            {item.description}
                          </Description>
                        </Column>
                        <Content>{Helper.Time.format(item.dateTime)}</Content>
                        <Content>{Helper.Time.format(item.created)}</Content>
                        <Content className="text-right">
                          {Helper.Currency.vietNamDong(item.amount)}
                        </Content>
                      </Fragment>
                    )}
                  ></List>
                </div>
              </div>
              <Column gap={24} size={6}>
                <Wrapper>
                  <Title>User managerment</Title>
                  <PolaChart></PolaChart>
                </Wrapper>
                <Wrapper>
                  <Title>Members</Title>
                  <div>
                    <div>
                      <ul className="flex ml-[8px]">
                        {images.map((image, index) => (
                          <li key={index} style={{ marginLeft: "-12px" }}>
                            <Image
                              src={image}
                              width={36}
                              height={36}
                              className=" rounded-full"
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Wrapper>
              </Column>
            </div>
          </Fragment>
        )}
      />
    </Frame>
  )
}

export default Dashboard
