import RenderIf from "@/app/(components)/render-if"
import { concatPathName, RouteMap } from "@/utils/common"
import { useGet } from "@/utils/hooks"

const NormalZaloNotificationService = () => {
  const fetchContent = useGet(
    concatPathName(RouteMap.ZALO_NOTIFICATION_SERVICE_PREVIEW, "hello")
  )

  return (
    <div className="bg-slate-100 relative py-[24px] flex items-center justify-center rounded-[12px] border border-gray-100">
      <RenderIf
        reference={fetchContent.response}
        render={(content) => (
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        )}
      ></RenderIf>
    </div>
  )
}

export default NormalZaloNotificationService
