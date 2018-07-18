import requests



# same as in python_importer
sql_common = """

USE kiestze

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';
-- otherwise we get ERROR 2006 (HY000) at line 18: MySQL server has gone away
SET global max_allowed_packet=64*1024*1024;

"""
monster_query = sql_common



tableName = "Partij"
url = f'https://api.airtable.com/v0/app5SoKsYnuOY96ef/{tableName}?api_key=key2Jl1YfS4WWBFa5'

params = dict(
    origin='Chicago,IL',
    destination='Los+Angeles,CA',
    waypoints='Joplin,MO|Oklahoma+City,OK',
    sensor='false'
)

resp = requests.get(url=url) # , params=params
json_object = resp.json() # Check the JSON Response Content documentation below
#print(json_object["records"][0])


for record in json_object["records"]:
  #print(record)
  for fieldKey in record["fields"]:
    print(fieldKey)
    print(record["fields"][fieldKey])
    # now song is a dictionary
    #for attribute, value in song.iteritems():
    #    print(attribute, value) # example usage
print(type("test"))
sql_Partij = """

DROP TABLE IF EXISTS `air_Politiekers`;
CREATE TABLE `air_Politiekers` (
  `id` varchar(18) NOT NULL AUTO_INCREMENT,
  `otb_id` int(11) DEFAULT NULL,
  `naam` varchar(50) NOT NULL,
  `geboorte` date DEFAULT NULL,
  `geslacht` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `air_Politiekers` (`id`, `otb_id`, `naam`, `geboorte`, `geslacht`) VALUES

"""
# example record key: recmbyKsOdabhIOCd

f = open("sql_airtables.sql","wb")
f.write(monster_query.encode("UTF-8"))
