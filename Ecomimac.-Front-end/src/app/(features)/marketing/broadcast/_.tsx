export const tags = [
  {
    name: "Lọc có điều kiện",
    color: "#a3a571",
    profileId: "64868520-1796-4b4d-a637-3ba125df3045",
    profile: null,
    customerTags: null,
    id: "359f1869-5190-4803-861d-c0df107fc06f",
    created: "2025-04-30T10:05:47.307036",
    updated: "2025-04-30T10:05:47.307036",
    deleted: null,
    deleteBy: null,
  },
  {
    name: "Dữ liệu mới",
    color: "#49252f",
    profileId: "f02b48ce-a3c3-4c47-87ec-c13c2e01292f",
    profile: null,
    customerTags: null,
    id: "d6d818f9-b1cc-442f-9543-8fb6a665806b",
    created: "2025-04-30T10:05:47.307296",
    updated: "2025-04-30T10:05:47.307296",
    deleted: null,
    deleteBy: null,
  },
  {
    name: "Hệ thống cập nhật",
    color: "#fc071c",
    profileId: "590d61a6-8ba7-4afe-8485-f52b4a053206",
    profile: null,
    customerTags: null,
    id: "2a064d3d-da1d-483d-be5d-d367dcf4d76d",
    created: "2025-04-30T10:05:47.308041",
    updated: "2025-04-30T10:05:47.308041",
    deleted: null,
    deleteBy: null,
  },
]

export function shuffleArray(array: typeof tags) {
  const result = [...array] // tạo bản sao để không làm thay đổi mảng gốc
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)) // chọn vị trí ngẫu nhiên
    ;[result[i], result[j]] = [result[j], result[i]] // hoán đổi
  }
  return result
}
