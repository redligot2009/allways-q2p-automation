from django.contrib import admin
from .models import Account, Employee, DeliveryMan, Owner, AccountManager, Production
from .models import Invoice, JobOrder
from .models import PrintingProcess
from .models import ProductionConstants
from .models import Paper, Lamination, DieCut, Binding
from .models import Product, Quotation, QuotationItem, Plate
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
admin.site.register(Invoice)
admin.site.register(Product)
admin.site.register(JobOrder)
admin.site.register(DeliveryMan)
admin.site.register(Owner)
admin.site.register(AccountManager)
admin.site.register(Production)
admin.site.register(Quotation)
admin.site.register(QuotationItem)
admin.site.register(Paper)
admin.site.register(PrintingProcess)
admin.site.register(Lamination)
admin.site.register(DieCut)
admin.site.register(Binding)
admin.site.register(Plate)
admin.site.register(ProductionConstants)
