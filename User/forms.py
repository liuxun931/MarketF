from django import forms 
from django.forms import ModelForm
from django.contrib.auth.hashers import make_password, check_password
from django.utils.translation import gettext_lazy as _

from User.models import EndUser
from django.contrib.auth.models import User

class UserCreateForm(ModelForm):
    password = forms.CharField(
        label=_("密码"),
        strip=False,
        widget=forms.PasswordInput(attrs={'autocomplete': '密码', 'required':'',})
        )

    class Meta:
        model = EndUser
        fields = ['username', 'password',  'email', 'groups', 'mp','score_id', 'id_number', 'is_seller', 'is_staffuser']

        widgets = {
                'password':forms.PasswordInput,
            }
        labels = {
                'username':   _('用户名'),
                'password':   _('密码'),
                'groups':       _('用户组'),
                'email':           _('邮箱'),
            }
        help_texts = {
            'username':   _('可以用中文'),
            'groups':       _('可多选'),
            }