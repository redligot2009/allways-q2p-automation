from django.db import models
from django.utils import timezone

# Create your models here.

class Accounts(models.Model):
    email=models.CharField(max_length=20)
    passw=models.CharField(max_length=20)
    first_name=models.CharField(max_length=20)
    middle_name=models.CharField(max_length=20, blank=True, null=True)
    surname=models.CharField(max_length=20)
    username=models.CharField(max_length=20)
    shipping_address=models.CharField(max_length=200)
    mobile_number=models.IntegerField
    
#    def __str__(self):
#       return str(self.pk)+": "+self.username

class Employee(models.Model):
    EMPLOYEE_TYPE=[
        ('O', 'Owner'),
        ('AM', 'Assistant Manager'),
        ('D', 'Deliveryman'),
        ('P', 'Production Employee'),
        ]
    employee_number=models.CharField(max_length=7)
    employee_name=models.CharField(max_length=20)
    job_position=models.CharField(max_length=2, choices=EMPLOYEE_TYPE)
    
class Invoice(models.Model):
    STATUS=[
        ('paid', 'Paid'),
        ('unpaid','Unpaid'),
        ]
    invoice_number=models.CharField(max_length=10)
    total_price=models.FloatField(max_length=22, default=0.0)
    payment_status=models.CharField(max_length=6,choices=STATUS, default='paid')
    invoice_email=models.CharField(max_length=20)
    i_d_employee_number=models.CharField(max_length=7)
    invoice_date=models.DateTimeField(null=True, blank=True)
   
class Product(models.Model):
    product_number=models.CharField(max_length=5)
    product_name=models.CharField(max_length=20)
    product_price=models.FloatField(max_length=22, default=0.0)
    product_description=models.CharField(max_length=200)
 
class JobOrder(models.Model):
    STATUS=[
        ('inprogress','In-Progress'),
        ('finished','Finished'),
        ]
    joborder_number=models.CharField(max_length=10)
    production_status=models.CharField(max_length=11, choices=STATUS)
    joborder_quotation_number=models.CharField(max_length=10)
    joborder_number=models.DateTimeField(null=False, blank=False)
    
class DeliveryMan(models.Model):
    d_employee_number=models.CharField(max_length=7)
    plate_number=models.CharField(max_length=6, null=True, blank=True)
    license_number=models.CharField(max_length=11, null=True, blank=True)
    
class Owner(models.Model):
    o_employee_number=models.CharField(max_length=7)
    o_key=models.CharField(max_length=10)
    
class AccountManager(models.Model):
    am_employee_number=models.CharField(max_length=7)
    am_key=models.CharField(max_length=10)

class Production(models.Model):
    p_employee_number=models.CharField(max_length=7)
    p_position=models.CharField(max_length=10)
    
class Quotation(models.Model):
    STATUS=[
        ('notapproved','Not Approved'),
        ('inprogress', 'In Progress'),
        ('approved', 'Approved'),
        ]
    q_number=models.CharField(max_length=10)
    approval_status=models.CharField(max_length=12, choices=STATUS)
    q_quantity=models.IntegerField
    product_specifications=models.CharField(max_length=200)
    q_product_number=models.CharField(max_length=5)
    q_am_employee_number=models.CharField(max_length=7)
    q_email=models.CharField(max_length=20)
    q_date=models.DateTimeField(null=False, blank=False)
    final_unit_costs=models.FloatField(default=0.0)
    final_total_costs=models.FloatField(default=0.0)
    total_folds=models.IntegerField
    raw_total_costs=models.FloatField(default=0.0)
    margin_of_error=models.FloatField(max_length=10, default=0.10)
    markup_percentage=models.FloatField(max_length=10, default=0.45)
    no_plates=models.IntegerField
    pages_can_fit=models.CharField(max_length=4)
    project_file_path=models.CharField(max_length=255, default="")
    project_dimensions_length=models.FloatField(default=11)
    project_dimensions_width=models.FloatField(default=8.5)
    no_colors=models.IntegerField
    
class QuotationItem(models.Model):
    COLOR=[
        ('bw','Black and White'),
        ('color','Colored'),
        ]
    PROCESS=[
        ('offset','Offset'),
        ('digital','Digital'),
        ('screen','Screen'),
        ]
    LAMINATED=[
        ('lam','Laminated'),
        ('notlam','Not Laminated'),
        ]
    FOLD=[
        ('a4','A4'),
        ('letter','Letter'),
        ('legal','Legal'),
        ]
    SPREAD=[
        ('printer','Printer Spread'),
        ('doublespread','Double Spread'),
        ]
    ITEM=[
        ('inner','Inner Pages'),
        ('cover','Cover'),
        ('other','Other'), #note: this isn't in the datadict but I added it in since i think it's appropriate to turn this into a dropdown?
        ]
    q_item_id=models.CharField(max_length=10)
    q_number=models.CharField(max_length=12)
    color_specs_id=models.CharField(max_length=15, choices=COLOR)
    process_specs_id=models.CharField(max_length=7,choices=PROCESS)
    lamination_specs_id=models.CharField(max_length=13,choices=LAMINATED)
    diecut_specs_id=models.CharField(max_length=5, blank=True, null=True)
    folded_size_specs_id=models.CharField(max_length=6,choices=FOLD)
    spread_size_specs_id=models.CharField(max_length=15,choices=SPREAD)
    binding_specs_id=models.CharField(max_length=5,blank=True,null=True)
    item_type=models.CharField(max_length=10,choices=ITEM)
    item_type_other=models.CharField(max_length=10) #note: not in datadict but added for ease of convenience sa choice dropdown above
    
