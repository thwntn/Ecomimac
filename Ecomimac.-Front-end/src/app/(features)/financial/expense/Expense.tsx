import Button from "@/app/(components)/button"
import Container from "@/app/(components)/container"
import Frame from "@/app/(components)/frame"
import Row from "@/app/(components)/row"
import { useWithout } from "@/utils/functions"
import { QueryOptions, RecordAndCounter, useGet } from "@/utils/hooks"
import { ExpenseCategoryResponse } from "@/utils/interface"
import { RouteMap } from "@/utils/common"
import CreateUpdate from "./components/Create_Update"
import Counter from "./components/Counter"
import List from "./components/List"
import Line from "@/app/(components)/line"

export const LIMIT_PAGE = 4

const Expense = () => {
  const without = useWithout()
  const expenseCategory = useGet<RecordAndCounter<ExpenseCategoryResponse>>(
    RouteMap.EXPENSE_CATEGORY,
    {
      params: new QueryOptions({ page: 1, limit: LIMIT_PAGE }),
    }
  )
  return (
    <Frame>
      <Row justifyBetween itemsCenter>
        <Container></Container>
        <Button
          main
          icon="icon/create-light.svg"
          onClick={() =>
            without.append(
              <CreateUpdate onExit={without.close}></CreateUpdate>
            )
          }
        >
          Tạo danh mục
        </Button>
      </Row>
      <Counter></Counter>
      <Line name="Danh mục chi tiêu"></Line>
      <List expenseCategory={expenseCategory}></List>
    </Frame>
  )
}

export default Expense
