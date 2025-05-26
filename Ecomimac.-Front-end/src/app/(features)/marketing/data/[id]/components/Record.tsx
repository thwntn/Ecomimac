import { DataType, mappingToPagination, upperFirstLetter } from "@/utils/common"
import { Fetched, RecordAndCounter, useQuery } from "@/utils/hooks"
import { DataResponse } from "@/utils/interface/Data"
import { ImportResponse } from "@/utils/interface/Import"
import Content from "@/app/(components)/content"
import List from "@/app/(components)/list"
import ListRender from "@/app/(components)/list/render"
import RenderIf from "@/app/(components)/render-if"
import { Fragment } from "react"
import { mapName } from "./_"
import Column from "@/app/(components)/column"
import Filter from "@/app/(components)/list/filter"

interface IProps {
  fetchInformation: Fetched<DataResponse>
  fetchImport: Fetched<RecordAndCounter<ImportResponse>>
}

const Record = (props: IProps) => {
  const query = useQuery(props.fetchImport)
  return (
    <Column gap={24}>
      <Filter filters={[]}></Filter>
      <RenderIf
        trigger={props.fetchImport.isWait === false}
        reference={props.fetchInformation.response}
        reverse={<ListRender column={5} />}
        render={(information) => (
          <RenderIf
            reverse={<ListRender column={5}></ListRender>}
            reference={props.fetchImport.response}
            render={(data) => (
              <List
                silent
                column={information.parseSchema.map((item) => {
                  const name =
                    information.type === DataType.FROM_CUSTOMER
                      ? mapName[item]
                      : upperFirstLetter(item)
                  return name
                })}
                items={data.data}
                page={mappingToPagination(props.fetchImport, query.updatePage)}
                each={(record) => (
                  <Fragment>
                    {information.parseSchema.map((item, index) => {
                      return (
                        <Content lineClamp={1} key={index}>
                          {record.parseRecord[item]}
                        </Content>
                      )
                    })}
                  </Fragment>
                )}
              ></List>
            )}
          />
        )}
      ></RenderIf>
    </Column>
  )
}

export default Record
