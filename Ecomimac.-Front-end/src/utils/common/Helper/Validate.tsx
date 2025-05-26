export namespace Regex {
  //    Summary:A
  //          Validate email
  export const email = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (email === undefined) return false
    return regex.test(email)
  }

  export const domain = (domain: string | undefined) => {
    if (domain === undefined) return false
    const regex =
      /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    return regex.test(domain)
  }

  export const mailgunFrom = (from: string | undefined) => {
    if (from === undefined) return false
    const regex = /^[\w\s]+ <[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}>$/
    return regex.test(from)
  }
}
