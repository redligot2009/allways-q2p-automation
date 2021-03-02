from django.contrib import admin
from .models import Account, Employee, DeliveryMan, Owner, AccountManager, Production
from .models import Invoice, JobOrder
from .models import PrintingProcess
from .models import ProductionConstants
from .models import Paper, Lamination, DieCut, Binding
from .models import Product, Quotation, QuotationItem, Plate
import nested_admin
# from .models import ColorsSpecs
# from .models import PaperSpecs
# from .models import PrintingProcessSpecs
# from .models import LaminationSpecs
# from .models import DiecutSpecs
# from .models import BindingSpecs
# from .models import ColorProfile

# Register your models here.

admin.site.register(Account)
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

# QUOTATION MODEL ADMIN + INLINES

class PlateInline(nested_admin.NestedTabularInline):
    model=Plate
    
class QuotationItemInline(nested_admin.NestedStackedInline):
    model=QuotationItem
    inlines=[
        PlateInline
    ]
    
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
    
@admin.register(QuotationItem)
class QuotationItemAdmin(nested_admin.NestedModelAdmin):
    inlines=[
        PlateInline,
    ]
    pass

admin.site.register(Paper)
admin.site.register(PrintingProcess)
admin.site.register(Lamination)
admin.site.register(DieCut)
admin.site.register(Binding)
admin.site.register(Plate)
admin.site.register(ProductionConstants)
