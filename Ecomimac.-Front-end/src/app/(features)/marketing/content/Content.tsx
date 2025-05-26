import Column from "@/app/(components)/column"
import Row from "@/app/(components)/row"
import Container from "@/app/(components)/container"
import Frame from "@/app/(components)/frame"
import Button from "@/app/(components)/button"
import { RecordAndCounter, useForm, useGet, usePatch, useQuery } from "@/utils/hooks"
import { RouteMap, concatPathName } from "@/utils/common"
import { useWithout } from "@/utils/functions"
import CreateUpdate from "./components/Create_Update"
import List from "./components/List"
import Counter from "@/app/(features)/e-commerce/sale-program/components/Counter"
import Filter from "@/app/(components)/list/filter"
import { ContentResponse } from "@/utils/interface/Content"
import { ChannelResponse } from "@/utils/interface/Broadcast"

interface IPrams {
  [key: string]: string
  id: string
}

const Email = () => {
  const fetchContent = useGet<RecordAndCounter<ContentResponse>>(
    RouteMap.CONTENTS
  )
  const fetchChannel = useGet<Array<ChannelResponse>>(
    concatPathName(RouteMap.BROADCASTS, RouteMap.CHANNEL)
  )

  const without = useWithout()

  const openCreateUpdate = () =>
    without.append(<CreateUpdate onExit={without.close}></CreateUpdate>)

  return (
    <Frame>
      <Row itemsCenter justifyBetween>
        <Container></Container>
        <Row size={0.1} gap={8}>
          <Button icon="icon/edit-light.svg" main onClick={openCreateUpdate}>
            Tạo mẫu tin
          </Button>
        </Row>
      </Row>

      <Counter></Counter>

      <Column gap={24}>
        <Filter filters={[]}></Filter>
        <Row padding={8}>
          <List fetchContent={fetchContent} fetchChannel={fetchChannel}></List>
        </Row>
      </Column>
    </Frame>
  )
}

export default Email
