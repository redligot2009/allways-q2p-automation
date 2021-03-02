from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User, Group

###########################################
#### PREPOPULATE USER AND GROUP MODELS ####
###########################################

try:
    employee_group = Group.objects.get(name="Employees")
except Group.DoesNotExist:
    Group.objects.create(name="Employees").save()

try:
    owner_group = Group.objects.get(name="Owners")
except Group.DoesNotExist:
    Group.objects.create(name="Owners").save()

try:
    owner_group = Group.objects.get(name="Account Managers")
except Group.DoesNotExist:
    Group.objects.create(name="Account Managers").save()
    
try:
    delivery_man_group = Group.objects.get(name="Deliverymen")
except Group.DoesNotExist:
    Group.objects.create(name="Deliverymen").save()

try:
    delivery_man_group = Group.objects.get(name="Production Staff")
except Group.DoesNotExist:
    Group.objects.create(name="Production Staff").save()

################################
#### ACCOUNT RELATED MODELS ####
################################

class Account(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,null=True)
    first_name=models.CharField(default="",max_length=20)
    middle_name=models.CharField(default="",max_length=20)
    surname=models.CharField(default="",max_length=20)
    shipping_address=models.CharField(default="",max_length=20)
    mobile_number=models.CharField(default="",max_length=20)

class Employee(Account):
    EMPLOYEE_TYPE=[
        ('O', 'Owner'),
        ('AM', 'Account Manager'),
        ('D', 'Deliveryman'),
        ('P', 'Production Employee'),
        ]
    employee_number=models.CharField(blank=True,max_length=7,primary_key=True)
    # employee_name=models.CharField(max_length=20)
    job_position=models.CharField(default='O',max_length=2, choices=EMPLOYEE_TYPE)

class DeliveryMan(Account):
    # d_employee_number=models.CharField(max_length=7)
    plate_number=models.CharField(default="",max_length=20)
    license_number=models.CharField(default="",max_length=20)
    
class Owner(Account):
    # o_employee_number=models.CharField(max_length=7)
    o_key=models.CharField(default="",max_length=20)
    
class AccountManager(Account):
    # am_employee_number=models.CharField(max_length=7)
    am_key=models.CharField(default="",max_length=20)

class Production(Account):
    # p_employee_number=models.CharField(max_length=7)
    p_position=models.CharField(default="",max_length=20)

############################################
#### INVOICE / JOB ORDER RELATED MODELS ####
############################################

class Invoice(models.Model):
    STATUS=[
        ('paid', 'Paid'),
        ('unpaid','Unpaid'),
        ]
    invoice_number=models.CharField(max_length=10,primary_key=True,unique=True)
    total_price=models.FloatField(max_length=22, default=0.0)
    payment_status=models.CharField(max_length=6,choices=STATUS, default='paid')
    invoice_email=models.CharField(max_length=20)
    i_d_employee_number=models.CharField(max_length=7)
    invoice_date=models.DateTimeField(null=True, blank=True)
 
class JobOrder(models.Model):
    STATUS=[
        ('inprogress','In-Progress'),
        ('finished','Finished'),
        ]
    joborder_number=models.CharField(max_length=10)
    production_status=models.CharField(max_length=11, choices=STATUS)
    joborder_quotation_number=models.CharField(max_length=10)
    joborder_number=models.DateTimeField(null=False, blank=False)
    
##################################
#### QUOTATION RELATED MODELS ####
##################################

class ProductionConstants(models.Model):
    constants_id=models.CharField(max_length=10)
    plate_base_price=models.FloatField(default=250.0)
    base_price_fold=models.FloatField(default=90.0)
    lamination_factor=models.FloatField(default=0.00625)
    min_rate_running=models.FloatField(default=400.0)

class Paper(models.Model):
    ISCOLOR=[
        ('y','Yes'),
        ('n','No'),
        ]
    ISSTICKER=[
        ('y','Yes'),
        ('n','No'),
        ]
    
    # PRIMARY KEY
    #paper_id=models.CharField(max_length=10,primary_key=True)
    
    # PAPER INFORMATION
    paper_type=models.CharField(max_length=150, default="Book 60")
    paper_category=models.CharField(max_length=100)
    
    # PAPER DIMENSIONS
    paper_height=models.CharField(max_length=10)
    paper_width=models.CharField(max_length=10)
    
    # PAPER COSTS (LEAF AND REAM)
    ream_cost=models.FloatField(max_length=22,default=0.0,blank=True,null=True)
    leaf_cost=models.FloatField(max_length=22,default=0.0,blank=True,null=True)
    
    # IS PAPER COLORED OR A STICKER TYPE OF PAPER?
    is_colored=models.CharField(max_length=1,choices=ISCOLOR)
    is_sticker=models.CharField(max_length=10,choices=ISCOLOR)
    
