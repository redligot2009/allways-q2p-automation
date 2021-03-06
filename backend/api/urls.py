from django.urls import include, path
from rest_framework import routers

from .views import QuotationViewSet

router = routers.DefaultRouter()
router.register('quotations',QuotationViewSet,basename='Quotation')

urlpatterns = [
    path('api/',include(router.urls)),
    path('api-auth/',include('rest_framework.urls',namespace='rest_framework')),
    
]