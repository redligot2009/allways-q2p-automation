from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

from .models import Account, Employee, DeliveryMan, Owner, AccountManager, Production
from .models import Invoice, JobOrder
from .models import PrintingProcess
from .models import ProductionConstants
from .models import Paper, Lamination, DieCut, Binding
from .models import Product, Quotation, QuotationItem, Plate
import nested_admin

### ACCOUNT RELATED ADMIN ###

# Setup custom UserAdmin view
class AccountInline(admin.StackedInline):
    model=Account
    can_delete=False
    verbose_name_plural='Account'
    fk_name='user'

class CustomUserAdmin(UserAdmin):
    inlines=[
        AccountInline,
    ]
    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(CustomUserAdmin, self).get_inline_instances(request, obj)

admin.site.unregister(User)
admin.site.register(User,CustomUserAdmin)

admin.site.register(Employee)
admin.site.register(DeliveryMan)
admin.site.register(Owner)
admin.site.register(AccountManager)
admin.site.register(Production)

### INVOICE / JOB ORDER RELATED ADMIN ###
admin.site.register(Invoice)
admin.site.register(JobOrder)

### QUOTATION RELATED ADMIN ###
admin.site.register(Product)

# Plate, Quotation Item, and Quotation Model Admin's / Inlines

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

### PRODUCTION CONSTANTS ADMIN ###
admin.site.register(ProductionConstants)

## PROJECT SPECIFICATIONS ADMIN ###

# Paper database admin
admin.site.register(Paper)


admin.site.register(PrintingProcess)
admin.site.register(Lamination)
admin.site.register(DieCut)
admin.site.register(Binding)
