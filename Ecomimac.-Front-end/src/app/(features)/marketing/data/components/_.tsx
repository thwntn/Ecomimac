import { DataType } from "@/utils/common"

export const typeDataSelections = [
  {
    name: "Nhập từ tập tin Excel",
    enum: DataType.IMPORT_FROM_EXCEL,
  },
  {
    name: "Lấy từ danh sách khách hàng",
    enum: DataType.FROM_CUSTOMER,
  },
]
