from django.contrib import admin
from .models import *

admin.site.register(Partij)
admin.site.register(Politieker)
admin.site.register(Politieker_partij_link)
admin.site.register(User_edits)