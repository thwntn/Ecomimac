import Button from "@/app/(components)/button"
import Container from "@/app/(components)/container"
import Frame from "@/app/(components)/frame"
import Row from "@/app/(components)/row"
import List from "./components/List"
import { useWithout } from "@/utils/functions"
import CreateUpdate from "./components/create_update"

const Configuration = () => {
  const without = useWithout()

  const onCreate = () => without.append(<CreateUpdate onExit={without.close} />)
  return (
    <Frame>
      <Row itemsCenter justifyBetween>
        <Container></Container>
        <Row size={0.1} gap={8}>
          <Button icon="icon/refresh.svg">Làm mới</Button>
          <Button onClick={onCreate} main icon="icon/configuration/create.svg">
            Cấu hình kênh
          </Button>
        </Row>
      </Row>
      <List></List>
    </Frame>
  )
}

export default Configuration
