from django.urls import path, include
from .views import *

urlpatterns = [
    path('',index,name='index'),
    path('snakysrufs/',include('snakysrufs.urls')),
    path('tetris/',include('tetris.urls'))
]