import requests
import uuid  # https://github.com/skorokithakis/shortuuid
import datetime
from time import sleep
import csv

import common  # must be last import

cur = common.conn.cursor()

tablename = 'kiestze_gemeente'
sql  = "INSERT INTO %s (naam, nis, begindatum, einddatum) VALUES\n" % tablename


cur.execute("SELECT nis,naam FROM kiestze_gemeente;")
politiekers = cur.fetchall()
# print(politiekers)
nisToNaam = {}  # naam to id
for tupe in politiekers:
	# there are some duplicate names, but it is impossible to separate them 100% correctly
	nisToNaam[tupe[0]] = tupe[1]


with open('REFNIS_2019.csv', newline='', encoding="utf8") as csvfile:
	reader = csv.DictReader(csvfile, delimiter=';', quotechar='"')
	for row in reader:
		nis = int(row['Code INS'])
		naam = row["Entités administratives"]

		if nis not in nisToNaam:
			sql += f"('{common.eazyEscape(naam)}',	{nis},	NULL, NULL),\n"



sql = sql[:-2] # remove trailing comma
sql += ";"



f = open("gemeenten_extra2019.sql","wb")
f.write(sql.encode("UTF-8"))