class ColorsSpecs(models.Model):
    COLOR=[
        ('bw','Black and White'),
        ('color','Colored'),
        ]
    color_specs_id=models.CharField(max_length=15,choices=COLOR)
    q_item_id=models.CharField(max_length=10)
    colors_id=models.CharField(max_length=10)
    colors_specs_desc=models.CharField(max_length=200,blank=True,null=True)
    
class PaperSpecs(models.Model):
    paper_specs_id=models.CharField(max_length=5)
    q_item_id=models.CharField(max_length=10)
    paper_id=models.CharField(max_length=10)
    paper_specs_desc=models.CharField(max_length=200,blank=True,null=True)

class PrintingProcessSpecs(models.Model):
    PROCESS=[
        ('offset','Offset'),
        ('digital','Digital'),
        ('screen','Screen'),
        ]
    process_specs_id=models.CharField(max_length=7,choices=PROCESS)
    q_item_id=models.CharField(max_length=10)
    process_id=models.CharField(max_length=10)
    process_specs_desc=models.CharField(max_length=200,blank=True,null=True)
    
class LaminationSpecs(models.Model):
    LAMINATED=[
        ('lam','Laminated'),
        ('notlam','Not Laminated'),
        ]
    lamination_specs_id=models.CharField(max_length=13,choices=LAMINATED)
    q_item_id=models.CharField(max_length=10)
    lamination_id=models.CharField(max_length=10)
    lamination_specs_desc=models.CharField(max_length=200,blank=True,null=True)
    
class DiecutSpecs(models.Model):
    diecut_specs_id=models.CharField(max_length=5)
    q_item_id=models.CharField(max_length=10)
    diecut_id=models.CharField(max_length=10)
    diecut_specs_desc=models.CharField(max_length=200,blank=True,null=True)
    
class BindingSpecs(models.Model):
    binding_specs_id=models.CharField(max_length=5)
    q_item_id=models.CharField(max_length=10)
    binding_id=models.CharField(max_length=10)
    binding_specs_desc=models.CharField(max_length=200,blank=True,null=True)
 
class ColorProfile(models.Model):
    colors_id=models.CharField(max_length=10)
    colors_name=models.CharField(max_length=10)
    colors_price_factor=models.FloatField(max_length=22,default=0.0)

class Paper(models.Model):
    ISCOLOR=[
        ('y','Yes'),
        ('n','No'),
        ]
    ISSTICKER=[
        ('y','Yes'),
        ('n','No'),
        ]
    paper_id=models.CharField(max_length=10)
    paper_type=models.CharField(max_length=150, default="Book 60")
    paper_category=models.CharField(max_length=15)
    paper_height=models.CharField(max_length=10)
    paper_width=models.CharField(max_length=10)
    ream_cost=models.FloatField(max_length=22,default=0.0,blank=True,null=True)
    leaf_cost=models.FloatField(max_length=22,default=0.0,blank=True,null=True)
    is_colored=models.CharField(max_length=1,choices=ISCOLOR)
    is_sticker=models.CharField(max_length=10,choices=ISCOLOR)
    
class PrintingProcess(models.Model):
    process_id=models.CharField(max_length=10)
    process_name=models.CharField(max_length=10)
    process_base_factor=models.FloatField(max_length=22,default=0.0)
    
class Lamination(models.Model):
    lamination_id=models.CharField(max_length=10)
    lamination_type=models.CharField(max_length=150)
    lamination_base_price=models.FloatField(max_length=22,default=0.0)

class DieCut(models.Model):
    diecut_id=models.CharField(max_length=10)
    diecut_type=models.CharField(max_length=10)
    diecut_base_price=models.FloatField(max_length=22,default=0.0)

class Binding(models.Model):
    binding_id=models.CharField(max_length=10)
    binding_type=models.CharField(max_length=150)
    binding_base_price=models.FloatField(max_length=22,default=0.0)
    
class Plate(models.Model):
    plate_id=models.CharField(max_length=10)
    no_impressions=models.IntegerField(default=1)
    extra_impressions=models.IntegerField(default=0)
    total_impressions=models.IntegerField(default=0)
    running_costs=models.FloatField(default=0.0)
    
class ProductionConstants(models.Model):
    constants_id=models.CharField(max_length=10)
    plate_base_price=models.FloatField(default=250.0)
    base_price_fold=models.FloatField(default=90.0)
    lamination_factor=models.FloatField(default=0.00625)
    min_rate_running=models.FloatField(default=400.0)