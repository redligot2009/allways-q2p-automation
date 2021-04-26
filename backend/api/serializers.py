import django
from django.utils import timezone
from django.utils.functional import empty
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.utils import serializer_helpers
from .models import Account
from .models import Invoice, JobOrder
from .models import PrintingProcess
from .models import Lamination, DieCut, Binding, Paper, ProductionConstants
from .models import Quotation, QuotationItem, ExtraPlate, Product

# Serialize the default Django user model associated with an Account
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=get_user_model()
        fields=('username','email','first_name','last_name')
        
from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer

# Serializer for user creation, extended from djoser library's existing serializers
class UserCreateSerializer(BaseUserRegistrationSerializer):
    class Meta:
        model=get_user_model()
        fields=('username','email','password','first_name','last_name')

# Serializer for Account (user profile) details.
class AccountDetailSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()
    user = serializers.StringRelatedField(read_only=True)
    email = serializers.CharField(max_length=255,source='user.email', read_only=True)
    class Meta:
        model = Account
        fields=('__all__')

# Serializer for updating Account details.
class AccountUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Account
        fields=('__all__')

# Serializer for when Accounts are being displayed in a list (non-detail view)
class AccountListSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()
    user = serializers.StringRelatedField(read_only=True)
    email = serializers.CharField(max_length=255,source='user.email', read_only=True)
    class Meta:
        model = Account
        fields=('id','user','email','full_name', 'job_position', 'organization_name')

""""
========================================
==== PRODUCTION RELATED SERIALIZERS ====
========================================
(NOTE: a bunch of these are not yet used, with the exception of the Quotation and QuotationItem models)
"""

# Serialize Paper model with all details
class PaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paper
        fields=('__all__')

# Serialize Paper model in a non-detail list view
class PaperListSerializer(serializers.ModelSerializer):
    class Meta:
        model=Paper
        fields=('id','paper_type','paper_category','paper_length','paper_width')

# Serialize different Printing Process models
class PrintingProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrintingProcess
        fields=('process_name')

# Serialize different Lamination types
class LaminationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lamination
        fields=('__all__')

# Serialize different DieCut types 
class DieCutSerializer(serializers.ModelSerializer):
    class Meta:
        model = DieCut
        fields=('__all__')

# Serialize different Binding types
class BindingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Binding
        fields=('__all__')

# Serialize the ProductionConstants singleton object if needed
class ProductionConstantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionConstants
        fields=('__all__')

# Serialize different Product types
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields=('id','product_name','product_description')

# Serialize "ExtraPlate" objects
class ExtraPlateSerializer(serializers.ModelSerializer):
    extra_impressions = serializers.ReadOnlyField()
    total_impressions = serializers.ReadOnlyField()
    running_costs = serializers.ReadOnlyField()
    class Meta:
        model = ExtraPlate
        fields=('__all__')
        exclude=('quotation_item','id')

# Serialize QuotationItem objects (list view)
class QuotationItemListSerializer(serializers.ModelSerializer):

    # Related Objectslamination=serializers.PrimaryKeyRelatedField(queryset=Lamination.objects.all(), required=False, allow_null=True, default=None)
    binding=serializers.PrimaryKeyRelatedField(queryset=Binding.objects.all(), required=False, allow_null=True, default=None)
    paper=serializers.PrimaryKeyRelatedField(queryset=Paper.objects.all())
    # extra_plates=ExtraPlateSerializer(many=True, required=False, allow_null=True, default=None)
    # extra_plates=ExtraPlateSerializer(many=True)
    
    # Read only fields (AKA properties)
    lamination_costs = serializers.ReadOnlyField()
    running_costs = serializers.ReadOnlyField()
    paper_costs = serializers.ReadOnlyField()
    
    # Meta options
    class Meta:
        model = QuotationItem
        exclude=('quotation','id')

