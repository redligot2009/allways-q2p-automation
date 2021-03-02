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

class PaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paper
        # fields = ('paper_id','paper_type','paper_category','paper_height','paper_width','ream_cost','leaf_cost','is_colored','is_sticker')

class PrintingProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrintingProcess
        # fields = ('process_id','process_name','process_base_factor')

class LaminationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lamination
        # fields = ('lamination_id','lamination_type','lamination_base_price')

class DieCutSerializer(serializers.ModelSerializer):
    class Meta:
        model = DieCut
        # fields = ('diecut_id','diecut_type','diecut_base_price')

class BindingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Binding
        # fields = ('binding_id','binding_type','binding_base_price')

class ProductionConstantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionConstants
        # fields = ('constants_id','plate_base_price','base_price_fold','lamination_factor','min_rate_running')

class PlateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plate
        # fields = ('plate_id','no_impressions','extra_impressions', 'total_impressions','running_costs')

class QuotationItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuotationItem
        # fields = ('COLOR','PROCESS','LAMINATED','FOLD','SPREAD','ITEM','q_item_id','q_number','color_specs_id','process_specs_id','lamination_specs_id','diecut_specs_id','folded_size_specs_id','spread_size_specs_id','binding_specs_id','item_type','item_type_other')

class QuotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quotation
        # fields = ('STATUS','q_number','approval_status','q_quantity','product_specifications','q_product_number','q_am_employee_number','q_email','q_date','final_unit_costs','final_total_costs','total_folds','raw_total_costs','margin_of_error','markup_percentage','no_plates','pages_can_fit','project_file_path','project_dimensions_length','project_dimensions_width','no_colors')

