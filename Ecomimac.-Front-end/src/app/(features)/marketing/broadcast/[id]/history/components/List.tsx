import { mappingToPagination } from "@/utils/common"
import { Fetched, RecordAndCounter, useQuery } from "@/utils/hooks"
import { HistoryResponse, HistoryStatusResponse } from "@/utils/interface"
import Character from "@/app/(components)/character"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import DateTime from "@/app/(components)/date-time"
import Description from "@/app/(components)/description"
import { default as CustomList } from "@/app/(components)/list"
import Filter from "@/app/(components)/list/filter"
import ListRender from "@/app/(components)/list/render"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import State from "@/app/(components)/state"
import { Fragment } from "react"

interface IProps {
  fetchHistory: Fetched<RecordAndCounter<HistoryResponse>>
  fetchHistoryStatus: Fetched<HistoryStatusResponse[]>
}

const List = (props: IProps) => {
  const query = useQuery(props.fetchHistory)

  return (
    <Column gap={24} padding={8}>
      <Filter filters={[]}></Filter>
      <RenderIf
        trigger={props.fetchHistory.isWait === false}
        reverse={<ListRender column={5} />}
        reference={props.fetchHistory.response}
        render={(history) => (
          <CustomList
            items={history.data}
            column={[
              "Địa chỉ",
              "",
              "Chiến dịch truyền thông",
              "Ngày gửi",
              "Lần gửi",
              "Trạng thái",
              "Mô tả",
              "",
            ]}
            page={mappingToPagination(props.fetchHistory, query.updatePage)}
            each={(item) => (
              <Fragment>
                <Row itemsCenter gap={8} className="col-span-2">
                  <Character text={item.contact.toUpperCase()}></Character>
                  <Column>
                    <Content>{item.contact}</Content>
                    <Description>{item.sendingId}</Description>
                  </Column>
                </Row>
                <Column>
                  <Content lineClamp={1}>{item.name}</Content>
                  <Description lineClamp={1}>{item.description}</Description>
                </Column>
                <DateTime dateTime={new Date(item.created)}></DateTime>
                <Content>Gửi lần {item.times}</Content>
                <Fragment>
                  <RenderIf
                    reference={props.fetchHistoryStatus.response}
                    render={(status) => {
                      const find = status.find(
                        (status) => status.enum === item.status
                      )
                      if (find === undefined)
                        return (
                          <Fragment>
                            <Row></Row>
                            <Row></Row>
                          </Fragment>
                        )

                      return (
                        <Fragment>
                          <State
                            name={find.title}
                            color={find.color}
                            background={find.backgroundColor}
                          ></State>
                          <Row weigh={2}>
                            <Content lineClamp={2}>{find.description}</Content>
                          </Row>
                        </Fragment>
                      )
                    }}
                  ></RenderIf>
                </Fragment>
              </Fragment>
            )}
          ></CustomList>
        )}
      ></RenderIf>
    </Column>
  )
}

export default List