# Serialize QuotationItem objects (detail view)
class QuotationItemSerializer(serializers.ModelSerializer):

    # Related Objects
    lamination=serializers.PrimaryKeyRelatedField(queryset=Lamination.objects.all(), required=False, allow_null=True, default=None)
    binding=serializers.PrimaryKeyRelatedField(queryset=Binding.objects.all(), required=False, allow_null=True, default=None)
    paper=serializers.PrimaryKeyRelatedField(queryset=Paper.objects.all())
    extra_plates=ExtraPlateSerializer(many=True, required=False, allow_null=True, default=None)
    quotation=serializers.PrimaryKeyRelatedField(queryset=Quotation.objects.all())
    
    # Read only fields (AKA properties)
    lamination_costs = serializers.ReadOnlyField()
    running_costs = serializers.ReadOnlyField()
    paper_costs = serializers.ReadOnlyField()
    
    # Meta options
    class Meta:
        model = QuotationItem
        fields=('__all__')

# Serialize QuotationItem upon update
class QuotationItemUpdateSerializer(serializers.ModelSerializer):

    # Related Objects
    lamination=serializers.PrimaryKeyRelatedField(queryset=Lamination.objects.all(), required=False, allow_null=True, default=None)
    binding=serializers.PrimaryKeyRelatedField(queryset=Binding.objects.all(), required=False, allow_null=True, default=None)
    paper=serializers.PrimaryKeyRelatedField(queryset=Paper.objects.all())
    extra_plates=ExtraPlateSerializer(many=True, required=False, allow_null=True, default=None)
    
    # Meta options
    class Meta:
        model = QuotationItem
        fields=('__all__')

# Serialize Quotation model (list view)
class QuotationListSerializer(serializers.HyperlinkedModelSerializer):
    
    # URL uniquely identifying a particular Quotation
    url = serializers.HyperlinkedIdentityField(view_name='quotations-detail')
    
    # Related Objects
    product_type = ProductSerializer()
    # serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    client = AccountListSerializer(read_only=True)
    
    # Read only fields (AKA properties)
    raw_total_costs = serializers.ReadOnlyField()
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
                'page_length',
                'page_width',
                'spread_length',
                'spread_width',
                'paper_types',
                'lamination_types',
                'binding_types',
                'raw_total_costs',
                'markup_costs',
                'final_total_costs',
                'final_unit_costs')

# Serialize Quotation model (detail view)
class QuotationDetailSerializer(serializers.ModelSerializer):
    
    # Related Objects
    items=QuotationItemListSerializer(many=True, read_only=True)
    product_type = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
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

