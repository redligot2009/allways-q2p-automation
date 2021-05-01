# Generated by Django 3.1.7 on 2021-03-07 16:43

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0034_auto_20210308_0031'),
    ]

    operations = [
        migrations.RenameField(
            model_name='quotation',
            old_name='project_dimensions_length',
            new_name='page_length',
        ),
        migrations.RenameField(
            model_name='quotation',
            old_name='project_dimensions_width',
            new_name='page_width',
        ),
        migrations.AddField(
            model_name='quotation',
            name='spread_length',
            field=models.FloatField(default=11),
        ),
        migrations.AddField(
            model_name='quotation',
            name='spread_width',
            field=models.FloatField(default=17),
        ),
        migrations.AlterField(
            model_name='quotation',
            name='created_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 3, 7, 16, 43, 9, 765266, tzinfo=utc)),
        ),
    ]