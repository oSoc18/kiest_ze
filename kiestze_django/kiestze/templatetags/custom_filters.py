# based on https://ianrolfe.livejournal.com/37243.html

# my_filters.py
# Some custom filters for dictionary lookup.
from django.template.defaultfilters import register

@register.filter(name='lookup')
def lookup(dict, index):
    if index in dict:
        return dict[index]
    return ''

# HACK to make us able to index an dictionary, and return the suggested_value from that element
@register.filter(name='lookup_suggested_value')
def lookup(dict, index):
    if index in dict:
        return dict[index]["suggested_value"]
    return ''
