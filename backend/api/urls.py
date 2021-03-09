from django.urls import include, path
from rest_framework import routers

from .views import QuotationViewSet

router = routers.DefaultRouter()
router.register(r'quotations',QuotationViewSet,basename='quotations')

urlpatterns = [
    path('api/',include(router.urls)),
    path('api-auth/',include('rest_framework.urls',namespace='rest_framework')),
    
]