import Row from "@/app/(components)/row"
import List from "./components/List"
import Message from "./components/Message"

const Chat = () => {
  return (
    <Row className="bg-white">
      <List></List>
      <Message></Message>
    </Row>
  )
}

export default Chat
