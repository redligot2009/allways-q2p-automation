# Generated by Django 3.1.7 on 2021-03-07 15:59

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0028_auto_20210307_2356'),
    ]

    operations = [
        migrations.RenameField(
            model_name='quotation',
            old_name='no_sheets_ordered',
            new_name='no_sheets_in_running_machine',
        ),
        migrations.AlterField(
            model_name='quotation',
            name='created_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 3, 7, 15, 59, 24, 301537, tzinfo=utc)),
        ),
    ]