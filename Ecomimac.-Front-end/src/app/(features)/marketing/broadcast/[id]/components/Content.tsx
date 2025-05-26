import {
  BroadcastProcess,
  concatPathName,
  Message,
  RouteMap,
} from "@/utils/common"
import { Form, RecordAndCounter, useGet, usePatch } from "@/utils/hooks"
import { ContentResponse } from "@/utils/interface/Content"
import Column from "@/app/(components)/column"
import { convert } from "@/app/(components)/common"
import Description from "@/app/(components)/description"
import Dropdown from "@/app/(components)/dropdown"
import RenderIf from "@/app/(components)/render-if"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import { Fragment } from "react"
import { default as CustomContent } from "@/app/(components)/content"
import { FormData } from "../Setup"
import { useConfirm } from "@/utils/functions"
import Input from "@/app/(components)/input"

interface IProps {
  form: Form<FormData>
}

const Content = (props: IProps) => {
  const confirm = useConfirm()
  const fetchContent = useGet<RecordAndCounter<ContentResponse>>(
    RouteMap.CONTENTS
  )

  const patchUpdateContent = usePatch(concatPathName(RouteMap.BROADCASTS))

  const onChange = (content: ContentResponse) =>
    confirm(
      () => {
        const formdata = {
          contentId: content.id,
        }
        patchUpdateContent.request(formdata, {
          pathname: concatPathName(
            props.form.data.id,
            RouteMap.BROADCAST_UPDATE_CONTENT
          ),
        })
      },
      {
        title: Message.BROADCAST_UPDATE_CONTENT_TITLE,
        description: Message.BROADCAST_UPDATE_CONTENT_DESCRIPTION,
      }
    )

  const isLoad = convert(fetchContent.isWait === true)
  return (
    <Wrapper isLoad={isLoad}>
      <RenderIf
        reference={fetchContent.response}
        render={(contentResponse) => (
          <Fragment>
            <Column>
              <Title>2. Nội dung gửi đi</Title>
              <Description lineClamp={2}>
                Chọn nội dung tin nhắn sẽ được gửi đến người nhận trong chiến
                dịch.
              </Description>
            </Column>
            <RenderIf
              reference={props.form.data.process === BroadcastProcess.DRAFT}
              reverse={
                <RenderIf
                  reference={props.form.data.content}
                  render={(content) => (
                    <div className="pr-[8px]">
                      <Input
                        label="Mẫu tin nhắn"
                        silent
                        value={content.name}
                      ></Input>
                    </div>
                  )}
                />
              }
              render={() => (
                <Dropdown
                  label="Mẫu tin nhắn"
                  items={contentResponse.data}
                  reference={props.form.data.content}
                  onChange={(item) => onChange(item)}
                  show={(item) => item.name}
                  each={(item) => (
                    <Column>
                      <CustomContent lineClamp={1}>{item.name}</CustomContent>
                      <Description lineClamp={1}>
                        {item.description}
                      </Description>
                    </Column>
                  )}
                ></Dropdown>
              )}
            ></RenderIf>
          </Fragment>
        )}
      ></RenderIf>
    </Wrapper>
  )
}

export default Content
