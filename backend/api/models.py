from django.db import models
from django.db.models.fields.related import ForeignKey
from django.utils import timezone
from django.contrib.auth.models import User, Group
from django.db.models.signals import post_save
from django.dispatch import receiver
import logging

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
    
    def __str__(self):
        return "%s" % (self.full_name)
    
    mobile_number=models.CharField(default="",max_length=20,blank=True)
    
    # Client Specific Fields
    shipping_address=models.CharField(default="",max_length=150, blank=True)
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
        return self.user.username

@receiver(post_save,sender=User)
def create_user_account(sender,instance,created,**kwargs):
    if (kwargs.get('created', True) and not kwargs.get('raw', False)):
        if created:
            Account.objects.create(user=instance)

@receiver(post_save,sender=User)
def save_user_account(sender,instance,created,**kwargs):
    if (kwargs.get('created', True) and not kwargs.get('raw', False)):
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
    
production_constants = ProductionConstants.objects.all().first()

class Quotation(models.Model):
    
    ### PROJECT-WIDE SETTINGS ###
    
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
    project_dimensions_length=models.FloatField(default=11)
    project_dimensions_width=models.FloatField(default=8.5)
    
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
            total_plates += item.plates.all().count() * item.no_colors
        return total_plates
    total_no_plates=property(get_total_no_plates)
    
    # Total costs for all plates in the entire project
    # total_plate_costs=models.FloatField(default=0.0)
    def get_total_plate_costs(self):
        # logging.log(level=100,msg=production_constants.plate_base_price)
        return self.total_no_plates * production_constants.plate_base_price
    total_plate_costs=property(get_total_plate_costs)
    
    # Total costs for running all plates in the entire project
    def get_total_running_costs(self):
        total = 0.0
        for item in self.items.all():
            total += item.quotation_running_costs
        return total
    total_running_costs=property(get_total_running_costs)
    
    ### PAPER COSTS ###
    # Get exact number of sheets
    def get_exact_no_sheets(self):
        return int(self.total_pages/self.pages_can_fit)
    exact_no_sheets=property(get_exact_no_sheets)
    
    # Get extra sheets ordered
    def get_extra_sheets(self):
        return int(self.margin_of_error * self.exact_no_sheets)
    extra_sheets = property(get_extra_sheets)
    
    # Get total number of sheets
    def get_total_no_sheets(self):
        return self.quantity * (self.exact_no_sheets + self.extra_sheets)
    total_no_sheets=property(get_total_no_sheets)
    
    # Total costs for all paper in the entire project
    # total_paper_costs=models.FloatField(default=0.0)
    # TODO: Refactor so it is not an unmaintainable piece of shit.
    def get_total_paper_costs(self):
        # Running sum of paper costs
        paper_costs = 0
        for item in self.items.all():
            # "Extract" how many sheets of paper for a particular item is needed
            item_exact_no_sheets = 1
            item_extra_no_sheets = 0
            item_total_no_sheets = 1
            # Cover only has 2 pages at most, therefore it takes only 1 sheet to print a single copy's cover
            if item.item_type == 'cover':
                item_exact_no_sheets = 1
                item_extra_no_sheets = item_exact_no_sheets * self.margin_of_error
                item_total_no_sheets = (self.quantity*item_exact_no_sheets) + item_extra_no_sheets
            else:
                # Default case, either inner pages or "other." If there is a cover, it might be possible that you need an extra sheet
                item_exact_no_sheets = self.exact_no_sheets + (1 if item.item_type == 'inner' else 0)
                item_extra_no_sheets = item_exact_no_sheets * self.margin_of_error
                item_total_no_sheets = (self.quantity*item_exact_no_sheets)+item_extra_no_sheets
            # Some papers have a ream_cost, some only have leaf_cost
            if item.paper.ream_cost != 0.0:
                # 500 sheets = 1 ream. The code below just gets the cost of all reams, and the cost of the extra leaves you need afterwards 
                no_reams = int(item_total_no_sheets / 500)
                total_reams_cost = no_reams * item.paper.ream_cost 
                extra_leaves_cost = item.paper.leaf_cost * (item_total_no_sheets-(no_reams*500))
                # Adds to running sum of paper costs so far
                paper_costs += total_reams_cost + extra_leaves_cost
            else:
                # If there is no ream cost, then number of leaves = number of sheets.
                # Therefore, you just multiply the item_total_no_sheets by the leaf cost to get total paper costs
                paper_costs += item_total_no_sheets * item.paper.leaf_cost
        # Return the result of the algorithm above^
        return paper_costs
    total_paper_costs = property(get_total_paper_costs)
    
    ### FINISHING COSTS ###
    
    # Total costs for lamination for the entire project
    def get_total_lamination_costs(self):
        total = 0
        for item in self.items.all():
            total += item.lamination_costs
        return total
    total_lamination_costs=property(get_total_lamination_costs)
    
    ### BINDING / FOLDING / GATHERING COSTS ###
    total_binding_costs = models.FloatField(default=0.0)
    
    # How many folds does this project have?
    total_folds=models.IntegerField(default=1,null=False)
    
    # How many signatures (one-sided pages) are in this project?
    def get_total_signatures(self):
        return 2 * self.exact_no_sheets
    total_signatures = property(get_total_signatures)
    
    # Get total folding costs
    def get_total_folding_costs(self):
        return (self.total_folds * production_constants.base_price_fold * self.total_signatures)
    total_folding_costs=property(get_total_folding_costs)
    
    # Get total gathering costs
    def get_gathering_costs(self):
        return production_constants.base_price_fold * self.total_signatures
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

