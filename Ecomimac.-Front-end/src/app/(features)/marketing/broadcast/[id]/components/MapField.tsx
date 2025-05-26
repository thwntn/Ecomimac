import { Fetched, Form } from "@/utils/hooks"
import RenderIf from "@/app/(components)/render-if"
import Wrapper from "@/app/(components)/wrapper"
import { FormData, Map } from "../Setup"
import { Fragment, useEffect } from "react"
import Column from "@/app/(components)/column"
import Title from "@/app/(components)/title"
import Description from "@/app/(components)/description"
import { BroadcastResponse } from "@/utils/interface/Broadcast"
import Row from "@/app/(components)/row"
import Dropdown from "@/app/(components)/dropdown"
import Content from "@/app/(components)/content"
import { BroadcastProcess, Message, upperFirstLetter } from "@/utils/common"
import Input from "@/app/(components)/input"
import { convert, OFF, ON, Status } from "@/app/(components)/common"

interface IProps {
  form: Form<FormData>
  fetchBroadcast: Fetched<BroadcastResponse>
}

const MapField = (props: IProps) => {
  const onMap = (field: string, key: string | undefined) => {
    const formData = props.form.data

    const find = formData.maps.find((map) => map.field === field)
    if (find === undefined) return

    const index = formData.maps.indexOf(find)
    formData.maps[index] = new Map(field, key)

    props.form.append("maps", formData.maps)
  }

  const validateField = (field: string | undefined): Status => {
    const canActive = props.form.validate.isOpen
    if (canActive === false) return ON

    // Summary:
    //      If form not action validate -> skip
    const find = props.form.data.maps.find((map) => map.field === field)
    if (canActive && find && (find.key === null) === false) return ON

    return OFF
  }

  return (
    <Wrapper>
      <RenderIf
        reference={props.form.data.data}
        render={(data) => (
          <Fragment>
            <Column>
              <Title>3. Nội dung động (biến cá nhân hoá)</Title>
              <Description>
                Thêm các biến động như tên, ngày, số liệu... để cá nhân hoá nội
                dung cho từng người nhận.
              </Description>
            </Column>
            <RenderIf
              reference={props.fetchBroadcast.response}
              render={(broadcast) => (
                <Column gap={16}>
                  {props.form.data.maps.map((item, index) => {
                    const maps = data.parseSchema.map(
                      (map) => new Map(item.field, map)
                    )

                    const reference = broadcast.parseMap.find(
                      (map) => map.key === item.key
                    ) as unknown as Map
                    return (
                      <Row key={index} gap={8} itemsCenter>
                        <Row itemsCenter gap={8}>
                          <RenderIf
                            reference={
                              broadcast.process === BroadcastProcess.DRAFT
                            }
                            reverse={
                              <div className="pr-[8px]">
                                <Input
                                  label="Cột dữ liệu"
                                  silent
                                  value={upperFirstLetter(item.key)}
                                ></Input>
                              </div>
                            }
                            render={() => (
                              <Fragment>
                                <Row size={6} itemsCenter>
                                  <Dropdown
                                    validated={validateField(item.field)}
                                    error={Message.CAN_NOT_EMPTY}
                                    className="min-w-[256px]"
                                    label="Cột dữ liệu"
                                    items={maps}
                                    reference={reference}
                                    each={(item) => upperFirstLetter(item.key)}
                                    onChange={(map) =>
                                      onMap(map.field, map.key)
                                    }
                                  ></Dropdown>
                                </Row>
                              </Fragment>
                            )}
                          ></RenderIf>
                          <div className="flex-1 border border-dashed"></div>
                          <Description>điền vào mục</Description>
                          <Content>{item.field}</Content>
                        </Row>
                      </Row>
                    )
                  })}
                </Column>
              )}
            ></RenderIf>
          </Fragment>
        )}
      ></RenderIf>
    </Wrapper>
  )
}

export default MapField
