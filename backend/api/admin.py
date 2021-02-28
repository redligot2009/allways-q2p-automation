from django.contrib import admin
from .models import Accounts
from .models import Employee
from .models import Invoice
from .models import Product
from .models import JobOrder


# Register your models here.

admin.site.register(Accounts)
admin.site.register(Employee)
admin.site.register(Invoice)
admin.site.register(Product)
admin.site.register(JobOrder)