item_paper = Paper.objects.all().first()
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
    
    # Choices for number of colors
    COLORS=[
        (1,'One Color (Black and White'),
        (2,'Two Colors (CMYK)'),
        (3,'Three Colors (CMYK)'),
        (4,'Full Color (CMYK)')
    ]
    # HOW MANY COLORS DOES THE PROJECT HAVE?
    no_colors=models.IntegerField(default=4,choices=COLORS)
    
    # PAPER TYPE
    paper=models.ForeignKey(to=Paper, null=True, on_delete=models.SET_NULL)
    
    # LAMINATION TYPE
    lamination=models.ForeignKey(to=Lamination, null=True, on_delete=models.SET_NULL, blank=True)
    
    # Lamination costs for a single quotation item 
    lamination_costs=models.FloatField(default=0.0,null=True,blank=True)
    
    # BINDING TYPE
    binding=models.ForeignKey(to=Binding, null=True, on_delete=models.SET_NULL, blank=True)
    
    # Running costs for all plates of a particular quotation item
    #quotation_running_costs=models.FloatField(default=0.0,null=True,blank=True)

    def get_plates(self):
        return self.plates.objects.all()
    quotation_item_plates = property(get_plates)


    def get_quotation_quantity(self):
        return self.items.values('quantity')
    quotation_quantity = property(get_quotation_quantity)

    def get_quotation_margin_of_error(self):
        return self.items.values('margin_of_error')
    quotation_margin_of_error = property(get_quotation_margin_of_error)


    def get_quotation_item_running_costs(self,plates):
        total = 0.0
        for plate in quotation_item_plates:
            total += plates.running_costs
        return total
    quotation_item_running_costs = property(get_quotation_item_running_costs)

    def get_lamination_costs(self):
        # Check if quotation item does have lamination
        if (self.lamination != None):
            # To get lamination costs, first:
            # Figure out total pages to be laminated for the particular item.
            # Then: get area of the paper's spread size
            # Then: figure out extra_paper needed to be laminated in case something goes wrong
            # Then: return the (area_of_paper) *
                # constant lamination factor (0.00625 pesos per sqinch) *
                # (total_pages_to_laminate + extra_paper)
            no_pages = Quotation.total_pages
            if (self.item_type == "cover"):
                no_pages = 1
            area_of_paper = item_paper.values('paper_height') * item_paper.values('paper_width')
            total_pages_to_laminate = no_pages * quotation_quantity
            extra_paper = total_pages_to_laminate * quotation_margin_of_error
            return area_of_paper * production_constants.lamination_factor * (total_pages_to_laminate + extra_paper)
        else:
            # If item has no lamination specified, the costs are zero
            return 0.0
    quotation_item_lamination_costs = property(get_lamination_costs)
    
    
class Plate(models.Model):
    # QUOTATION ITEM THAT PLATE IS ASSOCIATED WITH
    quotation_item = models.ForeignKey(to=QuotationItem, null=True, related_name="plates", on_delete=models.CASCADE)

    def get_quotation_item_margin_of_error(self):
        return self.quotation_item.quotation.margin_of_error
    quotation_item_margin_of_error = property(get_quotation_item_margin_of_error)

    def get_plates_no_colors(self):
        return self.plates.values('no_colors')
    plates_no_colors = property(get_plates_no_colors)

    # IMPRESSIONS
    no_impressions=models.IntegerField(default=1)
    #extra_impressions=models.IntegerField(default=0)
    def get_extra_impressions(self):
        return self.no_impressions * quotation_item_margin_of_error
    extra_impressions = property(get_extra_impressions)

    #total_impressions=models.IntegerField(default=0)
    def get_total_impressions(self):
        return self.no_impressions + extra_impressions
    total_impressions = property(get_total_impressions)
    
    # COMPUTED RUNNING COSTS
    #running_costs=models.FloatField(default=0.0)
    def get_running_costs(self, production_constants):
        # For first 1000 impressions, the cost of running is 200 pesos per color for a single plate
        # For each succedding 1000 impressions, you add 200 more pesos.
        # Multiply this by the number of colors a particular item has.
        # That's what the code below does:
        remaining_impressions = min(total_impressions - 1000.0)
        return plates_no_colors * (production_constants.min_rate_running + (200 * int(remaining_impressions / 1000)))
