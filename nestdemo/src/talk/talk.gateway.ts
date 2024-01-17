import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import WebSocket, { Server } from 'ws';

// 指定端口时，端口不能和 HTTP 同一个。。
// @WebSocketGateway(3001, {
//   transports: ['websocket'],
// })
@WebSocketGateway({
  // namespace: 'talk',
  cors: {
    origin: '*',
    credentials: true,
  },
  allowEIO3: true,
  // transports: ['websocket'],
})
export class TalkGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('TalkGateway init.');
  }

  handleConnection(client: WebSocket, ...args: any[]) {
    // client.send('open'); // 因为使用socket.io 所以不太适合使用更底层的 send，数据格式不一致。
    console.log(
      // Object.getPrototypeOf(client),
      // args.map((i) => Object.getPrototypeOf(i)),
      `client: ${client} connect. ${args.length} argc.`,
    );
    const timer = setInterval(() => {
      console.log('tick');
      if (client.readyState != client.OPEN) {
        clearInterval(timer);
      }
      // client.emit('tick', { data: timer }); // 官方文档的 emit 示例不可用，只能调用 send（可能源码改了，官方示例没改）
      client.send('tick');
    }, 4000);
  }

  handleDisconnect(client: WebSocket) {
    // client.send('close'); // 因为使用socket.io 所以不太适合使用更底层的 send，数据格式不一致。
    console.log(`client: ${client} disconnect.`);
  }

  // 方法名字随意 官方示例多以 handleMessage onEvent 为例。
  @SubscribeMessage('talk')
  handleTalk(
    @MessageBody() payload: string,
    @ConnectedSocket() client: WebSocket, // 这个实例缺少很多信息（很多字段都是空的）
  ): WsResponse<unknown> {
    // 打印出来的字段价值都不大。
    // console.log('handle', Object.getPrototypeOf(client), client._socket);
    return {
      event: 'talked', // 发送到前端的事件名。
      data: `${client.readyState}, payload: ${payload}`,
    };
  }

  @SubscribeMessage('say')
  handleSay(
    @MessageBody() payload: string,
    @ConnectedSocket() client: WebSocket, // 这个实例缺少很多信息（很多字段都是空的）
  ): WsResponse<unknown> {
    // client.emit('tick', { data: 'on say' }); // 不可用

    return {
      event: 'said',
      data: `on said. ${payload}, ${client.readyState}`,
    };
  }
}
