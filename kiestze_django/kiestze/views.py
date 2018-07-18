from django.shortcuts import render
from django.http import HttpResponse
from .models import *

def index(request):
	context = {}
	context['text'] = []

	politiekers = Politieker.objects.filter(naam__search='Tommy')
	for x in politiekers:
		link = Politieker_partij_link.objects.get(politieker_id=x.id)
		partij_id = link.partij_id
		partij = Partij.objects.get(id=partij_id)
		partijnaam = partij.lijstnaam

		text = "%s [%i] (%i: %s)" %(x.naam, x.id, partij_id, partijnaam)
		context['text'].append(text)

	return render(request, 'index.html', context)