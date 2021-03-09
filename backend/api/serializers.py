from django.utils.functional import empty
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
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    class Meta:
        model = Account
        fields=('id','full_name','first_name','last_name', 'organization_name')

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
        fields=('__all__')

class PaperListSerializer(serializers.ModelSerializer):
    class Meta:
        model=Paper
        fields=('id','paper_type',)

class PrintingProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrintingProcess
        fields=('process_name')

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
        fields=('id','product_name','product_description')
        
class ExtraPlateSerializer(serializers.ModelSerializer):
    extra_impressions = serializers.ReadOnlyField()
    total_impressions = serializers.ReadOnlyField()
    running_costs = serializers.ReadOnlyField()
    class Meta:
        model = ExtraPlate
        fields=('__all__')
        exclude=('quotation_item','id')

class QuotationItemListSerializer(serializers.ModelSerializer):

    # Related Objects
    lamination=serializers.StringRelatedField()
    binding=serializers.StringRelatedField()
    paper=serializers.StringRelatedField()
    extra_plates=ExtraPlateSerializer(many=True)
    
    # Read only fields (AKA properties)
    lamination_costs = serializers.ReadOnlyField()
    running_costs = serializers.ReadOnlyField()
    paper_costs = serializers.ReadOnlyField()
    
    # Meta options
    class Meta:
        model = QuotationItem
        exclude=('quotation','id')
        
class QuotationItemSerializer(serializers.ModelSerializer):

    # Related Objects
    lamination=serializers.PrimaryKeyRelatedField(queryset=Lamination.objects.all(), required=False, allow_null=True, default=None)
    binding=serializers.PrimaryKeyRelatedField(queryset=Binding.objects.all(), required=False, allow_null=True, default=None)
    paper=serializers.PrimaryKeyRelatedField(queryset=Paper.objects.all())
    extra_plates=ExtraPlateSerializer(many=True, required=False, allow_null=True, default=None)
    
    # Read only fields (AKA properties)
    lamination_costs = serializers.ReadOnlyField()
    running_costs = serializers.ReadOnlyField()
    paper_costs = serializers.ReadOnlyField()
    
    # Meta options
    class Meta:
        model = QuotationItem
        exclude=('quotation','id')

class QuotationListSerializer(serializers.HyperlinkedModelSerializer):
    
    # URL
    url = serializers.HyperlinkedIdentityField(view_name='quotations-detail')
    
    # Related Objects
    product_type=ProductSerializer(read_only=True)
    client = AccountListSerializer(read_only=True)
    
    # Read only fields (AKA properties)
    raw_total_costs = serializers.ReadOnlyField()
    raw_unit_costs = serializers.ReadOnlyField()
    final_total_costs = serializers.ReadOnlyField()
    final_unit_costs = serializers.ReadOnlyField()
    
    # Meta options
    class Meta:
        model = Quotation
        fields=('url',
                'id',
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
    items=QuotationItemListSerializer(many=True, read_only=True)
    product_type=ProductSerializer(read_only=True)
    client = AccountListSerializer(read_only=True)
    
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
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        new_quotation = Quotation.objects.create(**validated_data)
        for item_data in items_data:
            QuotationItem.objects.create(quotation=new_quotation,**item_data)
        return new_quotation
    
    # Meta options
    class Meta:
        model = Quotation
        fields=('__all__')

class QuotationSerializer(serializers.ModelSerializer):
    
    # Related Objects
    items = QuotationItemSerializer(many=True)
    product_type = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    client = serializers.PrimaryKeyRelatedField(queryset=Account.objects.all())
    
    # Read only fields (AKA properties)
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        new_quotation = Quotation.objects.create(**validated_data)
        for item_data in items_data:
            QuotationItem.objects.create(quotation=new_quotation,**item_data)
        return new_quotation
    
    # Meta options
    class Meta:
        model = Quotation
        fields=('project_name',
                'product_type',
                'created_date',
                'client',
                'approval_status',
                'approval_date',
                'printing_process',
                'quantity',
                'items')

