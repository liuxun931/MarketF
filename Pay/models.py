from django.db import models

# Create your models here.
class Payment(models.Model):
    payment_number = models.CharField(default = '0000000000', max_length= 20)
    payment_date = models.DateField(blank=True)
    
