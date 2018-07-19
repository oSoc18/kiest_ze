import csv


def toISO(date):
	year = date[6:]
	day = date[:2]
	month = date[3:5]
	date = "%s/%s/%s" %(year, month, day)
	return date


tablename = 'kiestze_gemeente'
incrementing_id = 1
sql  = "INSERT INTO %s (naam, nis, begindatum, einddatum) VALUES\n" % tablename


with open('KBO-codes-identificatie_nis.csv', newline='', encoding="utf8") as csvfile:
	reader = csv.DictReader(csvfile, delimiter='	', quotechar='"')
	for row in reader:
		naam = row['NEDERLANDSE BENAMING'].replace("'", "''").title()
		nis = row['CODE']
		begindatum = row['BEGINDATUM'].replace('.', '/')
		begindatum = toISO(begindatum)
		einddatum = row['EINDDATUM'].replace('.', '/').replace('9999', '2100')
		einddatum = toISO(einddatum)

		sql += "('%s', %s, '%s', '%s'),\n" %(naam, nis, begindatum, einddatum)

		incrementing_id += 1

sql = sql[:-2] # remove trailing comma
sql += ";"



f = open("gemeenten.sql","wb")
f.write(sql.encode("UTF-8"))