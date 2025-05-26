import Container from "@/app/(components)/container"
import Banner from "./components/Banner"
import Counter from "./components/counter"
import List from "./components/List"
import Frame from "@/app/(components)/frame"
import Row from "@/app/(components)/row"
import Button from "@/app/(components)/button"
import { useWithout } from "@/utils/functions"
import CreateUpdate from "./components/Create_Update"
import { useParams } from "next/navigation"
import Clone from "./components/Clone"
import Break from "@/app/(components)/line"

interface IParams {
  [key: string]: string
  categoryId: string
}

const Overview = () => {
  const without = useWithout()
  const params = useParams<IParams>()

  return (
    <Frame>
      <Row justifyBetween>
        <Row size={7}>
          <Container></Container>
        </Row>
        <Row size={0.1} gap={8}>
          <Button
            icon="icon/expense-copy.svg"
            onClick={() => {
              without.append(
                <Clone
                  expenseCategoryId={params.categoryId}
                  onExit={without.close}
                ></Clone>
              )
            }}
          >
            Sao chép danh mục
          </Button>
          <Button
            onClick={() => {
              without.append(
                <CreateUpdate
                  expenseCategoryId={params.categoryId}
                  onExit={without.close}
                />
              )
            }}
            icon="icon/create-light.svg"
            main
          >
            Tạo danh mục
          </Button>
        </Row>
      </Row>
      <Banner categoryId={params.categoryId}></Banner>
      <Break name="Giao dịch & chi phí"></Break>
      <Counter categoryId={params.categoryId} />
      <Break name="Danh mục"></Break>
      <List categoryId={params.categoryId}></List>
    </Frame>
  )
}

export default Overview
