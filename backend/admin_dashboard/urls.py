from django.urls import path
from .views import UserListView, DealerListView, AdminStatsView, RatesView, MarketplaceView, AdminProductsView, AdminProductDetailView

urlpatterns = [
    path('users/', UserListView.as_view(), name='admin-users'),
    path('dealers/', DealerListView.as_view(), name='admin-dealers'),
    path('stats/', AdminStatsView.as_view(), name='admin-stats'),
    path('rates/', RatesView.as_view(), name='admin-rates'),
    path('products/', AdminProductsView.as_view(), name='admin-products'),
    path('products/<str:pk>/', AdminProductDetailView.as_view(), name='admin-product-detail'),
    path('marketplace/', MarketplaceView.as_view(), name='admin-marketplace'),
]
