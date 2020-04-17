from django.contrib.sitemaps import Sitemap


#import models
from User.models import EndUser


class FmarketSitemap(Sitemap):
    changefreq = "never"
    priority = 0.5

    def items(self):
        return EndUser.objects.all()
