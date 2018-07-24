from django.shortcuts import render
from django.http import HttpResponse
from .models import *
import uuid  # https://github.com/skorokithakis/shortuuid
from django.core import serializers
import json
from subprocess import check_output


def index(request):
	context = {}
	return render(request, 'index.html', context)


def lijst(request):
	context = {}
	return render(request, 'lijst.html', context)


def detail(request):
	context = {}
	return render(request, 'detail.html', context)


def privacy(request):
	return render(request, 'privacy.html')


class FieldWrapper:
	def __init__(self, fieldname, politieker):
		self.fieldname = fieldname
		self.politieker = politieker

	def get_suggested_edits(self):
		return UserEdit.objects.filter(field=self.fieldname, politieker_id=self.politieker)
	suggestedEdits = property(get_suggested_edits)


def edit(request):
	politieker = request.GET.get('politieker')

	count = Politieker.objects.filter(id=politieker).count()
	if count == 0:
		return HttpResponse('Politieker not found.')

	all_fields = EditableField.objects.all()
	fields = []
	return HttpResponse(all_fields)

	for field in all_fields:
		fields.append(FieldWrapper(fieldname=field.fieldname, politieker=politieker))

	context = {
		'fields': fields,
		'politieker': politieker,
	}
	return render(request, 'edit.html', context)


def demoquery(request):
	context = {
		'text': []
	}

	politiekers = Politieker.objects.filter(naam__search='John')
	for x in politiekers:
		link = PolitiekerPartijLink.objects.get(politieker_id=x.id)
		partij_id = link.partij_id
		partij = Partij.objects.get(id=partij_id)
		partijnaam = partij.lijstnaam

		text = "%s [%i] (%i: %s)" %(x.naam, x.id, partij_id, partijnaam)
		context['text'].append(text)

	return render(request, 'query.html', context)


def serialise_get_object(get_object):
	data = serializers.serialize('json', [get_object, ])
	struct = json.loads(data)
	data = json.dumps(struct[0])
	return data


def get_politieker_data(request):
	politieker_id = request.GET.get('id')
	politieker_id = int(politieker_id)
	politiekers = Politieker.objects.get(id=politieker_id)

	data = serialise_get_object(politiekers)
	return HttpResponse(data, content_type='application/json')


def get_all_partij(request):
	got_all = Partij.objects.filter()
	data = serializers.serialize('json', got_all)
	return HttpResponse(data, content_type='application/json')


def query_result_to_canonical_json(list_object):
	"""
	{
		"model": "kiestze.politieker_partij_link",
		"pk": 59028,
		"fields": {
			"partij": 998,
			"politieker": 22368,
			"volgnummer": 19,
			"voorkeurstemmen": 215,
			"verkozen": false,
			"verkozen_volgnummer": 16
		}
	},
	to
	"59028" :
	{
		"partij": 998,
		"politieker": 22368,
		"volgnummer": 19,
		"voorkeurstemmen": 215,
		"verkozen": false,
		"verkozen_volgnummer": 16
	}
	To make it easely consumable by the frontend.
	"""
	tmp_dict = {}

	tmp_python = serializers.serialize('python', list_object)
	for el in tmp_python:
		tmp_dict[el["pk"]] = el["fields"]
	return json.dumps(tmp_dict, indent=4, sort_keys=True, default=str)
	# return serializers.serialize('json', tmp_dict)


def query_result_to_array(list_object, field_name):
	arr = []
	tmp_python = serializers.serialize('python', list_object)
	for el in tmp_python:
		arr.append(el["fields"][field_name])
	return arr


def get_all_gemeentes(request):
	got_all = Gemeente.objects.filter().exclude(naam="-")
	data = query_result_to_canonical_json(got_all)
	return HttpResponse(data, content_type='application/json')


