import DateTime from "../date-time"
import Image from "../image"
import Row from "../row"
import themes from "./index.module.scss"

const TimeRange = ({ fromDate, toDate }: { fromDate: Date; toDate: Date }) => {
  return (
    <div className={themes.frame}>
      <Row gap={8} itemsCenter>
        <Image dir="custom/start-time.svg" width={16} height={16}></Image>
        <DateTime dateTime={new Date(fromDate)}></DateTime>
        <Image dir="custom/end-time.svg" width={16} height={16}></Image>
        <DateTime dateTime={new Date(toDate)}></DateTime>
      </Row>
    </div>
  )
}

export default TimeRange
