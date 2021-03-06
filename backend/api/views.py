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

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

class JobOrderViewSet(viewsets.ModelViewSet):
    queryset = JobOrder.objects.all()
    serializer_class = JobOrderSerializer


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
    queryset = Plate.objects.all()
    serializer_class = PlateSerializer

class QuotationItemViewSet(viewsets.ModelViewSet):
    queryset = QuotationItem.objects.all()
    serializer_class = QuotationItemSerializer

class QuotationViewSet(viewsets.ModelViewSet):
    queryset = Quotation.objects.all()
    serializer_class = QuotationSerializer
