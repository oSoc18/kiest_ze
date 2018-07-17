import csv

incrementing_partijen_id = 1

sql_partijen = """

DROP TABLE IF EXISTS `partijen`;
CREATE TABLE `partijen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jaar` int(4) NOT NULL,
  `lijstnummer` int(11) NOT NULL,
  `lijstnaam` varchar(100) NOT NULL,
  `nis` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `partijen` (`id`, `jaar`, `lijstnummer`, `lijstnaam`, `nis`) VALUES
"""

nis_to_partijen_id = dict()

with open('gemeente-2012-12-17T21 28 08_Lijstresultaten.csv', newline='', encoding="utf8") as csvfile:
	spamreader = csv.DictReader(csvfile, delimiter=',', quotechar='"')
	for row in spamreader:
		Naam = row["lijst"].replace("'", "\\'")
		NIS = int(row["NIS"])
		Lijstnummer = int(row["Lijstnummer"])

		sql_partijen += f"({incrementing_partijen_id},	2012,	{Lijstnummer},	'{Naam}',	{NIS}),\n"

		if NIS not in nis_to_partijen_id:
			nis_to_partijen_id[NIS] = dict() # Lijstnummer_to_partijen_id

		tmp = nis_to_partijen_id[NIS]
		tmp[Lijstnummer] = incrementing_partijen_id

		incrementing_partijen_id+=1

sql_partijen = sql_partijen[:-2] # remove trailing comma
sql_partijen += ";\n\n\n\n\n\n\n\n"













sql_politiekers = """

DROP TABLE IF EXISTS `politiekers`;
CREATE TABLE `politiekers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `otb_id` int(11) DEFAULT NULL,
  `naam` varchar(50) NOT NULL,
  `geboorte` date DEFAULT NULL,
  `geslacht` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `politiekers` (`id`, `otb_id`, `naam`, `geboorte`, `geslacht`) VALUES

"""

sql_partijen_politiekers_link = """

DROP TABLE IF EXISTS `politieker_partijen_link`;
CREATE TABLE `politieker_partijen_link` (
  `partij_id` int(11) NOT NULL,
  `politieker_id` int(11) NOT NULL,
  `volgnummer` int(11) NOT NULL,
  `voorkeurstemmen` int(11) NOT NULL,
  `verkozen` tinyint(1) NOT NULL,
  `verkozen_volgnummer` int(11) NOT NULL,
  KEY `partij_id` (`partij_id`),
  KEY `politieker_id` (`politieker_id`),
  CONSTRAINT `politieker_partijen_link_ibfk_1` FOREIGN KEY (`partij_id`) REFERENCES `partijen` (`id`),
  CONSTRAINT `politieker_partijen_link_ibfk_2` FOREIGN KEY (`politieker_id`) REFERENCES `politiekers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `kiestze`.`politieker_partijen_link`
(`partij_id`,`politieker_id`,`volgnummer`,`voorkeurstemmen`,`verkozen`,`verkozen_volgnummer`) VALUES
"""


incerementing_politieker_id = 1
#is_first_row = False

with open('gemeente-2012-12-17T21 28 08_Kanidaat_resultaten.csv', newline='', encoding="utf8") as csvfile:
	spamreader = csv.DictReader(csvfile, delimiter=',', quotechar='"')
	for row in spamreader:
		Naam = row["Naam"].replace("'", "\\'")
		Geboorte = 2012 - int(row["Leeftijd"])
		Geslacht = row["Geslacht"]
		sql_politiekers += f"({incerementing_politieker_id},	0,	'{Naam}',	'{Geboorte}-01-01',	'{Geslacht}'),\n"

		NIS = int(row["NIS"])
		Lijstnummer = int(row["Lijstnummer"])
		Volgnummer = int(row["Volgnummer"])
		Voorkeurstemmen = int(row["Voorkeurstemmen"])
		Verkozen = int(row["Verkozen"])
		verkozen_volgnummer = int(row["Verkozen volgnummer"])

		Lijstnummer_to_partijen_id = nis_to_partijen_id.get(NIS)
		partij_id = Lijstnummer_to_partijen_id.get(Lijstnummer)

		sql_partijen_politiekers_link += f"({partij_id},{incerementing_politieker_id},{Volgnummer},{Voorkeurstemmen},{Verkozen},{verkozen_volgnummer}),\n"


		incerementing_politieker_id+=1

sql_politiekers = sql_politiekers[:-2] # remove trailing comma
sql_politiekers += ";\n\n\n\n\n\n\n\n"
sql_partijen_politiekers_link = sql_partijen_politiekers_link[:-2] # remove trailing comma
sql_partijen_politiekers_link += ";\n\n\n\n\n\n\n\n"

#print(sql_partijen_politiekers_link)

sql_common = """

USE kiestze

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';
-- otherwise we get ERROR 2006 (HY000) at line 18: MySQL server has gone away
SET global max_allowed_packet=64*1024*1024;

"""

monster_query = sql_common + sql_partijen + sql_politiekers + sql_partijen_politiekers_link

f = open("sql_kiestze_2012.sql","wb")
f.write(monster_query.encode("UTF-8"))
