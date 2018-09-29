import psycopg2

# HACK: https://stackoverflow.com/questions/7505988/importing-from-a-relative-path-in-python/7506029#7506029
import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'kiestze_django', 'kiestze_django'))
import secret
#import ..kiestze_django/kiestze_django/secret.py

partijen_tablename = 'kiestze_partij'
politiekers_tablename = 'kiestze_politieker'
politieker_partijen_link_tablename = 'kiestze_politiekerpartijlink'

conn = psycopg2.connect(host="localhost",database="kiestze", user=secret.psql_user, password=secret.psql_password)

def eazyEscape(str):
	return str.replace("'", "''")
