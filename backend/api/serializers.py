from rest_framework import serializers
from .models import Accounts
from .models import Employee
from .models import Invoice
from .models import Product
from .models import JobOrder
from .models import DeliveryMan
from .models import Owner
from .models import AccountManager
from .models import Production
from .models import Quotation
from .models import QuotationItem
from .models import ColorsSpecs
from .models import PaperSpecs
from .models import PrintingProcessSpecs
from .models import LaminationSpecs
from .models import DiecutSpecs
from .models import BindingSpecs
from .models import ColorProfile
from .models import Paper
from .models import PrintingProcess
from .models import Lamination
from .models import DieCut
from .models import Binding
from .models import Plate
from .models import ProductionConstant

class AccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accounts
        fields = ('email','passw','first_name','middle_name', 'surname','username','shipping_address', 'mobile_number')

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee 
        fields = ('EMPLOYEE_TYPE','employee_number','employee_name','job_position')

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = ('STATUS','invoice_number', 'total_price','payment_status','invoice_email','i_d_employee_number','invoice_date')
    
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('product_number','product_name', 'product_price','product_description')

class JobOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOrder
        fields = ('STATUS', 'joborder_number','production_status','joborder_quotation','joborder_number')

class DeliveryManSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryMan
        fields = ('d_employee_number','plate_number','license_number')

class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ('o_employee','o_key')

class AccountManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountManager
        fields = ('am_employee_number', 'am_key')

class ProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Production
        fields = ('p_employee_number','p_position')

class QuotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quotation
        fields = ('STATUS','q_number','approval_status','q_quantity','product_specifications','q_product_number','q_am_employee_number','q_email','q_date','final_unit_costs','final_total_costs','total_folds','raw_total_costs','margin_of_error','markup_percentage','no_plates','pages_can_fit','project_file_path','project_dimensions_length','project_dimensions_width','no_colors')

class QuotationItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuotationItem
        fields = ('COLOR','PROCESS','LAMINATED','FOLD','SPREAD','ITEM','q_item_id','q_number','color_specs_id','process_specs_id','lamination_specs_id','diecut_specs_id','folded_size_specs_id','spread_size_specs_id','binding_specs_id','item_type','item_type_other')

class ColorsSpecsSerializers(serializers.ModelSerializer):
    class Meta:
        model = ColorsSpecs
        fields = ('COLOR','color_specs_id','q_item_id','colors_id','colors_specs_desc')

class PaperSpecsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaperSpecs
        fields = ('paper_specs_id','q_item_id','paper_id','paper_specs_desc')

class PrintingProcessSpecsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrintingProcessSpecs
        fields = ('PROCESS','process_specs_id','q_item_id','process_id','process_specs_desc')

class LaminationSpecsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LaminationSpecs
        fields = ('LAMINATED','lamination_specs_id','q_item_id', 'lamination_id', 'lamination_specs_desc')

class DiecutSpecsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiecutSpecs
        fields = ('diecut_specs_id','q_item_id','diecut_id','diecut_specs_desc')

class BindingSpecsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BindingSpecs
        fields = ('binding_specs_id','q_item_id','binding_id','binding_specs_desc')

class ColorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColorProfile
        fields = ('colors_id','colors_name','colors_price_factor')
    
class PaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paper
        fields = ('ISCOLOR','ISSTICKER','paper_id','paper_type','paper_category','paper_height','paper_width','ream_cost','leaf_cost','is_colored','is_sticker')

class PrintingProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrintingProcess
        fields = ('process_id','process_name','process_base_factor')

class LaminationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lamination
        fields = ('lamination_id','lamination_type','lamination_base_price')

class DieCutSerializer(serializers.ModelSerializer):
    class Meta:
        model = DieCut
        fields = ('diecut_id','diecut_type','diecut_base_price')

class BindingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Binding
        fields = ('binding_id','binding_type','binding_base_price')

class PlateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plate
        fields = ('plate_id','no_impressions','extra_impressions', 'total_impressions','running_costs')

class ProductionConstantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionConstants
        fields = ('constants_id','plate_base_price','base_price_fold','lamination_factor','min_rate_running')