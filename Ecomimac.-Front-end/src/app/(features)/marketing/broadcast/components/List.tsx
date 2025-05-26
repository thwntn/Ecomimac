import {
  concatPathName,
  formatNumber,
  mappingToPagination,
  Message,
  RouteMap,
} from "@/utils/common"
import { Fetched, RecordAndCounter, useDelete, useGet, useQuery } from "@/utils/hooks"
import {
  BroadcastResponse,
  ChannelResponse,
  StatusBroadcastResponse,
} from "@/utils/interface/Broadcast"
import { useConfirm, useRouter } from "@/utils/functions"
import Character from "@/app/(components)/character"
import Column from "@/app/(components)/column"
import { Position } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import Context from "@/app/(components)/context"
import DateTime from "@/app/(components)/date-time"
import Description from "@/app/(components)/description"
import Icon from "@/app/(components)/icon"
import Image from "@/app/(components)/image"
import { default as CustomList } from "@/app/(components)/list"
import Filter from "@/app/(components)/list/filter"
import ListRender from "@/app/(components)/list/render"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import State from "@/app/(components)/state"
import { Fragment } from "react"

interface IProps {
  fetchBroadcast: Fetched<RecordAndCounter<BroadcastResponse>>
}

const List = (props: IProps) => {
  const router = useRouter()
  const confirm = useConfirm()
  const query = useQuery(props.fetchBroadcast)

  const deleteBroadcast = useDelete(concatPathName(RouteMap.BROADCASTS))

  const goInformation = (item: BroadcastResponse) =>
    router.push(concatPathName(window.location.href, item.id))

  const fetchStatus = useGet<StatusBroadcastResponse[]>(
    concatPathName(RouteMap.BROADCASTS, RouteMap.STATUS)
  )

  const fetchChannel = useGet<Array<ChannelResponse>>(
    concatPathName(RouteMap.BROADCASTS, RouteMap.CHANNEL)
  )

  const onRemove = (item: BroadcastResponse) =>
    confirm(() => void deleteBroadcast.request({ pathname: item.id }), {
      title: Message.BROADCAST_DELETE_TITLE,
      description: Message.BROADCAST_DELETE_DESCRIPTION,
    })
  return (
    <Fragment>
      <Filter
        filters={[]}
        onSearch={(content) => query.updateSearch(content, "name")}
      ></Filter>
      <RenderIf
        trigger={props.fetchBroadcast.isWait === false}
        reverse={<ListRender column={5}></ListRender>}
        reference={props.fetchBroadcast.response}
        render={(broadcast) => (
          <Fragment>
            <CustomList
              items={broadcast.data}
              column={[
                "Tên lịch gửi",
                "",
                "Kênh gửi",
                "",
                "Dữ liệu",
                "",
                "Ngày tạo",
                "Trạng thái",
                "Thông tin",
              ]}
              page={mappingToPagination(props.fetchBroadcast, query.updatePage)}
              action={[
                ([item]) => (
                  <Row gap={4}>
                    <Icon
                      onClick={() => onRemove(item)}
                      dir="icon/trash.svg"
                      style={{ filter: "grayscale(1)" }}
                    ></Icon>
                    <Context
                      position={Position.RIGHT}
                      items={[
                        { label: "Chỉnh sửa", icon: "icon/edit.svg" },
                        {
                          label: (
                            <Content className="text-red-500">Xoá</Content>
                          ),
                          icon: "icon/trash.svg",
                        },
                      ]}
                    ></Context>
                  </Row>
                ),
              ]}
              onClick={goInformation}
              each={(item) => (
                <Fragment>
                  <Column gap={16} weigh={2}>
                    <Row itemsCenter gap={8}>
                      <Row gap={8} itemsCenter>
                        <Character text={item.name}></Character>
                        <Column>
                          <Content lineClamp={1}>{item.name}</Content>
                          <Description lineClamp={1}>
                            {item.description}
                          </Description>
                        </Column>
                      </Row>
                    </Row>
                  </Column>

                  <Row gap={12} itemsCenter weigh={2}>
                    <RenderIf
                      reference={fetchChannel.response}
                      render={(channels) => {
                        const find = channels.find(
                          (channel) => channel.enum == item.channel
                        )
                        if (find === undefined) return find

                        return (
                          <Fragment>
                            <Image
                              src={concatPathName(
                                process.env.NEXT_PUBLIC_BACKEND,
                                find.icon
                              )}
                              width={32}
                              height={32}
                            ></Image>
                            <Column>
                              <Content>Kênh gửi tin: {find.name}</Content>
                              <RenderIf
                                reference={item.emailCredential}
                                render={(credential) => (
                                  <Description lineClamp={1}>
                                    Định danh: {credential.name}
                                  </Description>
                                )}
                              ></RenderIf>
                            </Column>
                          </Fragment>
                        )
                      }}
                    ></RenderIf>
                  </Row>

                  <Column weigh={2}>
                    <Content lineClamp={1}>{item.data.name}</Content>
                    <Description lineClamp={1}>
                      {item.data.description}
                    </Description>
                  </Column>

                  <Row>
                    <DateTime dateTime={new Date(item.created)} />
                  </Row>

                  <Column gap={12}>
                    <RenderIf
                      reference={fetchStatus.response}
                      render={(status) => {
                        const find = status.find(
                          (status) => status.enum == item.process
                        )
                        if (find === undefined) return find

                        return (
                          <State
                            background={find.backgroundColor}
                            color={find.color}
                            name={find.name}
                          ></State>
                        )
                      }}
                    ></RenderIf>
                  </Column>

                  <Column>
                    <Row itemsCenter gap={4}>
                      <Description>Gửi: </Description>
                      <Content>{item.times} lần</Content>
                    </Row>

                    <Row gap={8}>
                      <div>
                        <Row itemsCenter gap={4}>
                          <Icon
                            content="Gửi thành công"
                            size={16}
                            dir="icon/marketing-success.svg"
                            className="opacity-80"
                          ></Icon>
                          <Content className="font-[Medium] text-[#32cd32]">
                            {formatNumber(item.numberSuccess)}
                          </Content>
                        </Row>
                      </div>
                      <div>
                        <Row itemsCenter gap={4}>
                          <Icon
                            content="Gửi thất bại, chờ thử lại"
                            size={16}
                            dir="icon/marketing-error.svg"
                            className="opacity-80"
                          ></Icon>
                          <Content className="font-[Medium] text-[#fc4503]">
                            {formatNumber(item.numberFailed)}
                          </Content>
                        </Row>
                      </div>
                    </Row>
                  </Column>
                </Fragment>
              )}
            ></CustomList>
          </Fragment>
        )}
      ></RenderIf>
    </Fragment>
  )
}

export default List
