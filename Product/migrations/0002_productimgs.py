# Generated by Django 3.0.5 on 2020-08-17 01:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Product', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductImgs',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img_title', models.CharField(blank=True, max_length=18)),
                ('image', models.ImageField(height_field=300, max_length=300, upload_to='media', width_field=450)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Product.Products')),
            ],
        ),
    ]
