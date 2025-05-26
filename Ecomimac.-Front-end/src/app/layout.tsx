import Icon from "../../public/asset/icon/main.logo.svg"
import App from "./app"
const REL = "shortcut icon"
const LANG = "en"

export default function Root({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={LANG}>
      <head>
        <title>Spentico</title>
        <link rel={REL} href={Icon.src}></link>
      </head>
      <body>
        <App>{children}</App>
      </body>
    </html>
  )
}
