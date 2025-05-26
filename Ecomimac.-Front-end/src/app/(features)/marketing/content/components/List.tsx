import { RouteMap, concatPathName, mappingToPagination } from "@/utils/common"
import { Fetched, RecordAndCounter, useGet, useQuery } from "@/utils/hooks"
import { ChannelResponse } from "@/utils/interface/Broadcast"
import { ContentResponse } from "@/utils/interface/Content"
import { useRouter } from "@/utils/functions"
import Character from "@/app/(components)/character"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import DateTime from "@/app/(components)/date-time"
import Description from "@/app/(components)/description"
import { default as CustomList } from "@/app/(components)/list"
import ListRender from "@/app/(components)/list/render"
import Profile from "@/app/(components)/profile"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import { Fragment } from "react"

interface IProps {
  fetchContent: Fetched<RecordAndCounter<ContentResponse>>
  fetchChannel: Fetched<Array<ChannelResponse>>
}

const List = (props: IProps) => {
  const query = useQuery(props.fetchContent)
  const router = useRouter()

  const go = (content: ContentResponse) =>
    router.push(concatPathName(window.location.href, content.id))

  return (
    <RenderIf
      reference={props.fetchContent.response}
      reverse={<ListRender column={5} />}
      render={(content) => (
        <CustomList
          column={["Tên mẫu tin", "Ngày tạo", "Loại tin", "Người tạo"]}
          items={content.data}
          page={mappingToPagination(props.fetchContent, (page) =>
            query.updatePage(page)
          )}
          onClick={go}
          each={(item) => (
            <Fragment>
              <Row gap={8} itemsCenter>
                <Character text={item.name}></Character>
                <Column>
                  <Content>{item.name}</Content>
                  <Description lineClamp={1}>{item.description}</Description>
                </Column>
              </Row>

              <DateTime dateTime={new Date(item.created)}></DateTime>

              <Column>
                <RenderIf
                  reference={props.fetchChannel.response}
                  render={(channels) => {
                    const channel = channels.find(
                      (channel) => channel.enum === item.mode
                    )
                    if (channel === undefined) return channel
                    return (
                      <Fragment>
                        <Content>{channel.name}</Content>
                        <Description lineClamp={1}>
                          {channel.description}
                        </Description>
                      </Fragment>
                    )
                  }}
                ></RenderIf>
              </Column>

              <Profile
                avatar={item.profile.avatar}
                name={item.profile.name}
                email={item.profile.email}
              ></Profile>
            </Fragment>
          )}
        ></CustomList>
      )}
    ></RenderIf>
  )
}

export default List
