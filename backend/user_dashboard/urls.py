from django.urls import path
from .views import UserPickupView, UserEarningsView, UserOrdersView

urlpatterns = [
    path('pickups/', UserPickupView.as_view(), name='user-pickups'),
    path('orders/', UserOrdersView.as_view(), name='user-orders'),
    path('earnings/', UserEarningsView.as_view(), name='user-earnings'),
]
