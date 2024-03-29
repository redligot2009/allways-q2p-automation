# Generated by Django 3.1.7 on 2021-03-03 14:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('middle_name', models.CharField(blank=True, max_length=20, null=True)),
                ('mobile_number', models.CharField(blank=True, default='', max_length=20)),
                ('shipping_address', models.CharField(blank=True, default='', max_length=150)),
                ('organization_name', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('job_position', models.CharField(blank=True, choices=[('O', 'Owner'), ('AM', 'Account Manager'), ('D', 'Deliveryman'), ('P', 'Production Employee')], max_length=2, null=True)),
                ('plate_number', models.CharField(blank=True, max_length=20, null=True)),
                ('license_number', models.CharField(blank=True, max_length=20, null=True)),
                ('owner_key', models.CharField(blank=True, max_length=20, null=True)),
                ('account_manager_key', models.CharField(blank=True, max_length=20, null=True)),
                ('production_staff_position', models.CharField(blank=True, max_length=20, null=True)),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Binding',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('binding_type', models.CharField(blank=True, max_length=150)),
                ('binding_base_price', models.FloatField(default=0.0, max_length=22)),
            ],
            options={
                'verbose_name_plural': 'Binding Types',
            },
        ),
        migrations.CreateModel(
            name='DieCut',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('diecut_type', models.CharField(blank=True, max_length=10)),
                ('diecut_base_price', models.FloatField(default=0.0, max_length=22)),
            ],
            options={
                'verbose_name_plural': 'Diecut Types',
            },
        ),
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('invoice_number', models.CharField(max_length=10, primary_key=True, serialize=False, unique=True)),
                ('total_price', models.FloatField(default=0.0, max_length=22)),
                ('payment_status', models.CharField(choices=[('paid', 'Paid'), ('unpaid', 'Unpaid')], default='paid', max_length=6)),
                ('invoice_email', models.CharField(max_length=20)),
                ('i_d_employee_number', models.CharField(max_length=7)),
                ('invoice_date', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='JobOrder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('production_status', models.CharField(choices=[('inprogress', 'In-Progress'), ('finished', 'Finished')], max_length=11)),
                ('joborder_quotation_number', models.CharField(max_length=10)),
                ('joborder_number', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Lamination',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lamination_type', models.CharField(blank=True, max_length=150)),
                ('lamination_base_price', models.FloatField(default=0.0, max_length=22)),
            ],
            options={
                'verbose_name_plural': 'Lamination Types',
            },
        ),
        migrations.CreateModel(
            name='Paper',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('paper_type', models.CharField(default='Book 60', max_length=150)),
                ('paper_category', models.CharField(max_length=100)),
                ('paper_height', models.CharField(max_length=10)),
                ('paper_width', models.CharField(max_length=10)),
                ('ream_cost', models.FloatField(blank=True, default=0.0, max_length=22, null=True)),
                ('leaf_cost', models.FloatField(blank=True, default=0.0, max_length=22, null=True)),
                ('is_colored', models.CharField(choices=[('y', 'Yes'), ('n', 'No')], max_length=1)),
                ('is_sticker', models.CharField(choices=[('y', 'Yes'), ('n', 'No')], max_length=10)),
            ],
            options={
                'verbose_name_plural': 'Paper Types',
            },
        ),
        migrations.CreateModel(
            name='PrintingProcess',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('process_name', models.CharField(blank=True, max_length=10)),
                ('process_base_factor', models.FloatField(default=0.0, max_length=22)),
            ],
            options={
                'verbose_name_plural': 'Printing Processes',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(blank=True, max_length=20)),
                ('product_price', models.FloatField(default=0.0, max_length=22)),
                ('product_description', models.CharField(blank=True, max_length=200)),
            ],
            options={
                'verbose_name_plural': 'Product Types',
            },
        ),
        migrations.CreateModel(
            name='ProductionConstants',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('plate_base_price', models.FloatField(default=250.0)),
                ('base_price_fold', models.FloatField(default=90.0)),
                ('lamination_factor', models.FloatField(default=0.00625)),
                ('min_rate_running', models.FloatField(default=400.0)),
            ],
            options={
                'verbose_name_plural': 'Production Constants',
            },
        ),
        migrations.CreateModel(
            name='Quotation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('approval_status', models.CharField(choices=[('not_approved', 'Not Approved'), ('in_progress', 'In Progress'), ('approved', 'Approved')], default='in_progress', max_length=12)),
                ('approval_date', models.DateTimeField(blank=True, null=True)),
                ('printing_process', models.CharField(choices=[('offset', 'Offset'), ('digital', 'Digital'), ('screen', 'Screen')], default='offset', max_length=20)),
                ('quantity', models.IntegerField(default=1)),
                ('total_pages', models.IntegerField(default=1)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('project_file_path', models.CharField(blank=True, max_length=255)),
                ('project_dimensions_length', models.FloatField(default=11)),
                ('project_dimensions_width', models.FloatField(default=8.5)),
                ('margin_of_error', models.FloatField(default=0.1, max_length=10)),
                ('markup_percentage', models.FloatField(default=0.45, max_length=10)),
                ('pages_can_fit', models.CharField(default=1, max_length=4)),
                ('total_no_plates', models.IntegerField(default=1)),
                ('total_plate_costs', models.FloatField(default=0.0)),
                ('total_running_costs', models.FloatField(default=0.0)),
                ('total_paper_costs', models.FloatField(default=0.0)),
                ('total_lamination_costs', models.FloatField(default=0.0)),
                ('total_binding_costs', models.FloatField(default=0.0)),
                ('total_folds', models.IntegerField(default=1)),
                ('total_folding_costs', models.FloatField(default=0.0)),
                ('total_gathering_costs', models.FloatField(default=0.0)),
                ('cutting_costs', models.FloatField(default=0.0)),
                ('packaging_costs', models.FloatField(default=0.0)),
                ('transport_costs', models.FloatField(default=0.0)),
                ('raw_total_costs', models.FloatField(default=0.0)),
                ('final_unit_costs', models.FloatField(default=0.0)),
                ('final_total_costs', models.FloatField(default=0.0)),
                ('client', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.account')),
                ('product_type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.product')),
            ],
        ),
        migrations.CreateModel(
            name='QuotationItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item_type', models.CharField(choices=[('inner', 'Inner Pages'), ('cover', 'Cover'), ('other', 'Other')], default='inner', max_length=10)),
                ('no_colors', models.IntegerField(choices=[(1, 'One Color (Black and White'), (2, 'Two Colors (CMYK)'), (3, 'Three Colors (CMYK)'), (4, 'Full Color (CMYK)')], default=4)),
                ('quotation_running_costs', models.FloatField(blank=True, default=0.0, null=True)),
                ('binding', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.binding')),
                ('lamination', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.lamination')),
                ('paper', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.paper')),
                ('quotation', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='items', to='api.quotation')),
            ],
        ),
        migrations.CreateModel(
            name='Plate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('no_impressions', models.IntegerField(default=1)),
                ('extra_impressions', models.IntegerField(default=0)),
                ('total_impressions', models.IntegerField(default=0)),
                ('running_costs', models.FloatField(default=0.0)),
                ('quotation_item', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='plates', to='api.quotationitem')),
            ],
        ),
    ]
