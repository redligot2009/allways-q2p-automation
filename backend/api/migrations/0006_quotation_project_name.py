# Generated by Django 3.1.7 on 2021-03-04 09:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_remove_quotation_total_paper_costs'),
    ]

    operations = [
        migrations.AddField(
            model_name='quotation',
            name='project_name',
            field=models.CharField(default='Unnamed Project', max_length=255),
        ),
    ]
