import { Fetched, Form, RecordAndCounter, usePatch } from "@/utils/hooks"
import { BroadcastResponse } from "@/utils/interface/Broadcast"
import Character from "@/app/(components)/character"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Tag from "@/app/(components)/tag"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import { Fragment } from "react"
import { DataResponse } from "@/utils/interface/Data"
import Dropdown from "@/app/(components)/dropdown"
import { FormData, Map } from "../Setup"
import Button from "@/app/(components)/button"
import {
  BroadcastProcess,
  concatPathName,
  formatNumber,
  Message,
  Redirect,
  RouteMap,
  upperFirstLetter,
} from "@/utils/common"
import { useConfirm, useRouter, useWithout } from "@/utils/functions"
import Input from "@/app/(components)/input"
import { convert } from "@/app/(components)/common"
import Icon from "@/app/(components)/icon"
import Rename from "./Rename"
import { tags } from "../../_"

interface IProps {
  fetchBroadcast: Fetched<BroadcastResponse>
  fetchListData: Fetched<RecordAndCounter<DataResponse>>
  form: Form<FormData>
}
const Information = (props: IProps) => {
  const router = useRouter()
  const confirm = useConfirm()
  const without = useWithout()
  const patchChangeData = usePatch(concatPathName(RouteMap.BROADCASTS))
  const isLoad = convert(
    props.fetchBroadcast.isWait === true || props.fetchListData.isWait === true
  )

  const onChooseData = (dataId: string) =>
    confirm(
      () => {
        const formdata = { dataId }
        //  Summary:
        //      Request change data
        patchChangeData.request(formdata, {
          pathname: concatPathName(
            props.form.data.id,
            RouteMap.BROADCAST_UPDATE_DATA
          ),
        })
      },
      {
        title: Message.BROADCAST_UPDATE_DATA_TITLE,
        description: Message.BROADCAST_UPDATE_DATA_DESCRIPTION,
      }
    )

  const goData = (dataId: string) =>
    router.push(
      concatPathName(String(), Redirect.MARKETING, Redirect.DATA, dataId)
    )

  return (
    <Wrapper isLoad={isLoad}>
      <RenderIf
        reference={props.fetchBroadcast.response}
        render={(broadcast) => (
          <Fragment>
            <Column>
              <Title>1. Chi tiết chiến dịch</Title>
              <Description lineClamp={1}>
                Thiết lập tên, mô tả và nguồn dữ liệu cho chiến dịch gửi tin
                hàng loạt.
              </Description>
            </Column>
            <Row>
              <Row gap={12} itemsCenter>
                <Character text={broadcast.name}></Character>
                <Column>
                  <Content>{broadcast.name}</Content>
                  <Description lineClamp={2}>
                    {broadcast.description}
                  </Description>
                </Column>
              </Row>
              <Icon
                dir="icon/broadcast/rename.svg"
                onClick={() =>
                  without.append(
                    <Rename onExit={without.close} form={props.form}></Rename>
                  )
                }
              ></Icon>
            </Row>
            <Tag items={tags}></Tag>
            <Column gap={16}>
              <RenderIf
                reference={props.fetchListData.response}
                render={(store) => (
                  <Row gap={8} itemsCenter>
                    <RenderIf
                      reference={broadcast.process === BroadcastProcess.DRAFT}
                      reverse={
                        <Input
                          label="Nguồn dữ liệu"
                          silent
                          value={props.form.data.data?.name}
                        ></Input>
                      }
                      render={() => (
                        <Dropdown
                          items={store.data}
                          label="Nguồn dữ liệu"
                          reference={props.form.data.data}
                          show={(item) => item.name}
                          each={(item) => (
                            <Row itemsCenter gap={8}>
                              <Character text={item.name}></Character>
                              <Column>
                                <Content lineClamp={1}>{item.name}</Content>
                                <Description lineClamp={1}>
                                  <Row gap={4} itemsCenter>
                                    <Description>Số lượng:</Description>
                                    <Content>
                                      {formatNumber(item.quantityRecord)} bản
                                      ghi
                                    </Content>
                                  </Row>
                                </Description>
                              </Column>
                            </Row>
                          )}
                          onChange={(item) => onChooseData(item.id)}
                        ></Dropdown>
                      )}
                    ></RenderIf>

                    <RenderIf
                      reference={props.form.data.dataId}
                      render={(dataId) => (
                        <Button onClick={() => goData(dataId)}>
                          Xem dữ liệu
                        </Button>
                      )}
                    ></RenderIf>
                  </Row>
                )}
              ></RenderIf>

              <RenderIf
                reference={props.fetchBroadcast.response}
                render={(broadcast) => {
                  const maps = broadcast.data.parseSchema.map(
                    (map) => new Map(String(), map)
                  )

                  const reference = maps.find(
                    (map) => map.key === props.form.data.sendKey
                  )
                  return (
                    <Row itemsCenter gap={8}>
                      <RenderIf
                        reference={broadcast.process === BroadcastProcess.DRAFT}
                        reverse={
                          reference && (
                            <Input
                              silent
                              label="Địa chỉ gửi tin"
                              value={upperFirstLetter(reference.key)}
                            ></Input>
                          )
                        }
                        render={() => {
                          const validate = convert(
                            props.form.validate.isOpen === false ||
                              props.form.data.sendKey
                          )

                          return (
                            <Dropdown
                              validated={validate}
                              error={Message.CAN_NOT_EMPTY}
                              className="min-w-[256px]"
                              label="Địa chỉ gửi tin"
                              items={maps}
                              reference={reference}
                              each={(item) => upperFirstLetter(item.key)}
                              onChange={(map) =>
                                props.form.append("sendKey", map.key)
                              }
                            ></Dropdown>
                          )
                        }}
                      ></RenderIf>
                    </Row>
                  )
                }}
              ></RenderIf>
            </Column>
          </Fragment>
        )}
      ></RenderIf>
    </Wrapper>
  )
}

export default Information
