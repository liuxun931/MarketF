from django.db import models
from django.contrib.auth.models import User

from datetime import date
# Create your models here.


class EndUser(User):
    '''
        Subclass django.contrib.auth.models.User; 
        Three typeof users：normal, is_seller, is_staffuser
            1. normal: just buy items;
            2. seller: place order and check profits returns
            3. management-user: mainly work with dashboard
            
        In future, All users should be able login with mp numbers;
        ## https://blog.csdn.net/a1007720052/article/details/81014851 手机号代替email登录
        add field : 11numbers for mobile ; 18numbers for id card;
    '''

    mp = models.CharField(max_length=11, blank = True, verbose_name='手机')
    
    id_number = models.CharField(max_length=18, blank = True, verbose_name='身份证号')
    
    wechat = models.CharField(max_length=11, blank = True)
    
    score_id = models.CharField(max_length=21, unique = True, verbose_name='积分ID')
    
    score = models.PositiveIntegerField(default = 0, verbose_name='积分')
    
    is_seller = models.BooleanField(default = False, verbose_name='是卖家')
    
    is_staffuser = models.BooleanField(default = False, verbose_name='是管理者')
    
    def get_absolute_url(self):
        return reverse('customer-detail', kwargs={'pk': self.pk})
    
    def __str__(self):
        return self.username
