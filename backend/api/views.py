from django.shortcuts import render
from rest_framework import viewsets
from .models import Account
from .models import Invoice, JobOrder
from .models import PrintingProcess
from .models import Lamination, DieCut, Binding, Paper, ProductionConstants
from .models import Quotation, QuotationItem, Plate, Product
from .serializers import AccountSerializer, InvoiceSerializer, ProductSerializer
from .serializers import JobOrderSerializer, PaperSerializer, PrintingProcessSerializer
from .serializers import LaminationSerializer, DieCutSerializer, BindingSerializer
from .serializers import ProductionConstantsSerializer, PlateSerializer, QuotationItemSerializer
from .serializers import QuotationSerializer
# Create your views here.

class AccountViewSet(viewsets.ModelViewset):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class InvoiceViewSet(viewsets.ModelViewset):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

class ProductViewSet(viewsets.ModelViewset):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class JobOrderViewSet(viewsets.ModelViewset):
    queryset = JobOrder.objects.all()
    serializer_class = JobOrderSerializer

class PaperViewSet(viewsets.ModelViewset):
    queryset = Paper.objects.all()
    serializer_class = PaperSerializer

class PrintingProcessViewSet(viewsets.ModelViewset):
    queryset = PrintingProcess.objects.all()
    serializer_class = PrintingProcessSerializer

class LaminationViewSet(viewsets.ModelViewset):
    queryset = Lamination.objects.all()
    serializer_class = LaminationSerializer

class DieCutViewSet(viewsets.ModelViewset):
    queryset = Paper.objects.all()
    serializer_class = DieCutSerializer

class BindingViewSet(viewsets.ModelViewset):
    queryset = Binding.objects.all()
    serializer_class = BindingSerializer

class ProductionConstantsViewSet(viewsets.ModelViewset):
    queryset = ProductionConstants.objects.all()
    serializer_class = ProductionConstantsSerializer

class PlateViewSet(viewsets.ModelViewset):
    queryset = Plate.objects.all()
    serializer_class = PlateSerializer

class QuotationItemViewSet(viewsets.ModelViewset):
    queryset = QuotationItem.objects.all()
    serializer_class = QuotationItemSerializer

class QuotationViewSet(viewsets.ModelViewset):
    queryset = Quotation.objects.all()
    serializer_class = QuotationSerializer
