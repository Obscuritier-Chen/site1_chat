青涩时期练手用的web项目
原生js + django + mysql
项目没有静态文件服务器 使用whitenoise提供静态文件 
## 依赖的库
pillow
djangorestframework
mysqlclient
channels
daphne
whitenoise
## 部署方法
### 1.下载库, mysql, 项目
### 2.为项目创建mysql database 并配置site1/setting.py
### 3.切换到项目根目录 

      //迁移数据库
      python manage.py makemigrations
      python manage.py migrate
      
      python manage.py collectstatic //每次更改静态文件都要进行一次
      daphne -u /tmp/daphne.sock site1.asgi:application //使用Daphne启动ASGI服务器, 由于使用了websocket 无法使用runserver启动服务器
//应该就好了吧

## 依赖的项目
### vditor 
[https://markdown.com.cn](https://markdown.com.cn)

The following software may be included in this product: vditor. A copy of the MIT License is included below:

MIT License
Copyright (c) 2019 B3log 开源, b3log.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
