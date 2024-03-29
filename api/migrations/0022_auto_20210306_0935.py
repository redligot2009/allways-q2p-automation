# Generated by Django 3.1.7 on 2021-03-06 01:35

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0021_auto_20210304_1846'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='plate',
            name='extra_impressions',
        ),
        migrations.RemoveField(
            model_name='plate',
            name='running_costs',
        ),
        migrations.RemoveField(
            model_name='plate',
            name='total_impressions',
        ),
        migrations.RemoveField(
            model_name='quotationitem',
            name='lamination_costs',
        ),
        migrations.RemoveField(
            model_name='quotationitem',
            name='quotation_running_costs',
        ),
        migrations.AlterField(
            model_name='quotation',
            name='created_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 3, 6, 1, 35, 23, 58335, tzinfo=utc)),
        ),
    ]
