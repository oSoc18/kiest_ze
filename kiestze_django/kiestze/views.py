from django.shortcuts import render
from django.http import HttpResponse
from .models import *

def index(request):
	context = {}
	context['text'] = []

	politiekers = Politieker.objects.filter(naam__search='Tommy')
	for x in politiekers:
		text = "%s [%i]" %(x.naam, x.id)
		context['text'].append(text)

	return render(request, 'index.html', context)