class PrintingProcess(models.Model):
    #process_id=models.CharField(max_length=10, primary_key=True)
    process_name=models.CharField(max_length=10, blank=True)
    process_base_factor=models.FloatField(max_length=22,default=0.0)
    
class Lamination(models.Model):
    #lamination_id=models.CharField(max_length=10, primary_key=True)
    lamination_type=models.CharField(max_length=150, blank=True)
    lamination_base_price=models.FloatField(max_length=22,default=0.0)

class DieCut(models.Model):
    #diecut_id=models.CharField(max_length=10, primary_key=True)
    diecut_type=models.CharField(max_length=10, blank=True)
    diecut_base_price=models.FloatField(max_length=22,default=0.0)

class Binding(models.Model):
    #binding_id=models.CharField(max_length=10, primary_key=True)
    binding_type=models.CharField(max_length=150, blank=True)
    binding_base_price=models.FloatField(max_length=22,default=0.0)
    
class Product(models.Model):
    #product_number=models.CharField(max_length=5,primary_key=True)
    product_name=models.CharField(max_length=20, blank=True)
    product_price=models.FloatField(max_length=22, default=0.0)
    product_description=models.CharField(max_length=200, blank=True)

class Quotation(models.Model):
    
    ### PROJECT-WIDE SETTINGS ###
    
    # PRIMARY KEY
    #q_number=models.CharField(max_length=10,primary_key=True)
    
    # WHICH ACCOUNT MANAGER IS ASSIGNED TO REVIEW THIS QUOTATION?
    q_am_employee=models.ForeignKey(to=AccountManager,null=True,on_delete=models.SET_NULL)
    
    # Choices for approval status
    STATUS=[
        ('not_approved','Not Approved'),
        ('in_progress', 'In Progress'),
        ('approved', 'Approved'),
        ]
    # IS QUOTATION APPROVED OR NOT?
    approval_status=models.CharField(default='not_approved',max_length=12, choices=STATUS)
    
    # Choices for printing process
    PROCESS=[
        ('offset','Offset'),
        ('digital','Digital'),
        ('screen','Screen'),
        ]
    # WHAT KIND OF PRINTING PROCESS USED FOR THIS PROJECT?
    printing_process=models.CharField(max_length=20,default="offset",choices=PROCESS)
    
    # WHAT TYPE OF PRODUCT IS IT? (EXAMPLE: BOOK)
    product_type=models.ForeignKey(to=Product,on_delete=models.SET_NULL, null=True)
    
    # HOW MANY COPIES WERE ORDERED BY CLIENT?
    quantity=models.IntegerField(default=1,null=False)
    
    # Choices for number of colors
    COLORS=[
        (1,'One Color (Black and White'),
        (2,'Two Colors (CMYK)'),
        (3,'Three Colors (CMYK)'),
        (4,'Full Color (CMYK)')
    ]
    # HOW MANY COLORS DOES THE PROJECT HAVE?
    no_colors=models.IntegerField(default=4,choices=COLORS)
    
    # WHEN WAS THE QUOTATION CREATED?
    created_date=models.DateTimeField(auto_now_add=True)
    
    # PATH TO WHERE CLIENT'S UPLOADED FILES ARE
    project_file_path=models.CharField(max_length=255, blank=True)
    
    # PROJECT DIMENSIONS
    project_dimensions_length=models.FloatField(default=11)
    project_dimensions_width=models.FloatField(default=8.5)
    
    # MARGIN OF ERROR TO COMPUTE EXTRA SUPPLIES NEEDED
    margin_of_error=models.FloatField(max_length=10, default=0.10)
    
    # MARKUP PERCENTAGE TO ALLOW FOR PROFIT
    markup_percentage=models.FloatField(max_length=10, default=0.45)
    
    ### PLATES / RUNNING COSTS ###
    no_plates=models.IntegerField(default=1,null=False)
    pages_can_fit=models.CharField(default=1,max_length=4)
    total_plate_costs=models.FloatField(default=0.0)
    
    ### PAPER COSTS ###
    total_paper_costs=models.FloatField(default=0.0)
    
    ### FINISHING COSTS ###
    total_lamination_costs=models.FloatField(default=0.0)
    
    ### BINDING / FOLDING / GATHERING COSTS ###
    total_binding_costs = models.FloatField(default=0.0)
    total_folds=models.IntegerField(default=1,null=False)
    total_folding_costs=models.FloatField(default=0.0)
    total_gathering_costs=models.FloatField(default=0.0)
    
    ### EXTRA COSTS ###
    cutting_costs = models.FloatField(default=0.0)
    packaging_costs = models.FloatField(default=0.0)
    transport_costs = models.FloatField(default=0.0)
    
    ### SUMMARY COSTS ###
    raw_total_costs=models.FloatField(default=0.0)
    final_unit_costs=models.FloatField(default=0.0)
    final_total_costs=models.FloatField(default=0.0)
    
