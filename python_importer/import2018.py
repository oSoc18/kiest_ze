import requests
import uuid  # https://github.com/skorokithakis/shortuuid
import datetime
from time import sleep
import csv

import common  # must be last import

# C:\Users\emill\dev\kiest_ze\python_importer\airtables_postgresql.py
# C:\Users\emill\dev\kiest_ze\kiestze_django\kiestze_django\secret.py

cur = common.conn.cursor()

sql_partijen = "INSERT INTO %s (id, jaar, lijstnummer, lijstnaam, nis_id) VALUES\n" % common.partijen_tablename
sql_politiekers = "INSERT INTO %s (id, naam, geboorte, geslacht) VALUES\n" % common.politiekers_tablename
sql_partijen_politiekers_link = "INSERT INTO %s (partij_id, politieker_id, volgnummer, voorkeurstemmen, verkozen, verkozen_volgnummer) VALUES\n" % common.politieker_partijen_link_tablename

cur.execute("SELECT MAX(id) FROM kiestze_politieker;")
numer_of_politicians = cur.fetchone()
incerementing_politieker_id = numer_of_politicians[0]

cur.execute("SELECT MAX(id) FROM kiestze_partij;")
numer_of_partijen = cur.fetchone()
incrementing_partijen_id = numer_of_partijen[0]


def intTryParse(str, default):
	try:
		return int(str)
	except ValueError:
		return default


cur.execute("SELECT id,naam FROM kiestze_politieker;")
politiekers = cur.fetchall()
# print(politiekers)
politiekersDict = {}  # naam to id
for tupe in politiekers:
	# there are some duplicate names, but it is impossible to separate them 100% correctly
	politiekersDict[tupe[1]] = tupe[0]

nisLijstnaamToPartijDict = {}

with open('Export_ADef_TtesInfos_CGV_21092018_13h02_pers.csv', newline='', encoding="utf8") as csvfile:
	reader = csv.DictReader(csvfile, delimiter=';', quotechar='"')
	for row in reader:
		# print(row)
		naam = row['Achternaam_stembiljet'] + " " + row["voornaam_stembiljet"]
		nis = int(row['NIS'])
		lijstnummer = intTryParse(row['nr lijst'], 666)  # Zuienkerke heeft lijst nr 'A'
		volgnummer = int(row['volgnr'])
		voorkeurstemmen = "NULL"
		partij_naam = row["lijstnaam"]

		# cur.execute("SELECT * FROM kiestze_politieker WHERE naam = '" + naam + "';")
		# politieker_from_db = cur.fetchone()
		# if politieker_from_db is None:
		politiekerId = -1
		if naam not in politiekersDict:
			incerementing_politieker_id += 1
			sql_politiekers += f"({incerementing_politieker_id},	'{common.eazyEscape(naam)}',	NULL,	NULL),\n"
			politiekerId = incerementing_politieker_id
		else:
			politiekerId = politiekersDict[naam]

		key = "" + nis.__str__() + "-" + partij_naam
		partijId = -1
		if key not in nisLijstnaamToPartijDict:
			incrementing_partijen_id += 1
			sql_partijen += f"({incrementing_partijen_id},	2018,	{lijstnummer},	'{common.eazyEscape(partij_naam)}',	{nis}),\n"
			nisLijstnaamToPartijDict[key] = incrementing_partijen_id
			partijId = incrementing_partijen_id
		else:
			partijId = nisLijstnaamToPartijDict[key]

		sql_partijen_politiekers_link += f"({partijId},{politiekerId},{volgnummer},{voorkeurstemmen}, NULL, NULL),\n"

sql_politiekers = sql_politiekers[:-2]  # remove trailing comma
sql_politiekers += ";\n\n\n\n\n\n"
sql_partijen = sql_partijen[:-2]  # remove trailing comma
sql_partijen += ";\n\n\n\n\n\n"
sql_partijen_politiekers_link = sql_partijen_politiekers_link[:-2]  # remove trailing comma
sql_partijen_politiekers_link += ";\n\n\n\n\n\n"

monster_query = sql_partijen + sql_partijen_politiekers_link

f = open("import2018_politiekers.sql", "wb")
f.write(sql_politiekers.encode("UTF-8"))

f = open("import2018.sql", "wb")
f.write(monster_query.encode("UTF-8"))
