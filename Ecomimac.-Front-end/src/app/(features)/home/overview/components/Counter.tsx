import ColumnChart from "@/app/(components)/chart/column"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"

const Counter = () => {
  return (
    <Row gap={24} className="pointer-events-none">
      <Column size={4}>
        <Wrapper>
          <Row justifyBetween>
            <Column gap={8}>
              <Title>Tổng số hoá đơn</Title>
              <Content className="text-[24px] font-bold">18,765</Content>
              <Description>7 ngày gần nhất</Description>
            </Column>
            <ColumnChart></ColumnChart>
          </Row>
        </Wrapper>
      </Column>
      <Row size={8} gap={24}>
        <Column size={6}>
          <Wrapper>
            <Row justifyBetween>
              <Column gap={8}>
                <Title>Tổng số tài khoản iam</Title>
                <Content className="text-[24px] font-bold">362</Content>
                <Description>Tất cả tài khoản</Description>
              </Column>
              <ColumnChart color="#2eb03f"></ColumnChart>
            </Row>
          </Wrapper>
        </Column>
        <Column size={6}>
          <Wrapper>
            <Row justifyBetween>
              <Column gap={8}>
                <Title>Tổng số giao dịch</Title>
                <Content className="text-[24px] font-bold">1,524</Content>
                <Description>30 gần nhất</Description>
              </Column>
              <ColumnChart color="#2e93ff"></ColumnChart>
            </Row>
          </Wrapper>
        </Column>
      </Row>
    </Row>
  )
}

export default Counter
