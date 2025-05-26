import { CustomIconNames } from "@/app/(components)/common"
import Dropdown from "@/app/(components)/dropdown"
import Icon from "@/app/(components)/icon"
import Input from "@/app/(components)/input"
import Row from "@/app/(components)/row"
import { useDebouncedCallback } from "use-debounce"

export interface IFilter {
  name: string
  data: string
}

const Filter = ({
  filters,
  onSearch,
  onFilter,
  onReset,
}: {
  filters: IFilter[]
  onSearch?: (text: string) => void
  onFilter?: (item: IFilter) => void
  onReset?: () => void
}) => {
  const debounced = useDebouncedCallback(
    (text: string) => !onSearch || onSearch(text),
    500
  )
  return (
    <Row justifyBetween itemsCenter>
      <Row gap={16} size={6}>
        <Input
          onChange={(event) => debounced(event.target.value)}
          autoFocus
          className="min-w-[256px]"
          label="Tìm kiếm"
          placeholder="Tên, số điện thoại, ngày tạo, ..."
        ></Input>
        <div className="w-[256px]">
          <Dropdown
            label="Bộ lọc"
            items={filters}
            show={(item) => item.name}
            each={(item) => item.name}
            onChange={onFilter}
          ></Dropdown>
        </div>
      </Row>
      <Row size={0.1} gap={8}>
        <Icon
          dir={CustomIconNames.REFRESH}
          content="Khôi phục bộ lọc mặc định"
          onClick={onReset}
        />
      </Row>
    </Row>
  )
}

export default Filter
