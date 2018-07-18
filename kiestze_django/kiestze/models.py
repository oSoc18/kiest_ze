from django.db import models

class Partij(models.Model):
	id = models.IntegerField(primary_key=True)
	jaar = models.IntegerField()
	lijstnummer = models.IntegerField()
	lijstnaam = models.CharField(max_length=100)
	nis = models.IntegerField()

	class Meta:
		verbose_name = 'Partij'
		verbose_name_plural = 'Partij'

class Politieker(models.Model):
	id = models.IntegerField(primary_key=True)
	otb_id = models.IntegerField()
	naam = models.CharField(max_length=100)
	geboorte = models.DateField()
	geslacht = models.CharField(max_length=1)

	class Meta:
		verbose_name = 'Politieker'
		verbose_name_plural = 'Politieker'

class Politieker_partij_link(models.Model):
	partij_id = models.ForeignKey(Partij, on_delete=models.CASCADE)
	politieker_id = models.ForeignKey(Politieker, on_delete=models.CASCADE)
	volgnummer = models.IntegerField()
	voorkeurstemmen = models.IntegerField()
	verkozen = models.BooleanField()
	verkozen_volgnummer = models.IntegerField()

	class Meta:
		verbose_name = 'Politieker_partij_link'
		verbose_name_plural = 'Politieker_partij_link'