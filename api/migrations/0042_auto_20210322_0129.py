# Generated by Django 3.1.7 on 2021-03-21 17:29

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0041_auto_20210322_0059'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='mobile_number',
            field=models.CharField(blank=True, default='', max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='account',
            name='shipping_address',
            field=models.CharField(blank=True, default='', max_length=150, null=True),
        ),
        migrations.AlterField(
            model_name='quotation',
            name='created_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 3, 21, 17, 29, 36, 51930, tzinfo=utc)),
        ),
    ]