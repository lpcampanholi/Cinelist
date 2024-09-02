from django.urls import path
from .views import RegisterAPI, LoginAPI,  LogoutAPI, check_auth_status

urlpatterns = [
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', LogoutAPI.as_view(), name='logout'),
    path('check-auth/', check_auth_status, name='check_auth'),
]
