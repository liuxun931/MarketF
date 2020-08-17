import os.path
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


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<name>/<filename>
    return 'user_{0}/{1}'.format(instance.user.name, filename)

class ProductImgs(models.Model):
    product = models.ForeignKey('Products', on_delete=models.CASCADE,)
    img_title = models.CharField(max_length=18, blank = True)
    image = models.ImageField(upload_to='media', height_field=300, width_field=450, max_length=300, )
    
    def __unicode__(self):  
        return self.img_title