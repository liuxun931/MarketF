#import django auth
from django.contrib.auth.mixins import LoginRequiredMixin,PermissionRequiredMixin
from django.contrib.auth.decorators import login_required 
from django.contrib.auth import authenticate,login,logout


#  -----------------------------------------------Customize PermissionRequiredMixin '/' ------------------------------------------------
class MyPermRequireMixin(PermissionRequiredMixin):
    login_url = '/accounts/login/'
    def handle_no_permission(self):
        return redirect('/accounts/permission_error/')

class LogoutView(LoginRequiredMixin,View):
    def get(self,request):
        logout(request)
        return redirect('/Portal/')

class PermissionError(LoginRequiredMixin, TemplateView):
    template_name = 'Fmarket/permission_error.html'