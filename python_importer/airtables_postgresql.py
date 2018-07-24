import requests
import uuid  # https://github.com/skorokithakis/shortuuid
import datetime
import psycopg2

# HACK: https://stackoverflow.com/questions/7505988/importing-from-a-relative-path-in-python/7506029#7506029
import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'kiestze_django', 'kiestze_django'))
import secret
#import ..kiestze_django/kiestze_django/secret.py
# C:\Users\emill\dev\kiest_ze\python_importer\airtables_postgresql.py
# C:\Users\emill\dev\kiest_ze\kiestze_django\kiestze_django\secret.py



# same as in python_importer
sql = """
INSERT INTO public.kiestze_useredit(guid, field, accepted_date, suggested_value, politieker_id) VALUES

"""

tableName = "Politiekers"
url = f'https://api.airtable.com/v0/app5SoKsYnuOY96ef/{tableName}?api_key=key2Jl1YfS4WWBFa5'


conn = psycopg2.connect(host="localhost",database="kiestze", user=secret.psql_user, password=secret.psql_password)
cur = conn.cursor()

resp = requests.get(url=url)
json_object = resp.json() # Check the JSON Response Content documentation below

editablefield_names = {}

for record in json_object["records"]:
	naam_stukken = record["fields"]["Naam"].split(' ')
	cur.execute("SELECT * FROM kiestze_politieker WHERE naam ILIKE '%"+naam_stukken[0]+"%' AND  naam ILIKE '%"+naam_stukken[-1]+"%';")
	politieker_from_db = cur.fetchone()

	if politieker_from_db is None:
		print("NOT FOUND: "+record["fields"]["Naam"] + "   -- Partij: " + ", ".join(record["fields"]["Partij"]))
		continue

	politieker_id = politieker_from_db[0] # id is first element

	for fieldKey in record["fields"]:
		if fieldKey in ["Partij", "Mandaten", "Naam"]:
			#print("IGNORED")
			continue

		fieldValue = record["fields"][fieldKey]
		if isinstance(fieldValue, list):
			# assume this is image
			fieldValue = fieldValue[0]["thumbnails"]["large"]["url"]

		fieldKey = fieldKey.lower()
		editablefield_names[fieldKey] = "Numb value" # Just look at the keys

		guid = uuid.uuid4()
		column_name = fieldKey
		accepted_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
		suggested_value = fieldValue

		sql += "('%s', '%s', '%s', '%s', %s),\n" % (guid, column_name, accepted_date, suggested_value, politieker_id)
		print(" ")

# example record key: recmbyKsOdabhIOCd

sql_editablefield = """INSERT INTO kiestze_editablefield (fieldname) VALUES 
"""
for k in editablefield_names:
	sql_editablefield += "('"+k+"'),\n"
#('Foto')
sql_editablefield = sql_editablefield[:-2] # remove trailing comma
sql_editablefield += "\n"
sql_editablefield += """
ON CONFLICT (fieldname) DO NOTHING;\n\n\n\n\n"""


sql = sql[:-2] # remove trailing comma
sql += "\n;\n\n\n\n\n"

sql_all = sql_editablefield + sql

f = open("airtables_postgresql.sql","wb")
f.write(sql_all.encode("UTF-8"))

