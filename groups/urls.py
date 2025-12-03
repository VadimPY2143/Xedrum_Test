from django.urls import path
from .views import GroupsView

urlpatterns = [
    path('', GroupsView.as_view(), name='groups-list'),
    path('<int:group_id>/', GroupsView.as_view(), name='groups-detail'),
]
