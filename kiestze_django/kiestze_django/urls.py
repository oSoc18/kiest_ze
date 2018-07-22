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
from django.urls import include, path
from kiestze import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('allauth/', include('allauth.urls')),

    path('', views.index),
    path('lijst', views.lijst),
    path('detail', views.detail),

    path('query', views.demoquery),
    path('get_politieker_data', views.get_politieker_data),
    path('git_pull', views.git_pull),
    path('get_all_partij', views.get_all_partij),
    path('get_politiekers', views.get_politiekers),
    path('get_all_politieker_partij_link_van_gemeente', views.get_all_politieker_partij_link_van_gemeente),
    path('get_all_gemeentes', views.get_all_gemeentes),
]