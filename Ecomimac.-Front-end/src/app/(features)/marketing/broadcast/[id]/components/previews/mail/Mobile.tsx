import { useWithout } from "@/utils/functions"
import Button from "@/app/(components)/button"
import Phone from "../components/phone"
import IFrame from "@/app/(components)/iframe"

interface IProps {
  htmlText: string
}

const MailMobile = (props: IProps) => {
  const without = useWithout()
  return (
    <Button
      icon="icon/broadcast/mobile-preview.svg"
      onClick={() =>
        without.append(
          <Phone onExit={without.close}>
            <IFrame html={props.htmlText}></IFrame>
          </Phone>
        )
      }
    >
      Di động
    </Button>
  )
}

export default MailMobile
