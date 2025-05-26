import { useGet } from "@/utils/hooks"
import { RouteMap, ExpenseTransactionCounterNames, Helper } from "@/utils/common"
import { Fragment } from "react"
import Row from "@/app/(components)/row"
import Wrapper from "@/app/(components)/wrapper"
import { convert } from "@/app/(components)/common"
import Title from "@/app/(components)/title"
import Content from "@/app/(components)/content"
import Image from "@/app/(components)/image"
import Column from "@/app/(components)/column"
import Reference from "@/app/(components)/reference"
import More from "./More"
import { ExpenseTransactionResponse } from "@/utils/interface"
import { useWithout } from "@/utils/functions"
import RenderIf from "@/app/(components)/render-if"
import Character from "@/app/(components)/character"

const TOP_TRANSACTION = 3

export interface CounterElement {
  totalCost: number
  items: ExpenseTransactionResponse[]
  expenseTransactionCounterNames: ExpenseTransactionCounterNames
}

const LABEL = {
  [ExpenseTransactionCounterNames.TODAY]: "Hôm nay",
  [ExpenseTransactionCounterNames.WEEK]: "Gần đây",
  [ExpenseTransactionCounterNames.MONTH]: "Giao dịch trong kỳ",
}

const Counter = ({ categoryId }: { categoryId: string }) => {
  const without = useWithout()
  const counter = useGet<CounterElement[]>(
    `${RouteMap.EXPENSE_TRANSACTIONS}/${RouteMap.COUNTER}/${categoryId}`
  )

  return (
    <Row gap={16}>
      {(counter.response || Array.from({ length: 3 })).map((item, index) => {
        const getTransaction = () => {
          if (item === undefined) return []

          let items = [...item.items]
          items.length = TOP_TRANSACTION
          items = items.filter((item) => item)
          return items
        }
        return (
          <Row size={4} key={index}>
            <Wrapper isLoad={convert(!counter.response)} key={index} gap={8}>
              <RenderIf
                reference={counter.response}
                render={() => {
                  const transaction = getTransaction()
                  return (
                    <Fragment>
                      <Row className="justify-between pb-[8px]">
                        <Title>
                          {LABEL[item.expenseTransactionCounterNames]}
                        </Title>
                        <RenderIf
                          reference={transaction.length > 0}
                          render={() => (
                            <div className="text-[12px]">
                              <Content>Tổng chi phí:</Content>
                              <Content className="text-[14px] font-bold">
                                {Helper.Currency.vietNamDong(item.totalCost)}
                              </Content>
                            </div>
                          )}
                        ></RenderIf>
                      </Row>
                      <div className="flex flex-col gap-[12px] relative">
                        <ul className="flex flex-col gap-[6px]">
                          {transaction.map((item, index) => (
                            <li
                              key={index}
                              className="flex py-[4px] justify-between items-center"
                            >
                              <div className="flex gap-[16px] items-center">
                                <Content className="font-bold">
                                  {index + 1}
                                </Content>
                                <Row gap={8} itemsCenter>
                                  <Character
                                    size={32}
                                    text={item.name}
                                  ></Character>
                                  <Column>
                                    <Content className="line-clamp-1">
                                      {item.name}
                                    </Content>
                                    <Content className="text-[10px] !line-clamp-1 text-gray-400">
                                      {item.description}
                                    </Content>
                                  </Column>
                                </Row>
                              </div>
                              <Content className="whitespace-nowrap">
                                {Helper.Currency.vietNamDong(item.amount)}
                              </Content>
                            </li>
                          ))}

                          <RenderIf
                            reference={item.items.length === 0}
                            render={() => <li>Không có giao dịch</li>}
                          />

                          <RenderIf
                            reference={
                              item.items.length > 0 &&
                              item.items.length > TOP_TRANSACTION
                            }
                            render={() => (
                              <li className="pt-[8px]">
                                <Row className="justify-end">
                                  <Reference
                                    content="Xem thêm"
                                    onClick={() =>
                                      without.append(
                                        <More
                                          items={item.items}
                                          name={
                                            LABEL[
                                              item
                                                .expenseTransactionCounterNames
                                            ]
                                          }
                                          onExit={without.close}
                                        ></More>
                                      )
                                    }
                                  ></Reference>
                                </Row>
                              </li>
                            )}
                          />
                        </ul>
                      </div>
                    </Fragment>
                  )
                }}
              />
            </Wrapper>
          </Row>
        )
      })}
    </Row>
  )
}

export default Counter
