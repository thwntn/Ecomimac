import { useGet } from "@/utils/hooks"
import AreaChart, { Value } from "@/app/(components)/chart/area"
import Row from "@/app/(components)/row"
import Wrapper from "@/app/(components)/wrapper"
import { ON, convert } from "@/app/(components)/common"
import Title from "@/app/(components)/title"
import RenderIf from "@/app/(components)/render-if"
import Input from "@/app/(components)/input"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import { RouteMap, FORMAT_DATE_AND_MONTH, Helper } from "@/utils/common"
import { useParams } from "next/navigation"
import { ExpenditureResponse, ExpenseResponse } from "@/utils/interface"
import { Fragment } from "react"
import Description from "@/app/(components)/description"
import Button from "@/app/(components)/button"

const COLOR = "#eb5834"

interface IParams {
  [key: string]: string
  id: string
}

const Statistical = () => {
  const params = useParams<IParams>()
  const expenditure = useGet<ExpenditureResponse[]>(
    RouteMap.EXPENSE_TRANSACTIONS +
      "/" +
      RouteMap.EXPENDITURE +
      "/" +
      params.id
  )
  const information = useGet<ExpenseResponse>(
    RouteMap.EXPENSE + "/" + params.id
  )

  const getDataChart = () => {
    const response = expenditure.response
    if (!response) return []

    const data = response.map(
      (item) =>
        new Value(
          Helper.Time.format(item.dateTime, FORMAT_DATE_AND_MONTH),
          item.quantity
        )
    )

    return data
  }

  return (
    <Row gap={24}>
      <Row size={4}>
        <Wrapper isLoad={convert(!information.response)}>
          <Title>Thông tin</Title>
          <RenderIf
            reference={information.response}
            render={(item) => (
              <Fragment>
                <Row gap={16} itemsCenter>
                  <Input
                    className="flex-1"
                    placeholder="Shopping, food, ..."
                    label="Search"
                  />
                  <Button icon="icon/search.svg">Tìm kiếm</Button>
                </Row>
                <Column gap={8}>
                  <Row>
                    <Content className="font-bold text-[18px]">
                      {item.name}
                    </Content>
                  </Row>
                  <Row gap={6}>
                    <Content>Tổng chi phí:</Content>
                    <Content className="font-bold">
                      {Helper.Currency.vietNamDong(item.totalCost)}
                    </Content>
                  </Row>
                  <Row gap={6}>
                    <Content>Ngày tạo:</Content>
                    <Content>{Helper.Time.format(item.created)}</Content>
                  </Row>
                  <Content className="text-gray-400">
                    {item.description}
                  </Content>
                </Column>
              </Fragment>
            )}
          ></RenderIf>
        </Wrapper>
      </Row>
      <Row size={8}>
        <Wrapper isLoad={convert(!expenditure.response)} gap={0}>
          <Fragment>
            <Title>Biểu đồ</Title>
            <AreaChart
              height={282}
              series={[
                {
                  data: getDataChart(),
                  color: COLOR,
                  name: String(),
                },
              ]}
            ></AreaChart>
            <Description className="text-center">
              Thống kê chi phí theo ngày
            </Description>
          </Fragment>
        </Wrapper>
      </Row>
    </Row>
  )
}

export default Statistical
