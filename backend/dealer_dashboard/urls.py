from django.urls import path
from django.urls import path
from .views import DealerProductView, DealerOrderView, DealerPickupView, DealerProductDetailView, DealerProfileView, DealerRatesView

urlpatterns = [
    path('products/', DealerProductView.as_view(), name='dealer-products'),
    path('products/<int:pk>/', DealerProductDetailView.as_view(), name='dealer-product-detail'),
    path('profile/', DealerProfileView.as_view(), name='dealer-profile'),
    path('rates/', DealerRatesView.as_view(), name='dealer-rates'),
    path('orders/', DealerOrderView.as_view(), name='dealer-orders'),
    path('pickups/', DealerPickupView.as_view(), name='dealer-pickups'),
]
