from django.shortcuts import render
from django.http import HttpResponse
from .models import *
import uuid #https://github.com/skorokithakis/shortuuid
from django.core import serializers
import json
from subprocess import check_output
import datetime

def index(request):
	context = {}
	return render(request, 'index.html', context)

def lijst(request):
	context = {}
	return render(request, 'lijst.html', context)

def detail(request):
	context = {}
	return render(request, 'detail.html', context)

def demoquery(request):
	context = {}
	context['text'] = []

	politiekers = Politieker.objects.filter(naam__search='John')
	for x in politiekers:
		link = Politieker_partij_link.objects.get(politieker_id=x.id)
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
	politieker_id = int(politieker_id )
	politiekers = Politieker.objects.get(id=politieker_id )

	data = serialise_get_object(politiekers)
	return HttpResponse(data, content_type='application/json')


def get_all_partij(request):
	got_all = Partij.objects.filter()
	data = serializers.serialize('json', got_all)
	return HttpResponse(data, content_type='application/json')


def myconverter(o):
	if isinstance(o, datetime.datetime):
		return "lolz" # o.__str__()


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

	got_all = Politieker_partij_link.objects.filter(partij__nis=gemeente_nis, partij__jaar=jaar)
	data = query_result_to_canonical_json(got_all)
	return HttpResponse(data, content_type='application/json')


def get_politiekers(request):
	gemeente_nis = request.GET.get('gemeente_nis')
	gemeente_nis = int(gemeente_nis)

	jaar = request.GET.get('jaar')
	jaar = int(jaar)

	got_all = Politieker_partij_link.objects.only("politieker").filter(partij__nis=gemeente_nis, partij__jaar=jaar)
	arr = query_result_to_array(got_all, "politieker")
	
	got_all = Politieker.objects.filter(id__in=arr) # [:10]
	data = query_result_to_canonical_json(got_all)
	# data = got_all.query
	return HttpResponse(data, content_type='application/json')


def git_pull(request):
	#p = subprocess.Popen(["git", "pull"]) #, cwd=path)
	#p.wait()
	#data = p.stdout

	data = check_output(["git", "pull"])
	return HttpResponse(data, content_type='text/plain')
