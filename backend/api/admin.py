from django.contrib import admin
from .models import Accounts
from .models import Employee
from .models import Invoice
from .models import Product
from .models import JobOrder
from .models import DeliveryMan
from .models import Owner
from .models import AccountManager
from .models import Production
from .models import Quotation
from .models import QuotationItem
from .models import ColorsSpecs
from .models import PaperSpecs
from .models import PrintingProcessSpecs
from .models import LaminationSpecs
from .models import DiecutSpecs
from .models import BindingSpecs
from .models import ColorProfile
from .models import Paper
from .models import PrintingProcess
from .models import Lamination
from .models import DieCut
from .models import Binding
from .models import Plate
from .models import ProductionConstants

# Register your models here.

admin.site.register(Accounts)
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
admin.site.register(ColorsSpecs)
admin.site.register(PaperSpecs)
admin.site.register(PrintingProcessSpecs)
admin.site.register(LaminationSpecs)
admin.site.register(DiecutSpecs)
admin.site.register(BindingSpecs)
admin.site.register(ColorProfile)
admin.site.register(Paper)
admin.site.register(PrintingProcess)
admin.site.register(Lamination)
admin.site.register(DieCut)
admin.site.register(Binding)
admin.site.register(Plate)
admin.site.register(ProductionConstants)
