# based on https://ianrolfe.livejournal.com/37243.html

# my_filters.py
# Some custom filters for dictionary lookup.
from django.template.defaultfilters import register

@register.filter(name='lookup')
def lookup(dict_arg, index):
    if index in dict_arg:
        return dict_arg[index]
    return ''

# HACK to make us able to index an dictionary, and return the suggested_value from that element
@register.filter(name='lookup_suggested_value')
def lookup_suggested_value(dict_arg, index):
    if index in dict_arg:
        return dict_arg[index]["suggested_value"]
    return ''


@register.filter(name='length_filter')
def length_filter(list_arg):
    return len(list_arg)
