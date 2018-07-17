import csv

sql_string = """-- Adminer 4.6.3 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `partijen`;
CREATE TABLE `partijen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jaar` int(4) NOT NULL,
  `lijstnummer` int(11) NOT NULL,
  `lijstnaam` varchar(100) NOT NULL,
  `nis` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `partijen` (`id`, `jaar`, `lijstnummer`, `lijstnaam`, `nis`) VALUES"""

incerementing_id = 1
#is_first_row = False

with open('gemeente-2012-12-17T21 28 08.csv', newline='', encoding="utf8") as csvfile:
	spamreader = csv.DictReader(csvfile, delimiter=',', quotechar='"')
	for row in spamreader:
		Naam = row["Naam"].replace("'", "\\'")
		Geboorte = 2012 - int(row["Leeftijd"])
		Geslacht = row["Geslacht"]
		sql_string += f"({incerementing_id},	0,	'{Naam}',	'{Geboorte}-01-01',	'{Geslacht}'),\n"
		incerementing_id+=1
		#print(', '.join(row))


sql_string += ";"

print(sql_string)


f= open("sql_politiekers.sql","wb")
f.write(sql_string.encode("UTF-8"))
