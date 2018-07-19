import csv


tablename = 'kiestze_gemeente'
incrementing_id = 1
sql  = "INSERT INTO %s (gemeente, postcode, nis) VALUES\n" % tablename


with open('gemeenten-data.csv', newline='', encoding="utf8") as csvfile:
	reader = csv.DictReader(csvfile, delimiter='	', quotechar='"')
	for row in reader:
		naam = row['Gemeente'].title()
		postcode = row['Postcode']
		nis = row['NIS']

		sql += "(\"%s\", %s, %s),\n" %(naam, postcode, nis)

		incrementing_id += 1

sql = sql[:-2] # remove trailing comma
sql += ";"



f = open("gemeenten.sql","wb")
f.write(sql.encode("UTF-8"))