# Serialize Quotation upon update
class QuotationUpdateSerializer(serializers.ModelSerializer):
    
    # Related Objects
    items = QuotationItemUpdateSerializer(many=True)
    product_type = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    
    # Override update action
    # TODO: REFACTOR THIS SHIT! What the fuck? There has to be an easier way to update nested objects...
    
    def get_model_fields(model):
        return model._meta.fields
    
    def update(self, instance, validated_data):
        items_data = validated_data.pop('items')
        items = list((instance.items).all())
        # for()
        instance.project_name = validated_data.get('project_name',instance.project_name)
        instance.product_type = validated_data.get('product_type',instance.product_type)
        instance.approval_status = validated_data.get('approval_status',instance.approval_status)
        instance.printing_process = validated_data.get('printing_process',instance.printing_process)
        instance.quantity = validated_data.get('quantity',instance.quantity)
        instance.total_pages = validated_data.get('total_pages',instance.total_pages)
        instance.markup_percentage = validated_data.get('markup_percentage',instance.markup_percentage)
        instance.margin_of_error = validated_data.get('margin_of_error',instance.margin_of_error)
        instance.page_length = validated_data.get('page_length',instance.page_length)
        instance.pages_can_fit = validated_data.get('pages_can_fit',instance.pages_can_fit)
        instance.total_binding_costs = validated_data.get('total_binding_costs',instance.total_binding_costs)
        instance.total_folds = validated_data.get('total_folds',instance.total_folds)
        instance.cutting_costs = validated_data.get('cutting_costs',instance.cutting_costs)
        instance.packaging_costs = validated_data.get('packaging_costs',instance.packaging_costs)
        instance.transport_costs = validated_data.get('transport_costs',instance.transport_costs)
        
        if (instance.approval_status=="approved"):
            instance.approval_date = timezone.now()
            pass
        else:
            instance.approval_date = None
        
        instance.save()
        
        for item_data in items_data:
            item = items.pop(0)
            item.item_type = item_data.get('item_type',item.item_type)
            item.paper = item_data.get('paper',item.paper)
            item.lamination = item_data.get('lamination',item.lamination)
            item.binding = item_data.get('binding',item.binding)
            item.no_impressions_per_plate = item_data.get('no_impressions_per_plate',item.no_impressions_per_plate)
            item.no_plates_per_copy = item_data.get('no_plates_per_copy',item.no_plates_per_copy)
            item.no_sheets_ordered_for_copy = item_data.get('no_sheets_ordered_for_copy',item.no_sheets_ordered_for_copy)
            # Handle extra plates
            try:
                extra_plates_data = item_data.pop('extra_plates')
                extra_plates = list(item.extra_plates.all())
                for extra_plate_data in extra_plates_data:
                    extra_plate = extra_plates.pop(0)
                    extra_plate.extra_plate_name = extra_plate_data.get('extra_plate_name',extra_plate.extra_plate_name)
                    extra_plate.no_impressions = extra_plate_data.get('no_impressions',extra_plate.no_impressions)
            except:
                extra_plates = list()
            item.save()
        
        return instance
    
    # Meta options
    class Meta:
        model = Quotation
        fields=('project_name',
                'product_type',
                'approval_status',
                'printing_process',
                'quantity',
                'total_pages',
                'markup_percentage',
                'margin_of_error',
                'items',
                'page_length',
                'page_width',
                'pages_can_fit',
                'total_binding_costs',
                'total_folds',
                'cutting_costs',
                'packaging_costs',
                'transport_costs'
                )

# Main Quotation serializer (for create actions)
class QuotationSerializer(serializers.ModelSerializer):
    
    # Related Objects
    items = QuotationItemListSerializer(many=True)
    product_type = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    client = serializers.PrimaryKeyRelatedField(queryset=Account.objects.all())
    
    # Override create action
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        new_quotation = Quotation.objects.create(**validated_data)
        for item_data in items_data:
            QuotationItem.objects.create(quotation=new_quotation,**item_data)
        return new_quotation
    
    # Read-only fields
    # approval_date = serializers.ReadOnlyField()
    
    # Set default values for fields
    
    # Meta options
    class Meta:
        model = Quotation
        fields=('project_name',
                'product_type',
                'client',
                'quantity',
                'total_pages',
                'page_length',
                'page_width',
                'items')

""""
=================================================
==== JOB ORDER / INVOICE RELATED SERIALIZERS ====
=================================================
"""

# UNUSED Invoice serializer for future purposes
class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields=('__all__')


# WHAT IS THIS: Different serializers for JobOrder creation / retrieval / update / deletion

# List view serializer
class JobOrderListSerializer(serializers.ModelSerializer):
    
    quotation = QuotationListSerializer()
    
    class Meta:
        model = JobOrder
        fields = ('__all__')

# Create / update / delete serializer
class JobOrderSerializer(serializers.ModelSerializer):
    quotation = serializers.PrimaryKeyRelatedField(queryset=Quotation.objects.all())
    
    class Meta:
        model = JobOrder
        # fields = ('__all__')
        exclude=('created_date',
                 )

# Retrieve serializer
class JobOrderDetailSerializer(serializers.ModelSerializer):
    
    quotation = QuotationSerializer()
    manager=serializers.StringRelatedField()
    
    class Meta:
        model = JobOrder
        fields = ('__all__')