import {
  concatPathName,
  formatNumber,
  Helper,
  mappingToPagination,
  Redirect,
  RouteMap,
} from "@/utils/common"
import { Fetched, RecordAndCounter, useDelete, useGet, useQuery } from "@/utils/hooks"
import { DataResponse, StatusResponse } from "@/utils/interface/Data"
import { useConfirm, useRouter } from "@/utils/functions"
import Character from "@/app/(components)/character"
import Column from "@/app/(components)/column"
import { Position } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import Context from "@/app/(components)/context"
import DateTime from "@/app/(components)/date-time"
import Description from "@/app/(components)/description"
import Icon from "@/app/(components)/icon"
import { default as CustomList } from "@/app/(components)/list"
import Filter from "@/app/(components)/list/filter"
import ListRender from "@/app/(components)/list/render"
import Profile from "@/app/(components)/profile"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import State from "@/app/(components)/state"
import Tag from "@/app/(components)/tag"
import Title from "@/app/(components)/title"
import { Fragment } from "react"
import { shuffleArray, tags } from "../../broadcast/_"

interface IProps {
  fetchData: Fetched<RecordAndCounter<DataResponse>>
}

const List = (props: IProps) => {
  const router = useRouter()
  const confirm = useConfirm()
  const query = useQuery(props.fetchData)

  const deleteData = useDelete(concatPathName(RouteMap.DATA))
  const fetchStatus = useGet<Array<StatusResponse>>(
    concatPathName(RouteMap.DATA, RouteMap.STATUS)
  )

  const onRemove = (data: DataResponse) =>
    confirm(
      () => deleteData.request({ pathname: data.id }),
      {
        title: "Xóa nguồn dữ liệu",
        description: `Bạn sắp xóa vĩnh viễn nguồn dữ liệu '${data.name}', có thể ảnh hưởng đến các chương trình đang sử dụng dữ liệu này.`,
      },
      <Row itemsCenter gap={8}>
        <Character text={data.name}></Character>
        <Column>
          <Title lineClamp={1}>{data.name}</Title>
          <Description lineClamp={1}>{data.description}</Description>
        </Column>
      </Row>
    )
  return (
    <Column gap={24}>
      <Filter
        onSearch={(text) => query.updateSearch(text, "name")}
        filters={[]}
      ></Filter>

      <Row>
        <RenderIf
          trigger={props.fetchData.isWait === false}
          reverse={<ListRender column={5}></ListRender>}
          reference={props.fetchData.response}
          render={(data) => (
            <CustomList
              onClick={(item) =>
                router.push(concatPathName(Redirect.DATA, item.id))
              }
              column={[
                "Tên dữ liệu",
                "",
                "Gắn thẻ",
                "",
                "Ngày tạo",
                "Trạng thái",
                "Số lượng dữ liệu",
                "Người tạo",
              ]}
              items={data.data}
              action={[
                ([item]) => (
                  <Row gap={8}>
                    <Icon
                      dir="icon/trash.svg"
                      style={{ filter: "grayscale(1)" }}
                      content="Xoá nguồn dữ liệu"
                      reflect={true}
                      onClick={() => onRemove(item)}
                    ></Icon>
                    <Context
                      position={Position.RIGHT}
                      items={[
                        {
                          label: "Sao chép",
                          callback: () => {},
                          icon: "icon/copy.svg",
                        },
                        {
                          label: <span className="text-red-500">Xoá</span>,
                          callback: () => onRemove(item),
                          icon: "icon/trash.svg",
                        },
                      ]}
                    ></Context>
                  </Row>
                ),
              ]}
              page={mappingToPagination(props.fetchData, query.updatePage)}
              each={(item) => (
                <Fragment>
                  <Row className="col-span-2" itemsCenter gap={8}>
                    <Character text={item.name}></Character>
                    <Column>
                      <Content lineClamp={1}>{item.name}</Content>
                      <Description lineClamp={1}>
                        {item.description}
                      </Description>
                    </Column>
                  </Row>
                  <Row weigh={2}>
                    <Tag items={shuffleArray(tags)}></Tag>
                  </Row>
                  <DateTime dateTime={new Date(item.created)}></DateTime>
                  <Row>
                    <RenderIf
                      reference={fetchStatus.response}
                      render={(status) => {
                        const find = status.find(
                          (status) => status.enum === item.status
                        )
                        if (find === undefined) return
                        return (
                          <State
                            name={find.name}
                            color={find.color}
                            background={find.backgroundColor}
                          ></State>
                        )
                      }}
                    ></RenderIf>
                  </Row>
                  <Column>
                    <Row itemsCenter>
                      <Description className="text-nowrap pr-[4px]">
                        Tổng cộng:
                      </Description>
                      <Content lineClamp={1}>
                        {formatNumber(item.quantityRecord)}
                      </Content>
                    </Row>
                    <Description lineClamp={1}>
                      Cập...: {Helper.Time.format(item.updated)}
                    </Description>
                  </Column>
                  <Profile
                    name={item.profile.name}
                    email={item.profile.email}
                  ></Profile>
                </Fragment>
              )}
            ></CustomList>
          )}
        ></RenderIf>
      </Row>
    </Column>
  )
}

export default List
