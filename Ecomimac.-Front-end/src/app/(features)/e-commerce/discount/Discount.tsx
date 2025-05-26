import Frame from "@/app/(components)/frame"
import List from "./components/List"
import Row from "@/app/(components)/row"
import Container from "@/app/(components)/container"
import { useWithout } from "@/utils/functions"
import Button from "@/app/(components)/button"
import CreateUpdate from "./components/create-update"
import Counter from "./components/Counter"
import Column from "@/app/(components)/column"
import Input from "@/app/(components)/input"
import Dropdown from "@/app/(components)/dropdown"
import Icon from "@/app/(components)/icon"
import { Fragment } from "react"
import RenderIf from "@/app/(components)/render-if"
import Group from "@/app/(components)/group"
import { discountTypeSelectOptions } from "./components/_meta"
import { RouteMap } from "@/utils/common"
import { QueryOptions, RecordAndCounter, useGet } from "@/utils/hooks"
import { DiscountResponse } from "@/utils/interface"
import Line from "@/app/(components)/line"

const Discount = () => {
  const without = useWithout()
  const getDiscount = useGet<RecordAndCounter<DiscountResponse>>(
    RouteMap.DISCOUNT,
    {
      params: new QueryOptions(),
    }
  )
  return (
    <Frame>
      <Row justifyBetween>
        <Container></Container>
        <Button
          icon="icon/create-light.svg"
          main
          onClick={() =>
            without.append(
              <CreateUpdate onExit={without.close}></CreateUpdate>
            )
          }
        >
          Tạo mã giảm giá
        </Button>
      </Row>
      <Column gap={40}>
        <Counter></Counter>
        <Line name="Danh sách mã giảm giá"></Line>
        <Row justifyBetween>
          <Row gap={16} size={6}>
            <Input
              autoFocus
              className="min-w-[256px]"
              label="Tìm kiếm"
              placeholder="Tên, số điện thoại, ngày tạo, ..."
            ></Input>
            <div className="w-[356px]">
              <Dropdown
                label="Bộ lọc"
                items={[
                  undefined,
                  {
                    label: "Sắp xếp tăng dần",
                    cb: () => {},
                  },
                  {
                    label: "Sắp xếp giảm dần",
                    cb: () => {},
                  },
                ]}
                show={(item) => (item ? item.label : "Chọn bộ lọc")}
                each={(item) => (
                  <Fragment>
                    <RenderIf
                      reference={item}
                      render={(item) => item.label}
                    ></RenderIf>
                    <RenderIf
                      reference={item === undefined}
                      render={() => (
                        <Group
                          onChange={(discountTypeSelectOption) =>
                            getDiscount.fetch({
                              params: {
                                discountType: discountTypeSelectOption.value,
                              },
                            })
                          }
                          items={discountTypeSelectOptions.map(
                            (discountTypeSelectOption) => ({
                              label: discountTypeSelectOption.name,
                              value: discountTypeSelectOption.enum,
                            })
                          )}
                        ></Group>
                      )}
                    ></RenderIf>
                  </Fragment>
                )}
              ></Dropdown>
            </div>
          </Row>
          <Row size={0.1}>
            <Icon dir="icon/setting.svg"></Icon>
          </Row>
        </Row>
      </Column>
      <List getDiscount={getDiscount} />
    </Frame>
  )
}

export default Discount
