from django.db import models
from django.utils import timezone

# Create your models here.

class Accounts(models.Model):
    email=models.CharField(max_length=20)
    passw=models.CharField(max_length=20)
    first_name=models.CharField(max_length=20)
    middle_name=models.CharField(max_length=20, blank=True, null=True)
    surname=models.CharField(max_length=20)
    username=models.CharField(max_length=20)
    shipping_address=models.CharField(max_length=200)
    mobile_number=models.IntegerField(max_length=20, blank=True, null=True)
    
#    def __str__(self):
#       return str(self.pk)+": "+self.username

class Employee(models.Model):
    EMPLOYEE_TYPE=[
        ('O', 'Owner'),
        ('AM', 'Assistant Manager'),
        ('D', 'Deliveryman'),
        ('P', 'Production Employee'),
        ]
    employee_number=models.CharField(max_length=7)
    employee_name=models.CharField(max_length=20)
    job_position=models.CharField(max_length=2, choices=EMPLOYEE_TYPE)
    
class Invoice(models.Model):
    STATUS=[
        ('paid', 'Paid'),
        ('unpaid','Unpaid'),
        ]
    invoice_number=models.CharField(max_length=10)
    total_price=models.FloatField(max_length=22, default=0.0)
    payment_status=models.CharField(max_length=6,choices=STATUS, default='paid')
    invoice_email=models.CharField(max_length=20)
    i_d_employee_number=models.CharField(max_length=7)
    invoice_date=models.DateTimeField(null=False, blank=False)
   
class Product(models.Model):
    product_number=models.CharField(max_length=5)
    product_name=models.CharField(max_length=20)
    product_price=models.FloatField(max_length=22, default=0.0)
    product_description=models.CharField(max_length=200, null=True, blank=True)
 
class JobOrder(models.Model):
    STATUS=[
        ('inprogress','In-Progress'),
        ('finished','Finished'),
        ]
    joborder_number=models.CharField(max_length=10)
    production_status=models.CharField(max_length=11, choices=STATUS)
    joborder_quotation_number=models.CharField(max_length=10)
    joborder_number=models.DateTimeField(null=False, blank=False)
    