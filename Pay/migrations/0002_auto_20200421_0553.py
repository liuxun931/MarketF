# Generated by Django 3.0.5 on 2020-04-21 05:53

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Pay', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='payment_date',
            field=models.DateField(blank=True, default=datetime.date(2020, 4, 21)),
        ),
        migrations.AddField(
            model_name='payment',
            name='payment_number',
            field=models.CharField(default='0000000000', max_length=20),
        ),
    ]
