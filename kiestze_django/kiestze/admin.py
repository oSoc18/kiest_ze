from django.contrib import admin
from .models import *


class GemeenteAdmin(admin.ModelAdmin):
	list_display = ('nis', 'naam')


class PolitiekerAdmin(admin.ModelAdmin):
	list_display = ('id', 'otb_id', 'naam', 'geslacht')
	# readonly_fields = ('id',)

	def get_form(self, request, obj=None, **kwargs):
		form = super(PolitiekerAdmin, self).get_form(request, obj, **kwargs)
		form.base_fields['otb_id'].initial = 0  # for easy input
		return form


class PartijAdmin(admin.ModelAdmin):
	list_display = ('lijstnaam', 'lijstnummer', 'jaar')
	# readonly_fields = ('id',)

	def get_form(self, request, obj=None, **kwargs):
		form = super(PartijAdmin, self).get_form(request, obj, **kwargs)
		form.base_fields['jaar'].initial = 2018  # temporary for easy input
		form.base_fields['nis'].initial = 36012  # temporary for easy input
		return form


class UserEditAdmin(admin.ModelAdmin):
	list_display = ('guid', 'politieker', 'field', 'suggested_value', 'accepted_date')


class ApproverAdmin(admin.ModelAdmin):
	list_display = ('id', 'aanpassing', 'user_id')


class EditableFieldAdmin(admin.ModelAdmin):
	list_display = ('id', 'fieldname')


admin.site.register(Partij, PartijAdmin)
admin.site.register(Politieker, PolitiekerAdmin)
admin.site.register(PolitiekerPartijLink)
admin.site.register(Gemeente, GemeenteAdmin)
admin.site.register(UserEdit, UserEditAdmin)
admin.site.register(Approver, ApproverAdmin)
admin.site.register(EditableField, EditableFieldAdmin)
