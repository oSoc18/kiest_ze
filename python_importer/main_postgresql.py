import csv

import common # must be last import

# def yesno(question):
# 	question += ' [y/n] '
# 	answer = ''
# 	while answer != 'y' and answer != 'n':
# 		answer = input(question)
# 	if answer == 'y':
# 		return True
# 	else:
# 		return False



incrementing_partijen_id = 1

# sql_common = """
# USE kiestze;
# SET NAMES utf8;
# SET time_zone = '+00:00';
# SET foreign_key_checks = 0;
# SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';
# -- otherwise we get ERROR 2006 (HY000) at line 18: MySQL server has gone away
# SET global max_allowed_packet=64*1024*1024;
# """

sql_common = """
-- Generated by PythonImporter™©® copyright 1970. By using this, you agree to the terms and conditions.
"""

sql_partijen = "INSERT INTO %s (id, jaar, lijstnummer, lijstnaam, nis_id) VALUES\n" % common.partijen_tablename
sql_politiekers = "INSERT INTO %s (id, otb_id, naam, geboorte, geslacht) VALUES\n" % common.politiekers_tablename
sql_partijen_politiekers_link = "INSERT INTO %s (partij_id, politieker_id, volgnummer, voorkeurstemmen, verkozen, verkozen_volgnummer) VALUES\n" % common.politieker_partijen_link_tablename



nis_to_partijen_id = {}

with open('gemeente-2012-12-17T21 28 08_Lijstresultaten.csv', newline='', encoding="utf8") as csvfile:
	reader = csv.DictReader(csvfile, delimiter=',', quotechar='"')
	for row in reader:
		naam = common.eazyEscape(row['lijst'])
		nis = int(row['NIS'])
		lijstnummer = int(row['Lijstnummer'])

		sql_partijen += f"({incrementing_partijen_id},	2012,	{lijstnummer},	'{naam}',	{nis}),\n"

		if nis not in nis_to_partijen_id:
			nis_to_partijen_id[nis] = {} # Lijstnummer_to_partijen_id

		tmp = nis_to_partijen_id[nis]
		tmp[lijstnummer] = incrementing_partijen_id

		incrementing_partijen_id += 1

sql_partijen = sql_partijen[:-2] # remove trailing comma
sql_partijen += ";\n\n\n\n\n\n"



incerementing_politieker_id = 1

with open('gemeente-2012-12-17T21 28 08_Kanidaat_resultaten.csv', newline='', encoding="utf8") as csvfile:
	reader = csv.DictReader(csvfile, delimiter=',', quotechar='"')
	for row in reader:
		naam = row["Naam"].replace("'", "''")
		geboorte = 2012 - int(row["Leeftijd"])
		geslacht = row["Geslacht"]
		sql_politiekers += f"({incerementing_politieker_id},	0,	'{naam}',	'{geboorte}-01-01',	'{geslacht}'),\n"

		nis = int(row["NIS"])
		lijstnummer = int(row["Lijstnummer"])
		volgnummer = int(row["Volgnummer"])
		voorkeurstemmen = int(row["Voorkeurstemmen"])
		verkozen = int(row["Verkozen"])
		if verkozen == 1:
			verkozen = True
		elif verkozen == 0:
			verkozen = False


		verkozen_volgnummer = int(row["Verkozen volgnummer"])

		lijstnummer_to_partijen_id = nis_to_partijen_id.get(nis)
		partij_id = lijstnummer_to_partijen_id.get(lijstnummer)

		sql_partijen_politiekers_link += f"({partij_id},{incerementing_politieker_id},{volgnummer},{voorkeurstemmen},{verkozen},{verkozen_volgnummer}),\n"


		incerementing_politieker_id+=1

sql_politiekers = sql_politiekers[:-2] # remove trailing comma
sql_politiekers += ";\n\n\n\n\n\n"
sql_partijen_politiekers_link = sql_partijen_politiekers_link[:-2] # remove trailing comma
sql_partijen_politiekers_link += ";\n\n\n\n\n\n"



monster_query = sql_common + sql_partijen + sql_politiekers + sql_partijen_politiekers_link

f = open("sql_kiestze_2012_postgresql.sql","wb")
f.write(monster_query.encode("UTF-8"))
