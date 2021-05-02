# Generated by Django 3.1.7 on 2021-03-07 05:44

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0025_auto_20210307_1310'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paper',
            name='is_colored',
            field=models.CharField(choices=[('y', 'Yes'), ('n', 'No')], default='n', max_length=1),
        ),
        migrations.AlterField(
            model_name='paper',
            name='is_sticker',
            field=models.CharField(choices=[('y', 'Yes'), ('n', 'No')], default='n', max_length=10),
        ),
        migrations.AlterField(
            model_name='quotation',
            name='created_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 3, 7, 5, 44, 17, 785318, tzinfo=utc)),
        ),
    ]