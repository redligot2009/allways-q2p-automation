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
