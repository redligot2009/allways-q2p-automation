from rest_framework import serializers
from .models import Account
from .models import Invoice, JobOrder
from .models import PrintingProcess
from .models import Lamination, DieCut, Binding, Paper, ProductionConstants
from .models import Quotation, QuotationItem, ExtraPlate, Product

class AccountDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields=('__all__')

class AccountListSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()
    class Meta:
        model = Account
        fields=('full_name','organization_name')

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        # fields = ('invoice_number', 
        #           'total_price',
        #           'payment_status',
        #           'invoice_email',
        #           'i_d_employee_number',
        #           'invoice_date')

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

    
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields=('product_name','product_description')
        
class ExtraPlateSerializer(serializers.ModelSerializer):
    no_impressions = serializers.ReadOnlyField()
    extra_impressions = serializers.ReadOnlyField()
    total_impressions = serializers.ReadOnlyField()
    running_costs = serializers.ReadOnlyField()
    class Meta:
        model = ExtraPlate
        fields=('__all__')

class QuotationItemSerializer(serializers.ModelSerializer):
    
    # Related Objects
    extra_plates=ExtraPlateSerializer(many=True)
    
    # Read only fields (AKA properties)
    lamination_costs = serializers.ReadOnlyField()
    
    # Meta options
    class Meta:
        model = QuotationItem
        fields=('__all__')

class QuotationListSerializer(serializers.ModelSerializer):
    
    # Related Objects
    product_type=ProductSerializer()
    client = AccountListSerializer()
    
    # Read only fields (AKA properties)
    raw_total_costs = serializers.ReadOnlyField()
    raw_unit_costs = serializers.ReadOnlyField()
    final_total_costs = serializers.ReadOnlyField()
    final_unit_costs = serializers.ReadOnlyField()
    
    # Meta options
    class Meta:
        model = Quotation
        fields=('id',
                'project_name',
                'product_type',
                'created_date',
                'client',
                'approval_status',
                'approval_date',
                'printing_process',
                'quantity',
                'raw_total_costs',
                'raw_unit_costs',
                'final_total_costs',
                'final_unit_costs')

class QuotationDetailSerializer(serializers.ModelSerializer):
    
    # Related Objects
    items=QuotationItemSerializer(many=True)
    product_type=ProductSerializer()
    client = AccountListSerializer()
    
    # Read only fields (AKA properties)
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
    raw_unit_costs = serializers.ReadOnlyField()
    final_unit_costs = serializers.ReadOnlyField()
    final_total_costs = serializers.ReadOnlyField()
    
    # Meta options
    class Meta:
        model = Quotation
        fields=('__all__')

