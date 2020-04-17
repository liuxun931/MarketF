# Generated by Django 3.0.5 on 2020-04-14 01:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Shipment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('send_date', models.DateField(blank=True)),
                ('ship_cmpn', models.CharField(max_length=16)),
                ('ship_num', models.CharField(max_length=16)),
                ('is_accepted', models.BooleanField(default=False)),
                ('accept_date', models.DateField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='ShippingAddress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_daily_used', models.BooleanField(default=True)),
                ('receiver_name', models.CharField(max_length=20)),
                ('receiver_mp', models.CharField(blank=True, max_length=11)),
                ('receiver_province', models.CharField(max_length=20)),
                ('receiver_city', models.CharField(max_length=20)),
                ('receiver_dist', models.CharField(max_length=20)),
                ('receiver_addr', models.CharField(max_length=20)),
            ],
        ),
    ]
