# Generated by Django 3.2 on 2021-04-27 21:33

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0046_auto_20210427_1553'),
    ]

    operations = [
        migrations.AlterField(
            model_name='joborder',
            name='created_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 27, 21, 33, 2, 534417, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='quotation',
            name='created_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 27, 21, 33, 2, 530415, tzinfo=utc)),
        ),
    ]
