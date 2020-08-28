# Generated by Django 3.0.5 on 2020-08-28 07:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0004_userimg'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAddr',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country', models.CharField(default='中国', max_length=12, verbose_name='国家')),
                ('addr_name', models.CharField(default='我的地址', max_length=24, verbose_name='地址别名')),
                ('province', models.CharField(default='北京', max_length=12, verbose_name='省份')),
                ('City', models.CharField(default='北京', max_length=12, verbose_name='城市')),
                ('District', models.CharField(default='朝阳', max_length=12, verbose_name='区/县')),
                ('Street', models.CharField(default='街道', max_length=24, verbose_name='街道')),
                ('Details', models.CharField(default='地址', max_length=24, verbose_name='详细地址')),
                ('Receiver_name', models.CharField(default='收货人', max_length=16, verbose_name='收货人')),
                ('Receiver_phone', models.CharField(default='联系电话', max_length=12, verbose_name='电话')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='User.EndUser')),
            ],
        ),
    ]