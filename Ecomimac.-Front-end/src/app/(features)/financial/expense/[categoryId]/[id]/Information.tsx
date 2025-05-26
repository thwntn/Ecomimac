import Frame from "@/app/(components)/frame"
import Statistical from "./components/Statistical"
import List from "./components/List"
import Row from "@/app/(components)/row"
import Container from "@/app/(components)/container"
import Button from "@/app/(components)/button"
import CreateUpdate from "./components/Create_Update"
import { useWithout } from "@/utils/functions"

const Information = () => {
  const without = useWithout()

  return (
    <Frame>
      <Row justifyBetween>
        <Container></Container>
        <Button
          icon="icon/create-light.svg"
          main
          onClick={() =>
            without.append(<CreateUpdate onExit={without.close} />)
          }
        >
          Thêm giao dịch
        </Button>
      </Row>
      <Statistical />
      <List />
    </Frame>
  )
}

export default Information
