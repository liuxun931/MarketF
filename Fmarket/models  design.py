from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class EndUser(User):
    '''
        subclass User; 
        add field : 11numbers for mobile ; 18numbers for id card;
    '''
    mp = models.CharField(max_length=11, blank = True)
    id_number = models.CharField(max_length=18, blank = True)
    wechat = models.CharField(max_length=11, blank = True)
    score_id = models.CharField(max_length=21, unique = True)
    score = models.IntgerField(max_length=21, unique = True)
    is_seller = BooleanField(default = False,)
    is_staffuser = BooleanField(default = False,)
    
    ## https://blog.csdn.net/a1007720052/article/details/81014851 手机好代替email登录
    
    
class ShippingAddress(models.Model):
    '''
    为shippment(发货)提供数据, 反复使用; 
    每个地址指定归属一个用户名下;
    '''
    user = ForeignKeyField(EndUser) 
    is_daily_used = BooleanField
    receiver_name = CharField(max_length = 20;)
    receiver_mp = models.CharField(max_length=11, blank = True)
    receiver_province = CharField(max_length = 20;)
    receiver_city = CharField(max_length = 20;)
    receiver_dist = CharField(max_length = 20;)
    receiver_addr = CharField(max_length = 20;)
    

    
class payment(models.Model):
    '''
    payment via wechat & alipay
    '''
    pass


class Products(models.Model):
    '''
    商品名称，种类，单位，单价，产地，详细描述
    图片（图片组：主图附图，轮播）
    '''
    
    

class Order(models.Model):
    '''
    (base class for ScoreOrder)
    订单：买家; 金额; 购买日期; 状态;
    一个订单只有一个买家;
    一个订单可以有多个物流;
    一个订单可以有一个商品清单;
    一个订单印上一个购买日期-不可更改;
    '''
    orderer = ForeignKeyField(User) #views 中需要orderer只能挑选自己定义或用过的地址
    payment = ForeignKeyField(blank = true)
    orderdate = DateField
    goods_list = dic
    ship_status = [未支付，未发货，已发货，已经签收，完成]
    cash_or_score = [cash, score (default = cash)]
    cost = IntgerField
    
    Meta class 
        abstract = True

class ScoreOrder:
    '''
    (Order 属性->界面可见部分)
    (Score属性->界面不可见部分)
    购买者本人不积分 
    积分过程通过ajax实现
    '''
    up1_sc_id =CharField
    up1_sc = IntgerField
    up2_sc_id = CharField
    up2_sc = IntgerField
    

class Shipment(models.Model):
    # （地址 -> 快递 <- 订单）组成一个shippment一个发货只对应一个订单;字段包括：   
    # 收获地址, 发货时间, 快递公司, 快递单号, 是否签收, 收货时间, 
    owner = ForeignKeyField(ScoreOrder)
    address = ForeignKeyField(shippingaddress)
    send_date = DateField
    ship_cmpn = CharField() # 页面提供快速选项
    ship_num = CharField(max_length = 16)
    is_accepted = BooleanField
    accept_date = DateField
