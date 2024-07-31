import json
from channels.generic.websocket import AsyncWebsocketConsumer


class PublicChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = 'public_chat'

        await self.channel_layer.group_add(  # 将用户添加进组
            self.group_name,
            self.channel_name
        )

        await self.accept()  # 服务器接受socket

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        content = text_data_json['content']
        username = text_data_json['username']
        time = text_data_json['time']

        await self.channel_layer.group_send(  # 将消息发送给组
            self.group_name,
            {
                'type': 'chat_massage',  # 消息类型
                'username': username,
                'time': time,
                'content': content,
            }
        )

    async def chat_massage(self, event):  # 处理从组发来的消息
        content = event['content']
        username = event['username']
        time = event['time']

        await self.send(text_data=json.dumps({  # 发送给websocket (客户端)
            'username': username,
            'time': time,
            'content': content,
        }))
