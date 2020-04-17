from django.db import models

# Create your models here.
'''
    cart for each user, 1 user for 1 cart;
'''

class cart(models.Model):
    pass
    
class cart_items(models.Model):
    '''
    show each goods and amount of goods in an Order
    1. foreignkey Order
    2. foreignkey Product
    3. INT :  amount of goods
    4. 
    '''
    pass