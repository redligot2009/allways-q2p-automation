from django.urls import include, path
from rest_framework_nested import routers

from .views import QuotationViewSet, QuotationItemViewSet
from .views import AccountViewSet

router = routers.DefaultRouter()
router.register(r'quotations',QuotationViewSet,basename='quotations')
router.register(r'accounts',AccountViewSet,basename='accounts')

quotation_items_router = routers.NestedSimpleRouter(router,r'quotations',lookup='quotation')
quotation_items_router.register(r'items',QuotationItemViewSet,basename='quotation-items')

urlpatterns = [
    path('api/',include(router.urls)),
    path('api/',include(quotation_items_router.urls)),
    path('api/',include('djoser.urls')),
    path('api/',include('djoser.urls.authtoken')),
    path('api-auth/',include('rest_framework.urls',namespace='rest_framework')),
]