# Generated by Django 3.0.5 on 2020-08-17 01:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Pay', '0004_auto_20200817_0949'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='payment_date',
            field=models.DateField(auto_now=True),
        ),
    ]