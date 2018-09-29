import requests
import uuid  # https://github.com/skorokithakis/shortuuid
import datetime
from time import sleep
import csv

import common # must be last import

# C:\Users\emill\dev\kiest_ze\python_importer\airtables_postgresql.py
# C:\Users\emill\dev\kiest_ze\kiestze_django\kiestze_django\secret.py

cur = common.conn.cursor()

sql_politiekers = "INSERT INTO %s (id, naam, geboorte, geslacht) VALUES\n" % common.politiekers_tablename

cur.execute("SELECT MAX(id) FROM kiestze_politieker;")
numer_of_politicians = cur.fetchone()
incerementing_politieker_id = numer_of_politicians[0]


with open('Export_ADef_TtesInfos_CGV_21092018_13h02_pers.csv', newline='', encoding="utf8") as csvfile:
	reader = csv.DictReader(csvfile, delimiter=';', quotechar='"')
	for row in reader:
		#print(row)
		naam = common.eazyEscape(row['Achternaam_stembiljet'] + " " + row["voornaam_stembiljet"])
		nis = int(row['NIS'])

		cur.execute("SELECT * FROM kiestze_politieker WHERE naam = '" + naam + "';")
		politieker_from_db = cur.fetchone()
		if politieker_from_db is None:
			incerementing_politieker_id += 1
			sql_politiekers += f"({incerementing_politieker_id},	'{naam}',	NULL,	NULL),\n"


sql_politiekers = sql_politiekers[:-2] # remove trailing comma
sql_politiekers += ";\n\n\n\n\n\n"

monster_query = sql_politiekers

f = open("import2018.sql","wb")
f.write(monster_query.encode("UTF-8"))
