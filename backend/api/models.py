from datetime import date
from django.db import models
from django.db.models.fields.related import ForeignKey
from django.utils import timezone
from django.contrib.auth.models import User, Group
from django.db.models.signals import post_save
from django.dispatch import receiver
import logging

"""
==== 0 - ABSTRACT MODELS ====
=============================
"""

"""
Singleton Model Abstract Class
"""
class SingletonModel(models.Model):
    class Meta:
        abstract = True
    def save(self, *args, **kwargs):
        self.pk = 1
        super(SingletonModel, self).save(*args, **kwargs)
    def delete(self, *args, **kwargs):
        pass
    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

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
        if(self.middle_name != None):
            return "%s %s %s" % (self.user.first_name, self.middle_name, self.user.last_name)
        else:
            return "%s %s" % (self.user.first_name, self.user.last_name)
    
    def __str__(self):
        return self.user.username
    
    mobile_number=models.CharField(default="",max_length=20,blank=True,null=True)
    
    # Client Specific Fields
    shipping_address=models.CharField(default="",max_length=150, blank=True,null=True)
    # Name of organization (Ex: ADHD Society of the Philippines)
    organization_name=models.CharField(default="",max_length=255,blank=True,null=True)
    
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
        try:
            return self.user.username
        except:
            return ""

@receiver(post_save,sender=User)
def create_user_account(sender,instance,created,**kwargs):
    if (kwargs.get('created', True) and not kwargs.get('raw', False)):
        if created and not instance.is_superuser:
            Account.objects.create(user=instance)

@receiver(post_save,sender=User)
def save_user_account(sender,instance,created,**kwargs):
    if (kwargs.get('created', True) and not kwargs.get('raw', False)):
        if created and not instance.is_superuser:
            instance.account.save()


