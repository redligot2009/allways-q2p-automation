# Generated by Django 3.1.7 on 2021-03-02 08:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20210302_1446'),
    ]

    operations = [
        migrations.RenameField(
            model_name='account',
            old_name='surname',
            new_name='last_name',
        ),
    ]
