import { concatPathName, RouteMap, upperFirstLetter } from "@/utils/common"
import { Fetched, useDelete, useGet } from "@/utils/hooks"
import {
  DataResponse,
  FilterResponse,
  OperatorResponse,
} from "@/utils/interface/Data"
import { useConfirm } from "@/utils/functions"
import { convert, Position } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import Context from "@/app/(components)/context"
import Empty from "@/app/(components)/empty"
import Input from "@/app/(components)/input"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Wrapper from "@/app/(components)/wrapper"
import { Fragment } from "react"

interface IProps {
  fetchInformation: Fetched<DataResponse>
}

const Filter = (props: IProps) => {
  const isLoad = convert(props.fetchInformation.response === undefined)
  const confirm = useConfirm()
  const deleteFilter = useDelete<string>(concatPathName(RouteMap.FILTER))

  const fetchOperator = useGet<Array<OperatorResponse>>(
    concatPathName(RouteMap.FILTER, RouteMap.OPERATOR)
  )

  const onRemove = (filter: FilterResponse) =>
    confirm(() => deleteFilter.request({ pathname: filter.id }))
  return (
    <Wrapper isLoad={isLoad}>
      <RenderIf
        reference={props.fetchInformation.response}
        render={(information) => (
          <Fragment>
            <RenderIf
              reference={information.filters.length === 0}
              render={() => (
                <Empty text="Không có bộ lọc nào được áp dụng"></Empty>
              )}
            ></RenderIf>
            {information.filters.map((item, index) => (
              <Row gap={16} itemsCenter key={index}>
                <Row itemsCenter gap={16}>
                  <Row className="min-w-[64px]">
                    <Input
                      silent
                      label="Cột áp dụng"
                      value={upperFirstLetter(item.column)}
                    ></Input>
                  </Row>
                  <div className="border-t flex-1 border-gray-400 border-dashed"></div>
                </Row>
                <Content className="bg-gray-100 rounded-full py-[8px] px-[16px] whitespace-nowrap">
                  <RenderIf
                    reference={fetchOperator.response}
                    render={(operator) => {
                      const find = operator.find(
                        (op) => op.key === item.operator
                      )
                      if (find === undefined) return find
                      return find.title
                    }}
                  ></RenderIf>
                </Content>
                <Row itemsCenter gap={16}>
                  <div className="border-t flex-1 border-gray-400 border-dashed"></div>
                  <Row justifyEnd itemsCenter gap={6}>
                    <Content lineClamp={1}>{item.value}</Content>
                    <Context
                      position={Position.RIGHT}
                      items={[
                        {
                          label: <span className="text-red-600">Xoá</span>,
                          icon: "icon/trash.svg",
                          callback: () => onRemove(item),
                        },
                      ]}
                    ></Context>
                  </Row>
                </Row>
              </Row>
            ))}
          </Fragment>
        )}
      ></RenderIf>
    </Wrapper>
  )
}

export default Filter
