# Generated by Django 3.0.5 on 2020-04-14 01:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Order', '0002_auto_20200414_0153'),
        ('User', '0001_initial'),
        ('Ship', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='shippingaddress',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='User.EndUser'),
        ),
        migrations.AddField(
            model_name='shipment',
            name='address',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Ship.ShippingAddress'),
        ),
        migrations.AddField(
            model_name='shipment',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Order.Order'),
        ),
    ]
