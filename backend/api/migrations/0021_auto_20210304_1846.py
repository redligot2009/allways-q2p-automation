# Generated by Django 3.1.7 on 2021-03-04 10:46

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_auto_20210304_1842'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='quotation',
            name='final_total_costs',
        ),
        migrations.RemoveField(
            model_name='quotation',
            name='final_unit_costs',
        ),
        migrations.AlterField(
            model_name='quotation',
            name='created_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 3, 4, 10, 46, 54, 604104, tzinfo=utc)),
        ),
    ]
