from django.db import models

# Create your models here.

    
class Products(models.Model):
    '''
    商品名称，种类，单位，单价，产地，详细描述
    图片（图片组：主图附图，轮播）
    products listview => shop portal
    '''
    name = models.CharField(max_length=32)
    # img = models.ImageField(blank = True)
    catalog =  models.CharField(max_length=18, blank = True)
    unit = models.CharField(max_length=12, blank = True)
    unit_price = models.PositiveIntegerField(default = 0,)
    place = models.CharField(max_length=18, blank = True)
    details = models.TextField(blank = True)
    is_onsale = models.BooleanField(default = True,)
    
    def __str__(self):
        return self.name
