from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User, Group
from django.db.models.signals import post_save
from django.dispatch import receiver

"""
===========================================================
==== 0 - (HARDCODED) PREPOPULATE USER AND GROUP MODELS ====
===========================================================

=== OVERALL DESCRIPTION ===
These are basically test data that ideally would be moved elsewhere as we
develop the project. Don't pay much attention to this, as eventually we 
will replace all of these hardcoded test data with proper Django fixtures.

"""

"""
=== DESCRIPTION ===
The code below creates the following test data:
1. A Group object for clients
2. A Group object for employees
3. Group objects for each of the four employee types: 
    (Owners, Account Managers, Deliverymen, Production Staff)

What are Django groups anyway? Think of it as a way to associate users
into groups, with a particular set of permissions that restrict what they 
can do on the system. It will be useful eventually once we develop the 
different API endpoints which can only be used by certain kinds of users. :)

TODO:
- Set up permissions for each group (what can they create, retrieve, update, delete)

"""

try:
    client_group = Group.objects.get(name="Clients")
except Group.DoesNotExist:
    Group.objects.create(name="Clients").save()

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
    delivery_man_group = Group.objects.get(name="Delivery Men")
except Group.DoesNotExist:
    Group.objects.create(name="Delivery Men").save()

try:
    delivery_man_group = Group.objects.get(name="Production Staff")
except Group.DoesNotExist:
    Group.objects.create(name="Production Staff").save()

"""
===========================================
==== 1 - SET UP ACCOUNT RELATED MODELS ====
===========================================
"""

class Account(models.Model):
    user = models.OneToOneField(User,null=True,on_delete=models.CASCADE)
    middle_name=models.CharField(null=True,blank=True,max_length=20)
    
    @property
    def full_name(self):
        return "%s %s %s" % (self.user.first_name, self.middle_name, self.user.last_name)
    shipping_address=models.CharField(default="",max_length=150, blank=True)
    mobile_number=models.CharField(default="",max_length=20,blank=True)
    
    # Employee Specific Fields
    EMPLOYEE_TYPE=[
        ('O', 'Owner'),
        ('AM', 'Account Manager'),
        ('D', 'Deliveryman'),
        ('P', 'Production Employee'),
        ]
    job_position=models.CharField(null=True,blank=True,max_length=2, choices=EMPLOYEE_TYPE)
    
    # Delivery Man Specific Fields
    plate_number=models.CharField(null=True,blank=True,max_length=20)
    license_number=models.CharField(null=True,blank=True,max_length=20)
    
    # Owner Specific Fields
    owner_key=models.CharField(null=True,blank=True,max_length=20)
    
    # Account Manager Specific Fields
    account_manager_key=models.CharField(null=True,blank=True,max_length=20)
    
    # Production Staff Specific Fields
    production_staff_position=models.CharField(null=True,blank=True,max_length=20)
    
    def __str__(self):
        return self.user.username

@receiver(post_save,sender=User)
def create_user_account(sender,instance,created,**kwargs):
    if created:
        Account.objects.create(user=instance)

@receiver(post_save,sender=User)
def save_user_account(sender,instance,created,**kwargs):
    instance.account.save()

"""
=======================================================
==== 2 - SET UP INVOICE / JOB ORDER RELATED MODELS ====
=======================================================

=== OVERALL DESCRIPTION == 
This is where all the invoice and job order stuff will *eventually*
get set up. Right now that's not yet done since we don't need it yet
for Deliverable #1.

TODO:
Actually make this thing work.

"""

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

"""    
=============================================
==== 3 - SET UP QUOTATION RELATED MODELS ====
=============================================

=== Overall Description ===
This is where all the quotation related models are set up.
This includes the likes of:
- Product Types
- Quotations
- Quotation Items
- Plates

...as well as

- Paper Types
- Binding Types
- Lamination Types

... and finally ...
- Production Constants

TODO
- Implement the actual computation logic
"""

class ProductionConstants(models.Model):
    plate_base_price=models.FloatField(default=250.0)
    base_price_fold=models.FloatField(default=90.0)
    lamination_factor=models.FloatField(default=0.00625)
    min_rate_running=models.FloatField(default=400.0)
    
    def __str__(self):
        return "Production Constants"
    
    class Meta:
        verbose_name_plural="Production Constants"

