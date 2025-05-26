import Column from "@/app/(components)/column"
import Row from "@/app/(components)/row"
import Wrapper from "@/app/(components)/wrapper"
import Builder from "./editor/builder/main"
import Sample from "./editor/components/Sample"
import { useForm, useGet, usePatch, usePut } from "@/utils/hooks"
import { RouteMap, concatPathName } from "@/utils/common"
import { TEditorConfiguration } from "./editor/builder/documents/editor/core"
import { renderToStaticMarkup } from "@usewaypoint/email-builder"
import { useParams } from "next/navigation"
import Frame from "@/app/(components)/frame"
import Container from "@/app/(components)/container"
import Button from "@/app/(components)/button"
import { ContentResponse } from "@/utils/interface/Content"
import { useEffect } from "react"
import Wing from "@/app/(components)/wing"

interface IParams {
  [key: string]: string
  id: string
}

interface FormData extends ContentResponse {
  document: TEditorConfiguration
}

const Editor = () => {
  const params = useParams<IParams>()
  const form = useForm<FormData>()

  const updateContent = usePut(RouteMap.CONTENTS)
  const fetchContent = useGet<ContentResponse>(
    concatPathName(RouteMap.CONTENTS, params.id),
  )

  const updateHTMLContent = (document: TEditorConfiguration) => {
    const html = renderToStaticMarkup(document, { rootBlockId: "root" })

    const name: (keyof FormData)[] = ["text", "setup"]
    const data = [html, JSON.stringify(document)]

    name.forEach((_, index) =>
      form.append(name[index] as keyof FormData, data[index]),
    )
  }

  const onSave = () => updateContent.request(form.data)

  useEffect(() => {
    const key = "document"
    if (fetchContent.response === undefined) return

    form.set(fetchContent.response)
    form.append(key, JSON.parse(fetchContent.response.setup))
  }, [fetchContent.response])
  return (
    <Frame>
      <Row justifyBetween>
        <Container></Container>
        <Row size={0.1}>
          <Button main icon="icon/edit-light.svg" onClick={onSave}>
            Lưu nội dung
          </Button>
        </Row>
      </Row>

      <Row gap={24}>
        <Column size={10}>
          <Wrapper padding={0} className="overflow-hidden">
            <Wing></Wing>
            {/* <HTMLEditor /> */}
            {/* <Builder value={form.data.document} onChange={updateHTMLContent} /> */}
          </Wrapper>
        </Column>
        <Column size={2}>
          <Sample></Sample>
        </Column>
      </Row>
    </Frame>
  )
}

export default Editor
