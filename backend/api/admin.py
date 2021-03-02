from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

from .models import Account
from .models import Invoice, JobOrder
from .models import PrintingProcess
from .models import ProductionConstants
from .models import Paper, Lamination, DieCut, Binding
from .models import Product, Quotation, QuotationItem, Plate
import nested_admin

""" 
===========================================
==== 1 - USER ACCOUNT ADMIN VIEW SETUP ====
===========================================
"""

class AccountInline(admin.StackedInline):
    """
    === DESCRIPTION ===
    Sets up an inline (embeddable) version of Account model.
    """
    fieldsets=(
        ("Additional Personal Information",{
            'fields': ('middle_name',
                       'shipping_address',
                       'mobile_number',)}),
        ("Employee Information",{
            'fields': ('job_position',)
            }),
        ("Owner Information",{
            'fields': ('owner_key',)
            }),
        ("Account Manager Information",{
            'fields': ('account_manager_key',)
            }),
        ("Production Staff Information",{
            'fields': ('production_staff_position',)
            }),
        ("Delivery Man Information",{
            'fields': ('plate_number',
                       'license_number',)
            }),
    )
    model=Account
    can_delete=False
    verbose_name_plural='Account'
    fk_name='user'
    extra=0

class CustomUserAdmin(UserAdmin):
    """
    === DESCRIPTION ===
    Sets up a custom UserAdmin view with the inline Account "embedded."
    """
    inlines=[
        AccountInline,
    ]
    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(CustomUserAdmin, self).get_inline_instances(request, obj)

""" 
=== DESCRIPTION ===
Unregisters default User from admin site, and re-registers it with a CustomUserAdmin view.
This is in order to allow us to "embed" the new fields defined by the Account model the 
default User model onto the admin site with its own custom layout.
"""
admin.site.unregister(User)
admin.site.register(User,CustomUserAdmin)

""" 
==========================================================
==== 2 - INVOICE / JOB ORDER RELATED ADMIN PAGE SETUP ====
==========================================================
"""

admin.site.register(Invoice)
admin.site.register(JobOrder)

"""
=========================================================================
==== 3 - PRODUCT, QUOTATION, QUOTATION ITEM, PLATE ADMIN PAGES SETUP ====
=========================================================================
"""

# Create Product model admin page
admin.site.register(Product)

"""
=== DESCRIPTION ===
1. Sets up Plate inline to be nested within Quotation Item. 
2. Sets up a Quotation Item inline to be nested within Quotation.
3. Sets up Quotation ModelAdmin to display both quotation item and plate.

By default, this would not be possible on the django-admin, but thanks
to a library called "django-nested-admin," this is made possible. 

More info on the library below:
https://github.com/theatlantic/django-nested-admin
"""

class PlateInline(nested_admin.NestedTabularInline):
    model=Plate
    extra=0
    
class QuotationItemInline(nested_admin.NestedStackedInline):
    model=QuotationItem
    inlines=[
        PlateInline
    ]
    extra=0
    
@admin.register(Quotation)
class QuotationAdmin(nested_admin.NestedModelAdmin):
    fieldsets=(
        ("Project Settings", {
            'fields' : ('approval_status', 
                        'printing_process',
                        'product_type',)
        }),
        ("Cost-related Settings", {
            'fields': ('markup_percentage',
                       'margin_of_error',)
        }),
        ("Project Dimensions",{
            'fields': ('project_dimensions_length',
                       'project_dimensions_width',)
        }),
        ("Plates / Running Costs",{
            'fields':('pages_can_fit',
                      'total_no_plates',
                      'total_plate_costs',
                      'total_running_costs',)
        }),
        ("Paper Costs", {
            'fields': ('total_paper_costs',)
        }),
        ("Finishing Costs", {
            'fields': ('total_lamination_costs',)
        }),
        ("Binding Costs", {
            'fields': ('total_binding_costs',)
        }),
        ("Folding Costs", {
            'fields': ('total_folds',
                       'total_folding_costs',)
        }),
        ("Gathering Costs", {
            'fields': ('total_gathering_costs',)
        }),
        ("Extra Costs", {
            'fields': ('cutting_costs',
                       'packaging_costs',
                       'transport_costs',)
        }),
        ("Summary Costs", {
            'fields': ('raw_total_costs',
                       'final_unit_costs',
                       'final_total_costs',)
        }),
    )
    inlines=[
        QuotationItemInline
    ]
    pass


"""
================================================
==== 4 - PROJECT SPECIFICATIONS ADMIN PAGES ====
================================================
"""

# Production constants admin page
admin.site.register(ProductionConstants)

# Paper types admin page
admin.site.register(Paper)

# Printing processes admin page
admin.site.register(PrintingProcess)

# Lamination types admin page
admin.site.register(Lamination)

# Diecut types admin page
admin.site.register(DieCut)

# Binding types admin page
admin.site.register(Binding)
