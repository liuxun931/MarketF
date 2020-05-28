from django.db import models

# Create your models here.

class AbstractDashboards(models.Model):
    name = models.CharField(max_length = 12, blank = True)
    
    class Meta:
        abstract = True