class Paper(models.Model):
    
    class Meta:
        verbose_name_plural="Paper Types"
        
    ISCOLOR=[
        ('y','Yes'),
        ('n','No'),
        ]
    ISSTICKER=[
        ('y','Yes'),
        ('n','No'),
        ]
    
    # PAPER INFORMATION
    paper_type=models.CharField(max_length=150, default="Book 60")
    paper_category=models.CharField(max_length=100)
    
    def __str__(self):
        return self.paper_type
    
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
    
    class Meta:
        verbose_name_plural="Printing Processes"
        
class Lamination(models.Model):
    lamination_type=models.CharField(max_length=150, blank=True)
    lamination_base_price=models.FloatField(max_length=22,default=0.0)
    
    def __str__(self):
        return self.lamination_type
    
    class Meta:
        verbose_name_plural="Lamination Types"

class DieCut(models.Model):
    diecut_type=models.CharField(max_length=10, blank=True)
    diecut_base_price=models.FloatField(max_length=22,default=0.0)
    
    def __str__(self):
        return self.diecut_type
    
    class Meta:
        verbose_name_plural="Diecut Types"

class Binding(models.Model):
    binding_type=models.CharField(max_length=150, blank=True)
    binding_base_price=models.FloatField(max_length=22,default=0.0)
    
    def __str__(self):
        return self.binding_type
    
    class Meta:
        verbose_name_plural="Binding Types"
    
class Product(models.Model):
    #product_number=models.CharField(max_length=5,primary_key=True)
    product_name=models.CharField(max_length=20, blank=True)
    product_price=models.FloatField(max_length=22, default=0.0)
    product_description=models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.product_name
    
    class Meta:
        verbose_name_plural="Product Types"
    

class Quotation(models.Model):
    
    ### PROJECT-WIDE SETTINGS ###
        
    # Choices for approval status
    STATUS=[
        ('not_approved','Not Approved'),
        ('in_progress', 'In Progress'),
        ('approved', 'Approved'),
        ]
    # IS QUOTATION APPROVED OR NOT?
    approval_status=models.CharField(default='in_progress',max_length=12, choices=STATUS)
    
    # Choices for printing process
    PROCESS=[
        ('offset','Offset'),
        ('digital','Digital'),
        ('screen','Screen'),
        ]
    
    # WHAT KIND OF PRINTING PROCESS USED FOR THIS PROJECT?
    printing_process=models.CharField(max_length=20,default="offset",choices=PROCESS)
    
    # WHAT TYPE OF PRODUCT IS IT? (EXAMPLE: BOOK)
    product_type=models.ForeignKey(to=Product,on_delete=models.SET_NULL, null=True, blank=True)
    
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
    # Number of pages that can fit on a single one-sided plate
    pages_can_fit=models.CharField(default=1,max_length=4)
    # Number of plates in the entire project
    total_no_plates=models.IntegerField(default=1,null=False)
    # Total costs for all plates in the entire project
    total_plate_costs=models.FloatField(default=0.0)
    # Total costs for running all plates in the entire project
    total_running_costs=models.FloatField(default=0.0)
    
    ### PAPER COSTS ###
    # Total costs for all paper in the entire project
    total_paper_costs=models.FloatField(default=0.0)
    
    ### FINISHING COSTS ###
    # Total costs for lamination for the entire project
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
    
    # QUOTATION THAT THE ITEM IS ASSOCIATED WITH
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
    lamination=models.ForeignKey(to=Lamination, null=True, on_delete=models.SET_NULL, blank=True)
    
    # BINDING TYPE
    binding=models.ForeignKey(to=Binding, null=True, on_delete=models.SET_NULL, blank=True)
    
class Plate(models.Model):
    # QUOTATION ITEM THAT PLATE IS ASSOCIATED WITH
    quotation_item = models.ForeignKey(to=QuotationItem, null=True, related_name="plates", on_delete=models.CASCADE)
        
    # IMPRESSIONS
    no_impressions=models.IntegerField(default=1)
    extra_impressions=models.IntegerField(default=0)
    total_impressions=models.IntegerField(default=0)
    
    # COMPUTED RUNNING COSTS
    running_costs=models.FloatField(default=0.0)
    