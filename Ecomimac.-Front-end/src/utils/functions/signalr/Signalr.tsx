import { HubMethodName } from "@/utils/common"
import * as Signalr from "@microsoft/signalr"

class Initialize {
  constructor(public connectId: string) {}
}

const hubConnection = new Signalr.HubConnectionBuilder()
  .withUrl(String(process.env.NEXT_PUBLIC_BACKEND))
  .build()

class Connection {
  constructor(
    public connection: Signalr.HubConnection,
    public start: () => Promise<void>,
    public invoke: (hubMethodName: string, data: object) => void,
    public connect: (connectId: string) => Promise<void>,
    public effectOn: (
      hubMethodName: string,
      cb: (data: any) => void
    ) => VoidFunction
  ) {}
}

export const useConnection = function () {
  /**
   * Listen event on connection & return clean function
   * @description
   * @param hubMethodName
   * @param cb
   * @returns
   */
  const effectOn = (hubMethodName: string, cb: (data: any) => void) => {
    hubConnection && hubConnection.on(hubMethodName, cb)
    return () => void (hubConnection && hubConnection.off(hubMethodName))
  }

  /**
   * Invoke data from client
   * @description
   * @param hubMethodName
   * @param data
   * @returns
   */
  const invoke = (hubMethodName: string, data: object) =>
    hubConnection && hubConnection.invoke(hubMethodName, data)

  /**
   * Initial connection to server
   * @description
   * @param connectId
   * @returns
   */
  const start = () => hubConnection.start()

  /**
   * Authorize & connect with Id
   * @description
   * @param connectId
   * @returns
   */
  const connect = (connectId: string) =>
    hubConnection.invoke(HubMethodName.INITIALIZE, new Initialize(connectId))

  return new Connection(hubConnection, start, invoke, connect, effectOn)
}
