import { useEffectOnce, useGet } from "@/utils/hooks"
import { RouteMap, HubMethodName } from "@/utils/common"
import Sortable from "sortablejs"
import { KabanCategoryResponse } from "@/utils/interface"
import { useConnection } from "@/utils/functions"
import Row from "@/app/(components)/row"
import List from "./components/sub-task/List"
import Analyst from "./components/analyst"

const Task = () => {
  const connection = useConnection()
  const kabanCategory = useGet<KabanCategoryResponse[]>(
    RouteMap.KABAN_CATEGORIES,
    {
      initial: false,
    }
  )

  const createSortable = (id: string) => {
    const element = window.document.getElementById(id)
    if (!element) return

    Sortable.create(element, {
      animation: 320,
      swapThreshold: 1,
    })
  }

  useEffectOnce(() => {
    connection.effectOn(HubMethodName.KANBAN_CATEGORY, () =>
      kabanCategory.fetch({ silent: true })
    )

    kabanCategory.fetch().then((response) => {
      if (!response) return
      //
      response.forEach((item) =>
        setTimeout(() => createSortable(item.id), 1000)
      )
    })
  })
  return (
    <Row>
      <Analyst></Analyst>
      <List kabanCategory={kabanCategory} />
    </Row>
  )
}

export default Task
