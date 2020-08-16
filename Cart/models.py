from django.db import models

# Create your models here.
'''
    cart for each user, 1 user for 1 cart;
'''

class Cart(models.Model):
    '''
    1 person = 1 cart 
    2 那些商品，各自数量； 删除或继续
    3 选中计算 总价
    4. 结账
    '''
    pass
    
class Cart_Items(models.Model):
    '''
    show each goods and amount of goods in an Order
    1. foreignkey Order
    2. foreignkey Product
    3. INT :  amount of goods
    4. 
    '''
    pass