from django.shortcuts import render
from django.http import HttpResponse
from .models import *


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