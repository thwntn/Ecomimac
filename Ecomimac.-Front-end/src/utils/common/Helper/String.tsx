const PREFIX_CONCAT_URL = "/"

export const concatPathName = (...args: (string | undefined)[]) =>
  args.join(PREFIX_CONCAT_URL)

export const findMap = (text: string): string[] => {
  const matches = text.match(/{{\s*[\w.]+\s*}}/g)
  if (!matches) return []
  return matches
}

export const upperFirstLetter = (text: string | undefined) => {
  if (text === undefined) return String().concat()

  try {
    return text.charAt(0).toUpperCase() + text.slice(1)
  } catch {
    return text
  }
}

export const formatNumber = (number: number | string) => {
  return Number(number).toLocaleString("vi-VN")
}
