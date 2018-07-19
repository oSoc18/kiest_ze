from django.contrib import admin
from .models import *


class GemeenteAdmin(admin.ModelAdmin):
	list_display = ('id', 'naam', 'nis')

class PolitiekerAdmin(admin.ModelAdmin):
	list_display = ('id', 'otb_id', 'naam', 'geslacht')

class PartijAdmin(admin.ModelAdmin):
	list_display = ('id', 'lijstnaam', 'lijstnummer', 'jaar')


admin.site.register(Partij, PartijAdmin)
admin.site.register(Politieker, PolitiekerAdmin)
admin.site.register(Politieker_partij_link)
admin.site.register(Gemeente, GemeenteAdmin)
admin.site.register(User_edits)