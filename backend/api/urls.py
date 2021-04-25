from django.urls import include, path
from rest_framework_nested import routers

from .views import QuotationViewSet, QuotationItemViewSet
from .views import AccountViewSet
from .views import JobOrderViewSet
from .views import PaperViewSet, LaminationViewSet, BindingViewSet

# Set up the default router to route all the viewsets defined in views.py
router = routers.DefaultRouter()
# Register Quotation viewset with resulting url of 'api/quotations/...'
router.register(r'quotations',QuotationViewSet,basename='quotations')
# Register Account viewset with resulting url of 'api/accounts/...'
router.register(r'accounts',AccountViewSet,basename='accounts')
# Register JobOrder viewset with resulting url of 'api/joborders/...'
router.register(r'joborders',JobOrderViewSet,basename='joborders')
# Register project specfication related viewsets (Paper, Lamination, Binding)
router.register(r'papers',PaperViewSet,basename='papers')
router.register(r'laminations',LaminationViewSet,basename='laminations')
router.register(r'bindings',BindingViewSet,basename='bindings')

# Testing out nested routes for accessing / retrieving / updating / deleting Quotation Item objects.
quotation_items_router = routers.NestedSimpleRouter(router,r'quotations',lookup='quotation')
quotation_items_router.register(r'items',QuotationItemViewSet,basename='quotation-items')
# NOTE: Might remove in the future if no use is to be found for it

urlpatterns = [
    # "api/" is the root url of all API routes defined on the router (DefaultRouter).
    # Here we include all routes under it by including the router urls as a path in the urlpatterns.
    path('api/',include(router.urls)),
    # Include nested router for quotation items under each quotation. NOTE: Might remove in the future
    path('api/',include(quotation_items_router.urls)),
    # Include Djoser library's authentication routes
    path('auth/',include('djoser.urls')),
    # Include JWT routes under Djoser / Django Rest Framework Simple JWT libraries.
    path('auth/',include('djoser.urls.jwt')),
    # Include route for default authentication of browsable API
    path('api-auth/',include('rest_framework.urls',namespace='rest_framework')),
]