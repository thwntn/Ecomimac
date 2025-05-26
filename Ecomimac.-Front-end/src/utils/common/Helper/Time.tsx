export const rangeTimeMonth = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  //
  return [new Date(year, month, 2), new Date(year, month + 1, 0)]
}
