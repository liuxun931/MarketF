# Generated by Django 3.0.5 on 2020-08-17 01:49

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Pay', '0003_auto_20200425_1952'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='payment_date',
            field=models.DateField(blank=True, default=datetime.datetime(2020, 8, 17, 9, 49, 11, 323539)),
        ),
    ]
