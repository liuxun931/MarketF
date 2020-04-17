# Generated by Django 3.0.5 on 2020-04-14 01:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Product', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order_Items',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='OrderStatus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(default='', max_length=12)),
                ('description_status', models.CharField(default='', max_length=48)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('payment_type', models.CharField(choices=[('CASH', 'cash'), ('scores', 'scores')], default='cash', max_length=12)),
                ('orderscoreid', models.AutoField(primary_key=True, serialize=False)),
                ('cost', models.IntegerField(default=0)),
                ('orderdate', models.DateField(null=True)),
                ('orderer_sc', models.IntegerField(default=0, null=True)),
                ('up1_sc', models.IntegerField(default=0, null=True)),
                ('up2_sc', models.IntegerField(default=0, null=True)),
                ('OrderStatus', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Order.OrderStatus')),
                ('goods', models.ManyToManyField(to='Product.Products')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
