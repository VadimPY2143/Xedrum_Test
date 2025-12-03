from django.urls import path
from .views import Users

urlpatterns = [
    path('', Users.as_view(), name='users-list'),
    path('<int:user_id>/', Users.as_view(), name='users-detail'),
]