class QuotationItem(models.Model):
    
    # PRIMARY KEY + FOREIGN KEY to QUOTATION
    #q_item_id=models.CharField(max_length=10,primary_key=True)
    quotation=models.ForeignKey(to=Quotation, null=True, related_name="items", on_delete=models.CASCADE)
    
    # Choices for quotation item type
    ITEM_TYPE=[
        ('inner','Inner Pages'),
        ('cover','Cover'),
        ('other','Other'), 
        ]
    
    # WHAT TYPE OF QUOTATION ITEM IS IT? Example: books have inner pages and covers
    item_type=models.CharField(default="inner",max_length=10,choices=ITEM_TYPE)
    
    # PAPER TYPE
    paper=models.ForeignKey(to=Paper, null=True, on_delete=models.SET_NULL)
    
    # LAMINATION TYPE
    lamination=models.ForeignKey(to=Lamination, null=True, on_delete=models.SET_NULL)
    
    # BINDING TYPE
    binding=models.ForeignKey(to=Binding, null=True, on_delete=models.SET_NULL)

class Plate(models.Model):
    # PRIMARY KEY + FOREIGN KEY to QUOTATION ITEM
    #plate_id=models.CharField(max_length=10,primary_key=True)
    quotation_item = models.ForeignKey(to=QuotationItem, null=True, related_name="plates", on_delete=models.CASCADE)
    
    # IMPRESSIONS
    no_impressions=models.IntegerField(default=1)
    extra_impressions=models.IntegerField(default=0)
    total_impressions=models.IntegerField(default=0)
    
    # COMPUTED RUNNING COSTS
    running_costs=models.FloatField(default=0.0)
    
# class ColorsSpecs(models.Model):
#     COLOR=[
#         ('bw','Black and White'),
#         ('color','Colored'),
#         ]
#     color_specs_id=models.CharField(max_length=15,choices=COLOR)
#     q_item_id=models.CharField(max_length=10)
#     colors_id=models.CharField(max_length=10)
#     colors_specs_desc=models.CharField(max_length=200,blank=True,null=True)
    
# class PaperSpecs(models.Model):
#     paper_specs_id=models.CharField(max_length=5)
#     q_item_id=models.CharField(max_length=10)
#     paper_id=models.CharField(max_length=10)
#     paper_specs_desc=models.CharField(max_length=200,blank=True,null=True)

# class PrintingProcessSpecs(models.Model):
#     PROCESS=[
#         ('offset','Offset'),
#         ('digital','Digital'),
#         ('screen','Screen'),
#         ]
#     process_specs_id=models.CharField(max_length=7,choices=PROCESS)
#     q_item_id=models.CharField(max_length=10)
#     process_id=models.CharField(max_length=10)
#     process_specs_desc=models.CharField(max_length=200,blank=True,null=True)
    
# class LaminationSpecs(models.Model):
#     LAMINATED=[
#         ('lam','Laminated'),
#         ('notlam','Not Laminated'),
#         ]
#     lamination_specs_id=models.CharField(max_length=13,choices=LAMINATED)
#     q_item_id=models.CharField(max_length=10)
#     lamination_id=models.CharField(max_length=10)
#     lamination_specs_desc=models.CharField(max_length=200,blank=True,null=True)
    
# class DiecutSpecs(models.Model):
#     diecut_specs_id=models.CharField(max_length=5)
#     q_item_id=models.CharField(max_length=10)
#     diecut_id=models.CharField(max_length=10)
#     diecut_specs_desc=models.CharField(max_length=200,blank=True,null=True)
    
# class BindingSpecs(models.Model):
#     binding_specs_id=models.CharField(max_length=5)
#     q_item_id=models.CharField(max_length=10)
#     binding_id=models.CharField(max_length=10)
#     binding_specs_desc=models.CharField(max_length=200,blank=True,null=True)
 
# class ColorProfile(models.Model):
#     colors_id=models.CharField(max_length=10)
#     colors_name=models.CharField(max_length=10)
#     colors_price_factor=models.FloatField(max_length=22,default=0.0)


    
