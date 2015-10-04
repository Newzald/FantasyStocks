# This is the stocks app urlconf. It is named differently for speedier Vimming. 

from stocks import views
from django.conf.urls import url, patterns
from django.views.generic import RedirectView
from django.core.urlresolvers import reverse_lazy

urlpatterns = [
            url("^instructions/$", views.instructions, name="howto"),
            url("^$", views.index, name="home"), 
        ]
