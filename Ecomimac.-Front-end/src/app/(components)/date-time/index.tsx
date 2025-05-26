import moment from "moment"
import themes from "./index.module.scss"
const FORMAT_DATE = "DD/MM/YYYY"
const FORMAT_TIME = "HH:mm:ss A"

const DateTime = ({ dateTime }: { dateTime: Date }) => {
  const time = moment(dateTime)
  return (
    <div className={themes.frame}>
      <div>{time.format(FORMAT_DATE)}</div>
      <div className={themes.description}>{time.format(FORMAT_TIME)}</div>
    </div>
  )
}

export default DateTime
