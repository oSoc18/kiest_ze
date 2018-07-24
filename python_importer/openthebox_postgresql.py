import requests
import uuid  # https://github.com/skorokithakis/shortuuid
import datetime
import psycopg2
from time import sleep

# HACK: https://stackoverflow.com/questions/7505988/importing-from-a-relative-path-in-python/7506029#7506029
import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'kiestze_django', 'kiestze_django'))
import secret
#import ..kiestze_django/kiestze_django/secret.py
# C:\Users\emill\dev\kiest_ze\python_importer\airtables_postgresql.py
# C:\Users\emill\dev\kiest_ze\kiestze_django\kiestze_django\secret.py

conn = psycopg2.connect(host="localhost",database="kiestze", user=secret.psql_user, password=secret.psql_password)
cur = conn.cursor()

# same as in python_importer
sql = """
INSERT INTO public.kiestze_user_edit(guid, column_name, accepted_date, suggested_value, politieker_id) VALUES

"""

cur.execute("select * from kiestze_politieker;")
politieker_from_db = cur.fetchone()
print("Voorbeeld: " + str(politieker_from_db))
count = 0
while politieker_from_db is not None:
	if count >= 500:
		break

	sleep(1/100) # max 100 request per second

	politieker_id = politieker_from_db[0]
	politieker_name = politieker_from_db[2]

	"select * from kiestze_user_edit WHERE column_name = 'Foto' and politieker_id=22295;"

	resp2 = requests.get(url="https://openthebox.be/api/entities/search/"+politieker_name+"/nl")
	json_object2 = resp2.json()

	possible_people = []
	for person in json_object2:
		#print(person)
		if "isPolitician" in person and person["isPolitician"] == True:
			possible_people.append(person)

	if len(possible_people) == 1: # no ambiguety
		person = possible_people[0]

		pid_lst = person["pid"]
		pid_lst = map(chr, pid_lst)
		pid = "".join(pid_lst)
		pid = int(pid)
		print("PID: " + str(pid))

		guid = uuid.uuid4()
		column_name = "openthebox_id"
		accepted_date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
		suggested_value = pid

		sql += "('%s', '%s', '%s', '%s', %s),\n" % (guid, column_name, accepted_date, suggested_value, politieker_id)

	#break
	count += 1
	politieker_from_db = cur.fetchone()


sql = sql[:-2] # remove trailing comma
sql += "\n;\n\n\n\n\n"

f = open("openthebox_postgresql.sql","wb")
f.write(sql.encode("UTF-8"))
