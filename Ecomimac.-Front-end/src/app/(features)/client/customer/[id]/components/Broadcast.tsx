import Line from "@/app/(components)/line"
import List from "@/app/(components)/list"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import { Fragment } from "react"

const Broadcast = () => {
  return (
    <Wrapper>
      <Title>Lịch sử gửi tin</Title>
      <List
        column={["Tên chiến dịch", "Thời gian gửi", "Người gửi", "Trạng thái"]}
        fit
        items={[]}
        each={(item) => <Fragment></Fragment>}
      ></List>
    </Wrapper>
  )
}

export default Broadcast