def get_all_politieker_partij_link_van_gemeente(request):
	gemeente_nis = request.GET.get('gemeente_nis')
	gemeente_nis = int(gemeente_nis)

	jaar = request.GET.get('jaar')
	jaar = int(jaar)

	got_all = PolitiekerPartijLink.objects.filter(partij__nis=gemeente_nis, partij__jaar=jaar)
	data = query_result_to_canonical_json(got_all)
	return HttpResponse(data, content_type='application/json')


def get_partij(request):
	gemeente_nis = request.GET.get('gemeente_nis')
	gemeente_nis = int(gemeente_nis)

	jaar = request.GET.get('jaar')
	jaar = int(jaar)

	if gemeente_nis == 0:
		got_all = Partij.objects.filter(jaar=jaar)
	else:
		got_all = Partij.objects.filter(nis=gemeente_nis, jaar=jaar)

	data = query_result_to_canonical_json(got_all)
	return HttpResponse(data, content_type='application/json')


def get_politiekers(request):
	gemeente_nis = request.GET.get('gemeente_nis')
	gemeente_nis = int(gemeente_nis)

	jaar = request.GET.get('jaar')
	jaar = int(jaar)

	got_all = PolitiekerPartijLink.objects.only("politieker").filter(partij__nis=gemeente_nis, partij__jaar=jaar)
	arr = query_result_to_array(got_all, "politieker")
	
	got_all = Politieker.objects.filter(id__in=arr)  # [:10]
	data = query_result_to_canonical_json(got_all)
	# data = got_all.query
	return HttpResponse(data, content_type='application/json')


def get_politieker_met_naam(request):
	naam = request.GET.get('naam')

	got_all = Politieker.objects.filter(naam__icontains=naam)  # [:10]
	data = query_result_to_canonical_json(got_all)
	return HttpResponse(data, content_type='application/json')


def get_last_accepted_edit(request):
	politieker = request.GET.get('politieker')

	accepted_edits = UserEdit.objects.filter(politieker=politieker).exclude(accepted_date__isnull=True)
	count = accepted_edits.count()

	if count == 0:
		return HttpResponse('No accepted edits for this politieker')

	fields = EditableField.objects.all()
	edits = {}
	for field in fields:
		last_edit = accepted_edits.filter(field=field.fieldname).values().last()  # Django magic
		edits[field.fieldname] = last_edit

	data = json.dumps(edits, default=str)
	return HttpResponse(data, content_type='application/json')


def request_edit(request):
	if not request.user.is_authenticated:
		return HttpResponse('You\'re not logged in. Get out.')
	else:
		try:
			politieker = request.POST['politieker']
			fieldname = request.POST['fieldname']
			value = request.POST['value']

			already_exists = UserEdit.objects.filter(politieker=politieker, field=fieldname, suggested_value=value)
			if already_exists.count() == 0:  # Suggestion doesn't exist ==> create new one
				guid = uuid.uuid4()

				edit = UserEdit()
				edit.guid = guid
				edit.politieker_id = politieker
				edit.field = fieldname
				edit.accepted_date = None  # Null because not yet accepted
				edit.suggested_value = value
				edit.save()
			else:  # Suggestion already exists ==> use that data and approve the suggestion
				guid = already_exists[0].guid

			already_approved = Approver.objects.filter(aanpassing=guid, user_id=request.user.id)
			if already_approved.count() != 0:
				return HttpResponse('You already voted!')
			else:
				approver = Approver()
				approver.aanpassing_id = guid
				approver.user_id_id = request.user.id
				approver.save()

			return HttpResponse('Done')
		except Exception as e:
			return HttpResponse('Please enter all required GET parameters<br><br>' + str(e))


def git_pull(request):
	if request.user.is_staff:
		data = check_output(["git", "pull"])
		# data += check_output(["systemctl", "restart", "gunicorn"])  # Doesn't work (no root)
		return HttpResponse(data, content_type='text/plain')
	else:
		return HttpResponse('Nice try.')
