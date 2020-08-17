from django.db import models
from django.utils import timezone

# Create your models here.
'''
    cart for each user, 1 user for 1 cart;
'''

class Cart(models.Model):
    '''
    1 顾客名称
    2 商品名称，单价
    3 商品数量
    4 加入购物车的时间
    '''
    
    cartid = models.AutoField(primary_key=True, verbose_name = '购物车ID')
    
    user = models.ForeignKey("User.EndUser", on_delete=models.CASCADE, related_name='get_cart', verbose_name = '顾客',)
    
    products = models.ForeignKey("User.EndUser", on_delete=models.CASCADE, null=True, related_name='get_product', verbose_name = '商品',)
    
    quantity = models.IntegerField(default = 1, verbose_name = '数量')
    
    adddate = models.DateField(auto_now=True, verbose_name = '加入购物车日期')
    
    def __str__(self):
        return self.cartid 