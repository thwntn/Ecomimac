import StudioEditor from "@grapesjs/studio-sdk/react"
import "@grapesjs/studio-sdk/style"
import "./index.scss"

// ...
const Wing = () => {
  return (
    <main className="h-[100vh]">
      <StudioEditor
        height={"100vh"}
        options={{
          theme: "light",
          // ...
          licenseKey:
            "ece5da0a4a2d490b879a2012a27684f3cfa225ad7500471ab97b55f990641c2e",
          project: {
            type: "web",
            // The default project to use for new projects
            default: {
              pages: [
                { name: "Home", component: "<h1>Home page</h1>" },
                { name: "About", component: "<h1>About page</h1>" },
                { name: "Contact", component: "<h1>Contact page</h1>" },
              ],
            },
          },
        }}
      />
    </main>
  )
}

export default Wing
