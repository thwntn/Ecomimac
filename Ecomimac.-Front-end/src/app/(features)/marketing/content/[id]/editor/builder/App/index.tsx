import React, { Fragment, useEffect } from "react"

import { setDocument, useDocument } from "../documents/editor/EditorContext"

import InspectorDrawer from "./InspectorDrawer"
import TemplatePanel from "./TemplatePanel"
import { TEditorConfiguration } from "../documents/editor/core"

interface IProps {
  onChange: (document: TEditorConfiguration) => void
  value?: TEditorConfiguration
}

export default function App(props: IProps) {
  const document = useDocument()
  //
  //  Summary:
  //      On Change Document
  //
  //  Returns:
  //
  useEffect(() => props.onChange && props.onChange(document), [document])
  //
  //  Summary:
  //      Setup initial value
  //
  //  Returns:
  //
  useEffect(() => void (props.value && setDocument(props.value)), [props.value])
  return (
    <Fragment>
      <div className="flex ">
        <TemplatePanel />
        <InspectorDrawer />
      </div>
    </Fragment>
  )
}
