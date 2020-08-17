from django.db import models

from datetime import date
from django.utils.timezone import now

#from User.models import EndUser
#from Pay.models import Payment
#from Product.models import Products



# Create your models here.


class OrderStatus(models.Model):
    '''    
    nonpaid = '未支付'
    paid = '已支付'
    sent = '已发货'
    accepted = '已签收'    
    finished = '完成'
    '''
    status = models.CharField(max_length = 12, default = '')
    description_status = models.CharField(max_length = 48, default = '')
    
    def __str__(self):
        return self.status   
        
class AbstractOrder(models.Model):
    # (base class for ScoreOrder)
    # 订单：买家; 金额; 购买日期; 状态;
    # 一个订单只有一个买家;
    # 一个订单可以有多个物流;
    # 一个订单可以有一个商品清单;
    # 一个订单印上一个购买日期-不可更改;
    #orderer在views 中需要只能挑选自己定义或用过的地址
    orderer = models.ForeignKey('User.EndUser', on_delete=models.CASCADE, ) 
    orderdate = models.DateField(auto_now=False,default=now().today())
    payment = models.ForeignKey('Pay.Payment', on_delete=models.CASCADE, null    = True)
    payment_type = models.CharField(max_length = 12, choices=[('CASH', 'cash'), ( 'SCORES', 'scores'), ], default = 'cash')
    #goods_list - see items 
    cost = models.PositiveIntegerField(default = 0)
    order_status = models.ForeignKey('OrderStatus', on_delete=models.CASCADE,  verbose_name = '订单状态') 

    class Meta:
        abstract = True

    # 4.1 subclass from 'Order'
class Order(AbstractOrder): 
    # all real orders.
    # (积分隐式完成，订单显式操作)
    orderscoreid = models.AutoField(primary_key=True, verbose_name = '订单自然ID')
    orderer = models.ForeignKey("User.EndUser", 
                                on_delete=models.CASCADE, 
                                null=True, 
                                related_name='get_orderscore',
                                verbose_name = '顾客',)
    
    cost = models.IntegerField(default = 0, verbose_name = '金额')
    goods = models.ManyToManyField("Product.Products", symmetrical=False,  verbose_name = '订单商品')
    orderdate = models.DateField(null=True,  verbose_name = '订单日期')
    orderer_sc = models.IntegerField(default = 0, null=True,  verbose_name = '订单积分')
    up1 = models.ForeignKey("User.EndUser", 
                            on_delete=models.CASCADE, 
                            null=True, 
                            related_name='get_up1',
                             verbose_name = '上一级' )
    
    up2 = models.ForeignKey("User.EndUser", 
                            on_delete=models.CASCADE, 
                            null=True, 
                            related_name='get_up2',
                            verbose_name = '上二级' )
    up1_sc = models.IntegerField(default = 0, null=True, verbose_name = '上一级积分')
    up2_sc = models.IntegerField(default = 0, null=True, verbose_name = '上二级积分')
    
    def __str__(self):
        return str(self.orderscoreid)
    pass
    
class Order_Items(models.Model):
    '''
    show each goods and amount of goods in an Order
    1. foreignkey Order
    2. foreignkey Product
    3. INT :  amount of goods
    4. 
    '''
    pass
