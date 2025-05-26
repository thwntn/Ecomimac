import App from "./App"
import { ThemeProvider } from "@mui/material"
import theme from "./theme"
import { TEditorConfiguration } from "./documents/editor/core"

interface IProps {
  onChange: (document: TEditorConfiguration) => void
  value?: TEditorConfiguration
}

const Builder = (props: IProps) => {
  return (
    <ThemeProvider theme={theme}>
      <App onChange={props.onChange} value={props.value} />
    </ThemeProvider>
  )
}

export default Builder
