import { RouteMap } from "@/utils/common"
import { QueryOptions, RecordAndCounter, useGet } from "@/utils/hooks"
import List from "./components/List"
import Counter from "./components/Counter"
import Frame from "@/app/(components)/frame"
import { CustomerResponse } from "@/utils/interface"
import Row from "@/app/(components)/row"
import Container from "@/app/(components)/container"
import Button from "@/app/(components)/button"
import { useWithout } from "@/utils/functions"
import Create from "./components/Create_Update"
import Input from "@/app/(components)/input"
import Dropdown from "@/app/(components)/dropdown"
import Icon from "@/app/(components)/icon"
import Column from "@/app/(components)/column"
import Line from "@/app/(components)/line"

const Customer = () => {
  const without = useWithout()
  const getCustomer = useGet<RecordAndCounter<CustomerResponse>>(
    RouteMap.CUSTOMER,
    { params: new QueryOptions() }
  )
  return (
    <Row>
      <Frame>
        <Row justifyBetween itemsCenter>
          <Container></Container>
          <Button
            icon="icon/create-light.svg"
            main
            onClick={() =>
              without.append(<Create onExit={without.close}></Create>)
            }
          >
            Thêm khách hàng
          </Button>
        </Row>
        <Column gap={40}>
          <Counter customer={getCustomer} />
          <Row justifyBetween>
            <Row gap={16} size={6}>
              <Input
                autoFocus
                className="min-w-[256px]"
                label="Tìm kiếm"
                placeholder="Tên, số điện thoại, ngày tạo, ..."
              ></Input>
              <div className="w-[256px]">
                <Dropdown
                  label="Bộ lọc"
                  items={[]}
                  show={(item) => String()}
                  each={(item) => item}
                ></Dropdown>
              </div>
            </Row>
            <Row size={0.1}>
              <Icon dir="icon/setting.svg"></Icon>
            </Row>
          </Row>
        </Column>
        <Line name="Danh sách khách hàng"></Line>
        <Row padding={8}>
          <List getCustomer={getCustomer} />
        </Row>
      </Frame>
    </Row>
  )
}

export default Customer
