# Generated by Django 3.1.7 on 2021-03-02 13:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('middle_name', models.CharField(blank=True, default='', max_length=20)),
                ('shipping_address', models.CharField(blank=True, default='', max_length=20)),
                ('mobile_number', models.CharField(blank=True, default='', max_length=20)),
                ('job_position', models.CharField(choices=[('O', 'Owner'), ('AM', 'Account Manager'), ('D', 'Deliveryman'), ('P', 'Production Employee')], default='O', max_length=2)),
                ('plate_number', models.CharField(blank=True, max_length=20, null=True)),
                ('license_number', models.CharField(blank=True, max_length=20, null=True)),
                ('o_key', models.CharField(blank=True, max_length=20, null=True)),
                ('am_key', models.CharField(blank=True, max_length=20, null=True)),
                ('p_position', models.CharField(default='', max_length=20)),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]