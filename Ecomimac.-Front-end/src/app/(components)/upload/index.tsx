import { CustomIconNames, OFF, Status } from "../common"
import Image from "../image"
import RenderIf from "../render-if"
import themes from "./index.module.scss"

interface IProps {
  onChange?: (files: File[]) => void
  accept?: string[]
  validated?: Status
  error?: string
}

const Upload = (props: IProps) => {
  const onChange = function (list: FileList | []) {
    if (props.onChange === undefined) return
    const files = Array.from(list)

    if (props.accept === undefined) {
      props.onChange(files)
      return
    }

    props.onChange(
      files.filter(
        (item) =>
          props.accept &&
          props.accept.some((extension) =>
            item.name
              .toLocaleLowerCase()
              .includes(extension.toLocaleLowerCase())
          )
      )
    )
  }
  return (
    <div className={themes.frame}>
      <div className={themes.wrapper}>
        <Image dir={CustomIconNames.UPLOAD} width={32} height={32}></Image>
        <span className={themes.text}>Kéo thả tệp tin vào đây</span>
        <input
          multiple
          type="file"
          className={themes.input}
          onChange={(event) =>
            onChange(event.target.files ? event.target.files : [])
          }
        />
      </div>

      <RenderIf
        reference={props.validated === OFF && props.error}
        render={() => <span className={themes.message}>{props.error}</span>}
      ></RenderIf>
    </div>
  )
}

export default Upload
