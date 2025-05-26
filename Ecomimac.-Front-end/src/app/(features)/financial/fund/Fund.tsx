import { useWithout } from "@/utils/functions"
import User from "./components/User"
import Frame from "@/app/(components)/frame"
import Row from "@/app/(components)/row"
import Container from "@/app/(components)/container"
import Button from "@/app/(components)/button"
import CreateUpdate from "./components/CreateUpdate"
import List from "./components/list"
import Column from "@/app/(components)/column"

const Fund = () => {
  const without = useWithout()
  return (
    <Frame>
      <Row className="justify-between">
        <Container></Container>
        <Button
          main
          onClick={() =>
            without.append(<CreateUpdate onExit={without.close} />)
          }
          icon="icon/create-light.svg"
        >
          Thêm thẻ
        </Button>
      </Row>
      <Column gap={8}>
        <List />
        <User></User>
      </Column>
    </Frame>
  )
}

export default Fund
