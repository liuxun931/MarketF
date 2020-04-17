from django.db import models

from User.models import EndUser
from Order.models import Order
# Create your models here.

class ShippingAddress(models.Model):
    '''
    为shippment(发货)提供数据, 反复使用; 
    每个地址指定归属一个用户名下;
    '''
    user = models.ForeignKey('User.EndUser', on_delete=models.CASCADE, ) 
    is_daily_used = models.BooleanField(default = True)
    receiver_name = models.CharField(max_length = 20,)
    receiver_mp = models.CharField(max_length=11, blank = True)
    receiver_province = models.CharField(max_length = 20)
    receiver_city = models.CharField(max_length = 20)
    receiver_dist = models.CharField(max_length = 20)
    receiver_addr = models.CharField(max_length = 20)

class Shipment(models.Model):
    # （地址 -> 快递 <- 订单）组成一个shippment一个发货只对应一个订单;字段包括：   
    # 收获地址, 发货时间, 快递公司, 快递单号, 是否签收, 收货时间, 
    owner = models.ForeignKey('Order.Order', on_delete=models.CASCADE,)
    address = models.ForeignKey('shippingaddress',on_delete=models.CASCADE,)
    send_date = models.DateField(blank = True)
    ship_cmpn = models.CharField(max_length = 16)  # 页面提供快速选项
    ship_num = models.CharField(max_length = 16)
    is_accepted = models.BooleanField(default = False)
    accept_date = models.DateField(blank = True)
