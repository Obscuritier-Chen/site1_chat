import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import public.routing
from whitenoise import WhiteNoise
from django.core.handlers.asgi import ASGIHandler
from django.contrib.staticfiles.handlers import ASGIStaticFilesHandler

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'site1.settings')

# 获取 ASGI 应用
django_asgi_app = get_asgi_application()

# 包装 ASGI 应用以使用 WhiteNoise
application = ProtocolTypeRouter({
    'http': ASGIStaticFilesHandler(django_asgi_app),
    'websocket': AuthMiddlewareStack(
        URLRouter(
            public.routing.websocket_urlpatterns
        )
    ),
})