export const VNCurrency = (number: number | string): string => {
  const value = Number(number)
    .toFixed(1)
    .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

  return value.slice(0, value.length - 2) + " đ"
}
