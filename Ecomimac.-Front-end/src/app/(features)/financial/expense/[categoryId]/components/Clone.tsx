import { useWithout } from "@/utils/functions"
import Popup from "@/app/(components)/popup"
import Button from "@/app/(components)/button"
import Column from "@/app/(components)/column"
import Calendar from "@/app/(components)/calendar"
import { RouteMap, concatPathName } from "@/utils/common"
import { RecordAndCounter, Validate, useForm, useGet, usePost } from "@/utils/hooks"
import { convert, OFF } from "@/app/(components)/common"
import { ExpenseCategoryResponse } from "@/utils/interface"
import Dropdown from "@/app/(components)/dropdown"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Character from "@/app/(components)/character"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"

export class CreateCloneForm {
  fromId: string
  toId: string
}

const validation: Validate<CreateCloneForm> = {
  fromId: (from: string) => from,
  toId: (to: string) => to,
}

const Clone = ({
  expenseCategoryId,
  onExit,
}: {
  expenseCategoryId: string
  onExit: VoidFunction
}) => {
  const create = usePost(
    concatPathName(RouteMap.EXPENSE_CATEGORY, RouteMap.CLONE)
  )
  const getCategory = useGet<RecordAndCounter<ExpenseCategoryResponse>>(
    RouteMap.EXPENSE_CATEGORY
  )
  const form = useForm<CreateCloneForm>(
    {
      toId: expenseCategoryId,
    },
    validation
  )

  const onCreate = () => {
    const status = form.validate.run()
    if (status === OFF) return

    create.request(form.data)
    onExit()
  }

  const isLoad = convert(!getCategory.response)
  return (
    <Popup
      onExit={onExit}
      trigger={
        <Button main icon="icon/expense-copy-light.svg" onClick={onCreate}>
          Sao chép
        </Button>
      }
      name="Sao chép danh mục"
      width={546}
      isLoad={isLoad}
    >
      <RenderIf
        reference={getCategory.response}
        render={(category) => (
          <Column gap={16}>
            <Dropdown
              onChange={(item) => form.append("fromId", item.id)}
              error="Không được để trống"
              label="Danh mục chi tiêu"
              items={category.data}
              validated={form.validate.get("fromId")}
              each={(item) => (
                <Row itemsCenter gap={8}>
                  <Character text={item.name}></Character>
                  <Column>
                    <Content>{item.name}</Content>
                    <Description lineClamp={1}>{item.description}</Description>
                  </Column>
                </Row>
              )}
              show={(item) => item.name}
            ></Dropdown>
          </Column>
        )}
      ></RenderIf>
    </Popup>
  )
}

export default Clone
