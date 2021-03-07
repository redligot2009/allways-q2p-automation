from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

from .models import Account
from .models import Invoice, JobOrder
from .models import PrintingProcess
from .models import ProductionConstants
from .models import Paper, Lamination, DieCut, Binding
from .models import Product, Quotation, QuotationItem, ExtraPlate
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

class ExtraPlateInline(nested_admin.NestedTabularInline):
    model=ExtraPlate
    extra=0
    readonly_fields=(
        'extra_impressions',
        'total_impressions',
        'running_costs',
    )
    
    
class QuotationItemInline(nested_admin.NestedStackedInline):
    model=QuotationItem
    inlines=[
        ExtraPlateInline
    ]
    extra=0
    readonly_fields=(
        'total_impressions',
        'running_costs',
        'lamination_costs',
        'paper_costs',
    )
    
@admin.register(Quotation)
class QuotationAdmin(nested_admin.NestedModelAdmin):
    fieldsets=(
        ("Project Settings", {
            'fields' : ('client',
                        'project_name',
                        'created_date',
                        'approval_status',
                        'approval_date', 
                        'printing_process',
                        'product_type',
                        'total_pages',
                        'quantity')
        }),
        ("Cost-related Settings", {
            'fields': ('markup_percentage',
                       'margin_of_error',)
        }),
        ("Project Dimensions",{
            'fields': ('page_length',
                       'page_width',
                       'spread_length',
                       'spread_width')
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
        ("Folding + Gathering Costs", {
            'fields': ('total_no_sheets',
                       'total_folds',
                       'total_signatures',
                       'total_folding_costs',
                       'total_gathering_costs',)
        }),
        ("Extra Costs", {
            'fields': ('cutting_costs',
                       'packaging_costs',
                       'transport_costs',)
        }),
        ("Summary Costs", {
            'fields': ('raw_total_costs',
                       'raw_unit_costs',
                       'final_unit_costs',
                       'final_total_costs',)
        }),
    )
    list_display=(
        'project_name',
        'client',
        'created_date',
        'approval_status',
        'approval_date',
        'product_type',
    )
    inlines=[
        QuotationItemInline
    ]
    readonly_fields=(
        'total_no_plates',
        'total_plate_costs',
        'total_no_sheets',
        'total_paper_costs',
        'total_running_costs',
        'total_signatures',
        'total_folding_costs',
        'total_gathering_costs',
        'total_lamination_costs',
        'raw_total_costs',
        'raw_unit_costs',
        'final_unit_costs',
        'final_total_costs',
    )
    pass


"""
================================================
==== 4 - PROJECT SPECIFICATIONS ADMIN PAGES ====
================================================
"""

# Production constants admin page
admin.site.register(ProductionConstants)

# Paper types admin page
# admin.site.register(Paper)
@admin.register(Paper)
class PaperAdmin(admin.ModelAdmin):
    list_display=(
        'paper_type',
        'paper_dimensions',
        'is_colored',
        'is_sticker',
        'paper_category',
        'ream_cost',
        'leaf_cost',
    )
    
    actions=['make_sticker', 'make_non_sticker',
             'make_colored', 'make_non_colored']
    
    ordering=('paper_category','paper_type','paper_width','paper_height','ream_cost','leaf_cost',)
    
    save_as = True
    
    def make_sticker(self,request,queryset):
        queryset.update(is_sticker='y')
    make_sticker.short_description='Change to sticker'
    
    def make_non_sticker(self,request,queryset):
        queryset.update(is_sticker='n')
    make_non_sticker.short_description='Change to non-sticker'
    
    def make_colored(self,request,queryset):
        queryset.update(is_colored='y')
    make_colored.short_description='Change to colored'
    
    def make_non_colored(self,request,queryset):
        queryset.update(is_colored='n')
    make_non_colored.short_description='Change to non-colored'
    

# Printing processes admin page
admin.site.register(PrintingProcess)

# Lamination types admin page
@admin.register(Lamination)
class LaminationAdmin(admin.ModelAdmin):
    list_display=(
        'lamination_type',
        'base_price',
        'min_rate',
    )
    save_as = True

# Diecut types admin page
admin.site.register(DieCut)

# Binding types admin page
@admin.register(Binding)
class BindingAdmin(admin.ModelAdmin):
    list_display=(
        'binding_type',
        'binding_base_price',
    )
    save_as = True

