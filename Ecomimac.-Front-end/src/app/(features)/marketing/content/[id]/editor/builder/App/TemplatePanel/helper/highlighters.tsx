import hljs from "highlight.js"
import jsonHighlighter from "highlight.js/lib/languages/json"
import xmlHighlighter from "highlight.js/lib/languages/xml"

hljs.registerLanguage("json", jsonHighlighter)
hljs.registerLanguage("html", xmlHighlighter)

export async function html(value: string): Promise<string> {
  return value
}
