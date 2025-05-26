import RenderIf from "@/app/(components)/render-if"
import { concatPathName, RouteMap } from "@/utils/common"
import { useGet } from "@/utils/hooks"
import Phone from "../../components/phone"
import { useWithout } from "@/utils/functions"
import Button from "@/app/(components)/button"
import "./_.scss"

const MobileZaloNotificationService = () => {
  const without = useWithout()
  const fetchContent = useGet(
    concatPathName(RouteMap.ZALO_NOTIFICATION_SERVICE_PREVIEW, "hello")
  )

  return (
    <RenderIf
      reference={fetchContent.response}
      render={(content) => (
        <Button
          icon="icon/broadcast/mobile-preview.svg"
          onClick={() =>
            without.append(
              <Phone onExit={without.close}>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
              </Phone>
            )
          }
        >
          Di động
        </Button>
      )}
    ></RenderIf>
  )
}

export default MobileZaloNotificationService
