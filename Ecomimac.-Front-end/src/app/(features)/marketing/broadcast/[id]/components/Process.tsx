import { BroadcastProcess, Helper } from "@/utils/common"
import { Fetched } from "@/utils/hooks"
import { BroadcastResponse } from "@/utils/interface/Broadcast"
import { default as CustomProcess } from "@/app/(components)/process"
import RenderIf from "@/app/(components)/render-if"
import Title from "@/app/(components)/title"
import Wrapper from "@/app/(components)/wrapper"
import { convert } from "@/app/(components)/common"

interface IProps {
  fetchBroadcast: Fetched<BroadcastResponse>
}

const Process = (props: IProps) => {
  const isLoad = convert(props.fetchBroadcast.isWait === true)
  return (
    <Wrapper isLoad={isLoad}>
      <Title className="font-bold text-red-400">
        *Truyên thông sẽ bị khoá, không thể chỉnh sửa trong quá trình chạy
      </Title>
      <RenderIf
        reference={props.fetchBroadcast.response}
        render={(broadcast) => (
          <CustomProcess
            items={[
              {
                name: "Khởi tạo",
                color: "#9e9e9e",
                description: "Thiết lập chiến dịch gửi tin",
                time: Helper.Time.format(Helper.Time.now()),
                animation: broadcast.process === BroadcastProcess.DRAFT,
              },
              {
                name: "Kích hoạt",
                color: "#00c44f",
                description:
                  "Hệ thống đưa dữ liệu vào hàng đợi và bắt đầu gửi tin",
                time: Helper.Time.format(Helper.Time.now()),
              },
              {
                name: "Gửi tin",
                description:
                  "Lấy dữ liệu & bắt đầu chạy chiến dịch (Không thể huỷ)",
                time: Helper.Time.format(Helper.Time.now()),
                animation: broadcast.process === BroadcastProcess.SENDING,
              },
              {
                name: "Lưu lịch sử",
                color: "#f00",
                description:
                  "Lấy dữ liệu & bắt đầu chạy chiến dịch (Không thể huỷ)",
                time: Helper.Time.format(Helper.Time.now()),
              },
            ]}
          ></CustomProcess>
        )}
      ></RenderIf>
    </Wrapper>
  )
}

export default Process
