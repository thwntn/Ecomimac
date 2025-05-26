import { concatPathName, Helper, HubMethodName, RouteMap } from "@/utils/common"
import { QueryOptions, RecordAndCounter, useEffectOnce, useGet } from "@/utils/hooks"
import { DataResponse } from "@/utils/interface/Data"
import { ImportResponse } from "@/utils/interface/Import"
import { useConnection, useWithout } from "@/utils/functions"
import Button from "@/app/(components)/button"
import Column from "@/app/(components)/column"
import { convert } from "@/app/(components)/common"
import Container from "@/app/(components)/container"
import Description from "@/app/(components)/description"
import Frame from "@/app/(components)/frame"
import Input from "@/app/(components)/input"
import Line from "@/app/(components)/line"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Tag from "@/app/(components)/tag"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import { useParams } from "next/navigation"
import { Fragment } from "react"
import { tags } from "../../broadcast/_"
import AddFilter from "./components/AddFilter"
import Filter from "./components/Filter"
import Link from "./components/Link"
import Record from "./components/Record"

interface IParams {
  [id: string]: string
  id: string
}

const Information = () => {
  const without = useWithout()
  const params = useParams<IParams>()
  const connection = useConnection()

  const fetchInformation = useGet<DataResponse>(
    concatPathName(RouteMap.DATA, params.id)
  )

  const fetchImport = useGet<RecordAndCounter<ImportResponse>>(
    concatPathName(RouteMap.DATA, params.id, RouteMap.RECORD),
    { params: new QueryOptions() }
  )

  const onCreateFilter = () =>
    without.append(
      <RenderIf
        reference={fetchInformation.response}
        render={(information) => (
          <AddFilter onExit={without.close} information={information} />
        )}
      ></RenderIf>
    )

  useEffectOnce(() =>
    connection.effectOn(HubMethodName.DATA_INFORMATION, () => {
      fetchImport.fetch({ params: new QueryOptions() })
      fetchInformation.fetch()
    })
  )

  const isLoad = convert(fetchImport.response === undefined)
  return (
    <Frame>
      <Row itemsCenter justifyBetween>
        <Container></Container>
        <Row size={0.1} gap={8}>
          <Button icon="icon/refresh.svg">Làm mới</Button>
          <Button main icon="icon/edit-light.svg">
            Cập nhật
          </Button>
        </Row>
      </Row>

      <Row gap={24}>
        <Column size={8} gap={24}>
          <Wrapper isLoad={isLoad}>
            <RenderIf
              reference={fetchInformation.response}
              render={(information) => (
                <Fragment>
                  <Column gap={4}>
                    <Title icon="icon/create.svg">Thông tin chi tiết</Title>
                    <Description>
                      Chiến dịch gửi tin đã sử dụng dữ liệu
                    </Description>
                  </Column>
                  <Tag wrap items={tags}></Tag>
                  <Row>
                    <Input
                      label="Tên nguồn dữ liệu"
                      silent
                      value={information.name}
                    ></Input>

                    <Input
                      label="Thời gian tải lên"
                      silent
                      value={Helper.Time.format(information.created)}
                    ></Input>
                  </Row>
                </Fragment>
              )}
            ></RenderIf>
          </Wrapper>
          <Line name="Dữ liệu đã tải lên"></Line>
          <Record
            fetchImport={fetchImport}
            fetchInformation={fetchInformation}
          ></Record>
        </Column>
        <Column size={4} gap={24}>
          <Wrapper>
            <Column>
              <Title>Lịch sử hoạt động</Title>
              <Description>Chiến dịch gửi tin đã sử dụng dữ liệu</Description>
            </Column>
          </Wrapper>
          <Row itemsCenter gap={8}>
            <Line name="Bộ lọc"></Line>
            <Button icon="icon/data/filter.svg" onClick={onCreateFilter}>
              Tạo bộ lọc
            </Button>
          </Row>
          <Filter fetchInformation={fetchInformation}></Filter>
          <Line name="Liên kết truyền thông"></Line>
          <Link fetchData={fetchInformation}></Link>
        </Column>
      </Row>
    </Frame>
  )
}

export default Information
