import { resetDocument } from "../builder/documents/editor/EditorContext"
import { SAMPLES } from "../metadata"
import { TEditorConfiguration } from "../builder/documents/editor/core"
import { useConfirm } from "@/utils/functions"
import Title from "@/app/(components)/title"
import Column from "@/app/(components)/column"
import Row from "@/app/(components)/row"
import Description from "@/app/(components)/description"

const Sample = () => {
  const confirm = useConfirm()

  const onChangeDocument = (document: TEditorConfiguration) =>
    confirm(() => resetDocument(document))
  return (
    <Column gap={16}>
      <Column>
        <Title>Mẫu có sẵn</Title>
        <Description>
          Các template mẫu được dựng sẵn nhằm cung cấp mấu tiện lợi & nhanh
          chóng
        </Description>
      </Column>
      <ul className="flex flex-col gap-[8px]">
        {SAMPLES.map((item, index) => (
          <li
            key={index}
            className="hover:underline cursor-pointer"
            onClick={() => onChangeDocument(item.setting)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </Column>
  )
}

export default Sample
