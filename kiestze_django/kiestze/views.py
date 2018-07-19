from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from django.core import serializers
import json
#import jsonpickle
import os
import subprocess
from subprocess import check_output
#import simplejson as json

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


def git_pull(request):
	#p = subprocess.Popen(["git", "pull"]) #, cwd=path)
	#p.wait()
	#data = p.stdout

	data = check_output(["git", "pull"])
	return HttpResponse(data, content_type='text/plain')
