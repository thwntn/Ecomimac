import { RouteMap, Helper, NotificationNames } from "@/utils/common"
import Column from "@/app/(components)/column"
import { CustomIconNames, ON, convert } from "@/app/(components)/common"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Icon from "@/app/(components)/icon"
import Image from "@/app/(components)/image"
import Popup from "@/app/(components)/popup"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import { Fetched, useGet } from "@/utils/hooks"
import { NotificationResponse } from "@/utils/interface/Notification"
import clsx from "clsx"

const MESSAGE_TYPE: any = {
  [NotificationNames.CREATED_EXPENSE_TRANSACTIONS]: "Tạo thành công giao dịch",
}

const Notification = ({ onExit }: { onExit: VoidFunction }) => {
  const notification = useGet<NotificationResponse[]>(RouteMap.NOTIFICATIONS)

  return (
    <Popup
      name="Thông báo"
      onExit={onExit}
      trigger={
        <Row size={0.1} itemsCenter gap={8}>
          <Icon dir={CustomIconNames.Setting} />
          <Icon dir={CustomIconNames.TICK_ALL} />
        </Row>
      }
      isLoad={convert(!notification.response)}
      width={564}
    >
      <RenderIf
        reference={notification.response}
        render={(notification) => (
          <ul>
            {notification.map((item, index) => (
              <li
                key={index}
                className={clsx("border-b border-dashed border-slate-200")}
              >
                <Row itemsCenter gap={16} className="py-[12px]">
                  <Image
                    className="rounded-full"
                    src={item.profile.avatar}
                    width={48}
                    height={48}
                  />
                  <Column>
                    <Content>
                      <b>{item.profile.name}</b> {MESSAGE_TYPE[item.type]}
                    </Content>
                    <Description>{Helper.Time.format(new Date())}</Description>
                  </Column>
                </Row>
              </li>
            ))}
          </ul>
        )}
      />
    </Popup>
  )
}

export default Notification
