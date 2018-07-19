"""kiestze_django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from kiestze import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', views.index),
    path('lijst', views.lijst),
    path('detail', views.detail),

    path('query', views.demoquery),
    path('get_politieker_data', views.get_politieker_data),
    path('git_pull', views.git_pull),
]

#url(r'^static/(?P<path>.*)$', 'django.views.static.serve',{'document_root':"path/to/your/static/folder"}),
#add this to urlpatterns variable
#urlpatterns += staticfiles_urlpatterns()