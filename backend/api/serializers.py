from rest_framework import serializers
from .models import Account
from .models import Invoice, JobOrder
from .models import PrintingProcess
from .models import Lamination, DieCut, Binding, Paper, ProductionConstants
from .models import Quotation, QuotationItem, Plate, Product

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        # fields = ('email',
        #           'first_name',
        #           'middle_name', 
        #           'last_name',
        #           'username',
        #           'shipping_address', 
        #           'mobile_number')

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        # fields = ('invoice_number', 
        #           'total_price',
        #           'payment_status',
        #           'invoice_email',
        #           'i_d_employee_number',
        #           'invoice_date')
    
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        # fields = ('product_number','product_name', 'product_price','product_description')

class JobOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOrder
        # fields = ('STATUS', 'joborder_number','production_status','joborder_quotation','joborder_number')

""""
========================================
==== PRODUCTION RELATED SERIALIZERS ====
========================================
"""


class PaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paper
        # fields = ('paper_id','paper_type','paper_category','paper_height','paper_width','ream_cost','leaf_cost','is_colored','is_sticker')

class PrintingProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrintingProcess
        fields=('__all__')
        # fields = ('process_id','process_name','process_base_factor')

class LaminationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lamination
        fields=('__all__')
        # fields = ('lamination_id','lamination_type','lamination_base_price')

class DieCutSerializer(serializers.ModelSerializer):
    class Meta:
        model = DieCut
        fields=('__all__')
        # fields = ('diecut_id','diecut_type','diecut_base_price')

class BindingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Binding
        fields=('__all__')
        # fields = ('binding_id','binding_type','binding_base_price')

class ProductionConstantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionConstants
        fields=('__all__')
        # fields = ('constants_id','plate_base_price','base_price_fold','lamination_factor','min_rate_running')

class PlateSerializer(serializers.ModelSerializer):
    no_impressions = serializers.ReadOnlyField()
    extra_impressions = serializers.ReadOnlyField()
    total_impressions = serializers.ReadOnlyField()
    running_costs = serializers.ReadOnlyField()
    class Meta:
        model = Plate
        fields=('__all__')
        # fields = ('plate_id','no_impressions','extra_impressions', 'total_impressions','running_costs')

class QuotationItemSerializer(serializers.ModelSerializer):
    lamination_costs = serializers.ReadOnlyField()
    class Meta:
        model = QuotationItem
        fields=('__all__')

class QuotationSerializer(serializers.ModelSerializer):
    total_no_plates = serializers.ReadOnlyField()
    total_plate_costs = serializers.ReadOnlyField()
    exact_no_sheets = serializers.ReadOnlyField()
    extra_sheets = serializers.ReadOnlyField()
    total_no_sheets = serializers.ReadOnlyField()
    total_paper_costs = serializers.ReadOnlyField()
    total_running_costs = serializers.ReadOnlyField()
    total_signatures = serializers.ReadOnlyField()
    total_folding_costs = serializers.ReadOnlyField()
    total_gathering_costs = serializers.ReadOnlyField()
    total_lamination_costs = serializers.ReadOnlyField()
    raw_total_costs = serializers.ReadOnlyField()
    final_unit_costs = serializers.ReadOnlyField()
    final_total_costs = serializers.ReadOnlyField()
    class Meta:
        model = Quotation
        fields=('__all__')

