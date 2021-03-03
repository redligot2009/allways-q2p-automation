# Generated by Django 3.1.7 on 2021-03-03 05:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20210302_2351'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='quotation',
            name='no_colors',
        ),
        migrations.AddField(
            model_name='account',
            name='organization_name',
            field=models.CharField(blank=True, default='', max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='quotation',
            name='approval_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='quotation',
            name='client',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.account'),
        ),
        migrations.AddField(
            model_name='quotation',
            name='total_pages',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='quotationitem',
            name='no_colors',
            field=models.IntegerField(choices=[(1, 'One Color (Black and White'), (2, 'Two Colors (CMYK)'), (3, 'Three Colors (CMYK)'), (4, 'Full Color (CMYK)')], default=4),
        ),
    ]