"""    
=============================================
==== 2 - SET UP QUOTATION RELATED MODELS ====
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

class ProductionConstants(SingletonModel):

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
        
    IS_COLOR=[
        ('y','Yes'),
        ('n','No'),
        ]
    IS_STICKER=[
        ('y','Yes'),
        ('n','No'),
        ]
    
    # PAPER INFORMATION
    paper_type=models.CharField(max_length=150)
    paper_category=models.CharField(max_length=100)
    
    def __str__(self):
        return self.paper_type
    
    # PAPER DIMENSIONS
    paper_length=models.FloatField(default=25.0)
    paper_width=models.FloatField(default=38.0)
    
    def get_dimensions(self):
        return "{}\" x {}\"".format(self.paper_length, self.paper_width)
    paper_dimensions = property(get_dimensions)
    
    # PAPER COSTS (LEAF AND REAM)
    ream_cost=models.FloatField(max_length=22,default=0.0,blank=True,null=True)
    sheet_cost=models.FloatField(max_length=22,default=0.0,blank=True,null=True)
    
    # IS PAPER COLORED OR A STICKER TYPE OF PAPER?
    is_colored=models.CharField(default="n",max_length=1,choices=IS_COLOR)
    is_sticker=models.CharField(default="n",max_length=10,choices=IS_STICKER)
    
class PrintingProcess(models.Model):
    process_name=models.CharField(max_length=10, blank=True)
    process_base_factor=models.FloatField(max_length=22,default=0.0)
    
    class Meta:
        verbose_name_plural="Printing Processes"
        
class Lamination(models.Model):
    lamination_type=models.CharField(max_length=150)
    base_price=models.FloatField(max_length=22,default=0.0, null=True, blank=True)
    min_rate=models.FloatField(max_length=22,default=0.0, null=True, blank=True)
    
    def __str__(self):
        return self.lamination_type
    
    class Meta:
        verbose_name_plural="Lamination Types"

class DieCut(models.Model):
    diecut_type=models.CharField(max_length=10)
    diecut_base_price=models.FloatField(max_length=22,default=0.0, null=True, blank=True)
    
    def __str__(self):
        return self.diecut_type
    
    class Meta:
        verbose_name_plural="Diecut Types"

class Binding(models.Model):
    binding_type=models.CharField(max_length=150)
    binding_base_price=models.FloatField(max_length=22, null=True, blank=True)
    
    def __str__(self):
        return self.binding_type
    
    class Meta:
        verbose_name_plural="Binding Types"
    
class Product(models.Model):
    product_name=models.CharField(max_length=20)
    product_price=models.FloatField(max_length=22, default=0.0, null=True, blank=True)
    product_description=models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.product_name
    
    class Meta:
        verbose_name_plural="Product Types"

class Quotation(models.Model):
    
    ### PROJECT-WIDE SETTINGS ###
    
    # Reference to production_constants
    try:
        production_constants = ProductionConstants.load()
    except:
        production_constants = None
    
    # Which client created this quotation?
    client = models.ForeignKey(to=Account,null=True,blank=True,on_delete=models.SET_NULL)
    
    # What is this project anyway? (example: Software Engineering 12th Edition, 1st run)
    project_name = models.CharField(default="Unnamed Project",max_length=255,null=False)
    
    # When was the request for quotation created by client?
    created_date = models.DateTimeField(default=timezone.now(),null=False)
    
    # String representation of a quotation
    def __str__(self):
        return "%s" % self.project_name
    
    # Choices for approval status
    STATUS=[
        ('computed','Computed'),
        ('not_approved','Not Approved'),
        ('in_progress', 'In Progress'),
        ('approved', 'Approved'),
        ]
    # IS QUOTATION APPROVED OR NOT?
    approval_status=models.CharField(default='in_progress',max_length=12, choices=STATUS)
    # DATE OF APPROVAL
    approval_date=models.DateTimeField(null=True,blank=True)
    
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
    
    # HOW MANY PAGES DOES A SINGLE COPY HAVE?
    total_pages=models.IntegerField(default=1,null=False)
    
    # WHEN WAS THE QUOTATION CREATED?
    created_date=models.DateTimeField(default=timezone.now(),null=False)
    
    # PATH TO WHERE CLIENT'S UPLOADED FILES ARE
    project_file_path=models.CharField(max_length=255, blank=True)
    
    # PROJECT DIMENSIONS
    page_length=models.FloatField(default=11)
    page_width=models.FloatField(default=8.5)
    
    spread_length=models.FloatField(default=11)
    spread_width=models.FloatField(default=17)
    
    # MARGIN OF ERROR TO COMPUTE EXTRA SUPPLIES NEEDED
    margin_of_error=models.FloatField(max_length=10, default=0.10)
    
    # MARKUP PERCENTAGE TO ALLOW FOR PROFIT
    markup_percentage=models.FloatField(max_length=10, default=0.45)
    
    ### PLATES / RUNNING COSTS ###
    # Number of pages that can fit on a single one-sided plate
    pages_can_fit=models.IntegerField(default=1,blank=False)
    
    # Number of plates in the entire project
    def get_total_no_plates(self):
        total_plates = 0
        for item in self.items.all():
            total_plates += (item.no_plates_per_copy + item.extra_plates.all().count()) * item.no_colors
        return total_plates
    total_no_plates=property(get_total_no_plates)
    
    # Total costs for all plates in the entire project
    
    def get_total_plate_costs(self):
        # logging.log(level=100,msg=production_constants.plate_base_price)
        try:
            return self.total_no_plates * self.production_constants.plate_base_price
        except:
            return 0.0
    total_plate_costs=property(get_total_plate_costs)
    
    # Total costs for running all plates in the entire project
    def get_total_running_costs(self):
        total = 0.0
        for item in self.items.all():
            total += item.running_costs
            for plate in item.extra_plates.all():
                total += plate.running_costs
        return total
    total_running_costs=property(get_total_running_costs)
    
    ### PAPER COSTS ###
    def get_total_no_sheets(self):
        total = 0
        for item in self.items.all():
            total += item.no_sheets_ordered_for_copy
        return total
    total_no_sheets=property(get_total_no_sheets)
    
    # Get all paper types
    def get_paper_types(self):
        result = ""
        for i in range(0,len(self.items.all())):
            item = self.items.all()[i]
            result += str(item.paper) + " (" + item.item_type + ")"
            if(i < len(self.items.all())-1):
                result += ', '
        return result
    paper_types = property(get_paper_types)
    
    # Total costs for all paper in the entire project
    
    def get_total_paper_costs(self):
        # Running sum of paper costs
        total = 0
        for item in self.items.all():
            total += item.paper_costs
        return total
    total_paper_costs = property(get_total_paper_costs)
    
    ### FINISHING COSTS ###
    
    # Get all paper types
    def get_lamination_types(self):
        result = ""
        for i in range(0,len(self.items.all())):
            item = self.items.all()[i]
            result += str(item.lamination) + " (" + item.item_type + ")"
            if(i < len(self.items.all())-1):
                result += ', '
        return result
    lamination_types = property(get_lamination_types)
    
    # Total costs for lamination for the entire project
    def get_total_lamination_costs(self):
        total = 0
        for item in self.items.all():
            total += item.lamination_costs
        return total
    total_lamination_costs=property(get_total_lamination_costs)
    
    ### BINDING / FOLDING / GATHERING COSTS ###
    
    # Get all paper types
    def get_binding_types(self):
        result = ""
        for i in range(0,len(self.items.all())):
            item = self.items.all()[i]
            result += str(item.binding) + " (" + item.item_type + ")"
            if(i < len(self.items.all())-1):
                result += ', '
        return result
    binding_types = property(get_binding_types)
    
    # Total binding costs for a quotation (entered by manager)
    total_binding_costs = models.FloatField(default=0.0)
    
    # How many folds does this project have?
    total_folds=models.IntegerField(default=1,null=False)
    
    # How many signatures (one-sided pages) are in this project?
    def get_total_signatures(self):
        return 2 * self.total_no_sheets
    total_signatures = property(get_total_signatures)
    
    # Get total folding costs
    def get_total_folding_costs(self):
        try:
            return (self.total_folds * self.production_constants.base_price_fold * self.total_signatures)
        except:
            return 0.0
    total_folding_costs=property(get_total_folding_costs)
    
    # Get total gathering costs
    def get_gathering_costs(self):
        try:
            return self.production_constants.base_price_fold * self.total_signatures
        except:
            return 0.0
    total_gathering_costs = property(get_gathering_costs)
    
    ### EXTRA COSTS ###
    cutting_costs = models.FloatField(default=0.0)
    packaging_costs = models.FloatField(default=0.0)
    transport_costs = models.FloatField(default=0.0)
    
    ### SUMMARY COSTS ###
    # Get raw total costs of entire project w/o markup
    def get_raw_total_costs (self):
        return (self.total_plate_costs + self.total_running_costs + 
                    self.total_paper_costs + 
                    (self.total_folding_costs + self.total_gathering_costs + self.total_binding_costs) +  
                    self.total_lamination_costs + 
                    self.packaging_costs + self.transport_costs
                )
    raw_total_costs=property(get_raw_total_costs)
    
    # Get raw unit costs of a single copy w/o markup
    def get_raw_unit_costs (self):
        return float(self.raw_total_costs/self.quantity)
    raw_unit_costs=property(get_raw_unit_costs)
    
    # Get markup costs to add to raw total costs for profit
    def get_markup_costs(self):
	    return self.markup_percentage * self.raw_total_costs
    markup_costs=property(get_markup_costs)
    
    # Get final total costs for the entire project w/ markup
    def get_final_total_costs(self):
	    return self.raw_total_costs + self.markup_costs
    final_total_costs=property(get_final_total_costs)
    
    # Get final unit costs for a single copy in the project
    def get_final_unit_costs(self):
	    return float(self.final_total_costs / self.quantity)
    final_unit_costs=property(get_final_unit_costs)

class QuotationItem(models.Model):
    
    # QUOTATION THAT THE ITEM IS ASSOCIATED WITH
    quotation=models.ForeignKey(to=Quotation, null=True, related_name="items", on_delete=models.CASCADE)
    
    # Reference to production_constants
    try:
        production_constants = ProductionConstants.load()
    except:
        production_constants = None
    
    # Choices for quotation item type
    ITEM_TYPE=[
        ('inner','Inner Pages'),
        ('cover','Cover'),
        ('other','Other'), 
        ]
    
    # WHAT TYPE OF QUOTATION ITEM IS IT? Example: books have inner pages and covers
    item_type=models.CharField(default="inner",max_length=10,choices=ITEM_TYPE)
    
    def __str__(self):
        return self.item_type
    
    # Choices for number of colors
    COLORS=[
        (1,'One Color (Black and White'),
        (2,'Two Colors (CMYK)'),
        (3,'Three Colors (CMYK)'),
        (4,'Full Color (CMYK)')
    ]
    # HOW MANY COLORS DOES THE ITEM HAVE?
    no_colors=models.IntegerField(default=4,choices=COLORS)
    
    # PLATE RUNNING COSTS
    # How many plates are there for a single copy for this item?
    no_plates_per_copy=models.IntegerField(default=1)
    
    ### NOTE: Put impressions + running costs in quotation item.
    
    # IMPRESSIONS per plate
    no_impressions_per_plate=models.IntegerField(default=1)
    
    # Extra Impressions per plate
    def get_extra_impressions(self):
        return self.no_impressions_per_plate * self.quotation.margin_of_error
    extra_impressions = property(get_extra_impressions)

    # Get total_impressions for a single copy, for a single Item
    def get_total_impressions(self):
        return (self.no_plates_per_copy * self.no_impressions_per_plate) + self.extra_impressions
    total_impressions = property(get_total_impressions)
    
    # COMPUTED RUNNING COSTS
    def get_running_costs(self):
        # For first 1000 impressions, the cost of running is 200 pesos per color for a single plate
        # For each succedding 1000 impressions, you add 200 more pesos.
        # Multiply this by the number of colors a particular item has.
        # That's what the code below does:
        try:
            remaining_impressions = max(self.total_impressions - 1000.0,0)
            return self.no_colors * (self.production_constants.min_rate_running + (200 * int(remaining_impressions / 1000)))
        except:
            return 0.0
    running_costs = property(get_running_costs)
    
    # PAPER TYPE
    paper=models.ForeignKey(to=Paper, null=True, on_delete=models.SET_NULL)
    
    # Number of sheets ordered from paper supplier of this particular paper type
    no_sheets_ordered_for_copy = models.FloatField(default=1)
    
    # Paper costs for particular quotation item
    def get_paper_costs(self):
        if(self.paper.ream_cost != 0):
            no_reams = (self.quotation.quantity * self.no_sheets_ordered_for_copy)/500
            return (no_reams * self.paper.ream_cost)
        else:
            return ((self.quotation.quantity * self.no_sheets_ordered_for_copy) * self.paper.sheet_cost)
    paper_costs = property(get_paper_costs)
    
    # LAMINATION TYPE
    lamination=models.ForeignKey(to=Lamination, null=True, on_delete=models.SET_NULL, blank=True)
    
    # Lamination costs for a single quotation item 
    def get_lamination_costs(self):
        # Laminate only on spread size of cover
        try:
            # Check if quotation item does have lamination
            if (not self.lamination is None):
                area_of_paper = self.quotation.spread_length * self.quotation.spread_width
                return max(self.lamination.min_rate, self.quotation.quantity * area_of_paper * self.lamination.base_price)
            else:
                # If item has no lamination specified, the costs are zero
                return 0.0
        except:
            return 0
    lamination_costs = property(get_lamination_costs)
    
    # BINDING TYPE
    binding=models.ForeignKey(to=Binding, null=True, on_delete=models.SET_NULL, blank=True)
    
    
class ExtraPlate(models.Model):
    # QUOTATION ITEM THAT PLATE IS ASSOCIATED WITH
    quotation_item = models.ForeignKey(to=QuotationItem, null=True, related_name="extra_plates", on_delete=models.CASCADE)

    # Name of extra plate
    extra_plate_name = models.CharField(default="Extra Plate",max_length=150,blank=False)

    # Reference to production_constants
    try:
        production_constants = ProductionConstants.load()
    except:
        production_constants = None
    
    ### NOTE: Put impressions + running costs in quotation item.
    
    # IMPRESSIONS
    no_impressions=models.IntegerField(default=1)
    
    def get_extra_impressions(self):
        return self.no_impressions * self.quotation_item.quotation.margin_of_error
    extra_impressions = property(get_extra_impressions)

    # Get total_impressions for a single Plate
    def get_total_impressions(self):
        return self.no_impressions + self.extra_impressions
    total_impressions = property(get_total_impressions)
    
    # COMPUTED RUNNING COSTS
    def get_running_costs(self):
        # For first 1000 impressions, the cost of running is 200 pesos per color for a single plate
        # For each succedding 1000 impressions, you add 200 more pesos.
        # Multiply this by the number of colors a particular item has.
        # That's what the code below does:
        try:
            remaining_impressions = min(self.total_impressions - 1000.0,0)
            return self.quotation_item.no_colors * (self.production_constants.min_rate_running + (200 * int(remaining_impressions / 1000)))
        except:
            return 0.0
    running_costs = property(get_running_costs)
    

"""
=======================================================
==== 3 - SET UP INVOICE / JOB ORDER RELATED MODELS ====
=======================================================

=== OVERALL DESCRIPTION == 
This is where the job order model is implemented.

1 quotation = 1 job order = 1 client.

When a quote is approved, it is made into a job order that is sent to the production team
who will update the status as the project moves along.

TODO: 
- Invoice Implementation (most likely not within scope of deliverable # 2)
- Test functionality of JobOrder model.

FINISHED:
- JobOrder model initial setup.

"""

# Unused Invoice model for future setup
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
 
#  JobOrder model definition. 1 job order = 1 quotation = 1 client.
class JobOrder(models.Model):
    # Different production statuses for a "job"
    STATUS=[
        ('pending','Pending'),
        ('inprogress','In-Progress'),
        ('delivery','Out for Delivery'),
        ('finished','Finished'),
        ]
    # Which manager account is associated with this job order?
    manager = models.OneToOneField(to=Account,null=True,on_delete=models.SET_NULL)
    # Quotation associated with this job order
    quotation = models.OneToOneField(to=Quotation,null=True,on_delete=models.SET_NULL)
    # Status of the "job"
    production_status=models.CharField(max_length=11, choices=STATUS)
    # When was the quotation created as a job order?
    created_date = models.DateTimeField(null=False,blank=False, default=timezone.now())