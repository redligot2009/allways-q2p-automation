from django.shortcuts import render
import django_filters
from rest_framework import viewsets
from django_filters import rest_framework as filters
from django.http import HttpResponse, HttpResponseNotFound
import os
from django.views import View

from .models import Account
from .models import Invoice, JobOrder
from .models import PrintingProcess
from .models import Lamination, DieCut, Binding, Paper, ProductionConstants
from .models import Quotation, QuotationItem, ExtraPlate, Product
from .serializers import AccountListSerializer, AccountDetailSerializer, AccountUpdateSerializer
from .serializers import InvoiceSerializer, ProductSerializer
from .serializers import PaperSerializer, PrintingProcessSerializer
from .serializers import JobOrderSerializer, JobOrderDetailSerializer, JobOrderListSerializer
from .serializers import LaminationSerializer, DieCutSerializer, BindingSerializer
from .serializers import ProductionConstantsSerializer, ExtraPlateSerializer
from .serializers import QuotationItemSerializer, QuotationItemListSerializer, QuotationItemUpdateSerializer
from .serializers import QuotationListSerializer, QuotationDetailSerializer, QuotationUpdateSerializer, QuotationSerializer

import logging

# SERVING REACT FRONTEND

class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='application/javascript')
        else:
            return HttpResponseNotFound()

#######################################
### USER / ACCOUNT RELATED VIEWSETS ###
#######################################

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    lookup_field = 'user__username'
    filterset_fields=('job_position',)
    
    def get_serializer_class(self):
        if(self.action=='retrieve'):
            return AccountDetailSerializer
        elif(self.action=='update' or self.action=='create'):
            return AccountUpdateSerializer
        else:
            return AccountListSerializer

##################################
### QUOTATION RELATED VIEWSETS ###
##################################

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
class PaperViewSet(viewsets.ModelViewSet):
    queryset = Paper.objects.all()
    serializer_class = PaperSerializer

class PrintingProcessViewSet(viewsets.ModelViewSet):
    queryset = PrintingProcess.objects.all()
    serializer_class = PrintingProcessSerializer

class LaminationViewSet(viewsets.ModelViewSet):
    queryset = Lamination.objects.all()
    serializer_class = LaminationSerializer

class DieCutViewSet(viewsets.ModelViewSet):
    queryset = Paper.objects.all()
    serializer_class = DieCutSerializer

class BindingViewSet(viewsets.ModelViewSet):
    queryset = Binding.objects.all()
    serializer_class = BindingSerializer

class ProductionConstantsViewSet(viewsets.ModelViewSet):
    queryset = ProductionConstants.objects.all()
    serializer_class = ProductionConstantsSerializer

class PlateViewSet(viewsets.ModelViewSet):
    queryset = ExtraPlate.objects.all()
    serializer_class = ExtraPlateSerializer

class QuotationItemViewSet(viewsets.ModelViewSet):
    # queryset = QuotationItem.objects.all()
    # serializer_class = QuotationItemSerializer
    
    def get_queryset(self):
        return QuotationItem.objects.filter(quotation=self.kwargs['quotation_pk'])
    
    def get_serializer_class(self):
        if(self.action=='create' or self.action=='update'):
            return QuotationItemUpdateSerializer
        elif(self.action=='list'):
            return QuotationItemListSerializer
        else:
            return QuotationItemSerializer

class QuotationViewSet(viewsets.ModelViewSet):
    queryset = Quotation.objects.all()
    filterset_fields=('approval_status',
                      'client',)
    
    def get_serializer_class(self):
        if(self.action=='list'):
            return QuotationListSerializer
        elif(self.action=='retrieve'):
            return QuotationDetailSerializer
        elif(self.action=='update'):
            return QuotationUpdateSerializer
        else:
            return QuotationSerializer

##################################
### JOB ORDER RELATED VIEWSETS ###
##################################

"""
TODO:
- Test JobOrder viewset functionality

FINISHED:
- Initial setup for JobOrder viewset
"""

class JobOrderFilter(django_filters.FilterSet):
    class Meta:
        model=JobOrder
        fields=('production_status','manager','quotation__client')

class JobOrderViewSet(viewsets.ModelViewSet):
    queryset = JobOrder.objects.all()
    # filterset_fields=('production_status','manager',)
    filterset_class = JobOrderFilter
    filter_backends = (filters.DjangoFilterBackend,)
    def get_serializer_class(self):
        if(self.action=='list'):
            return JobOrderListSerializer
        elif(self.action=='retrieve'):
            return JobOrderDetailSerializer
        elif(self.action=='update'):
            return JobOrderSerializer
        else:
            return JobOrderSerializer
        
#############################
### INVOICE RELATED VIEWS ###
#############################

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer