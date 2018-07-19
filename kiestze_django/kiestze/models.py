from django.db import models
from django.utils import timezone

class Gemeente(models.Model):
	naam = models.CharField(max_length=100)
	nis = models.IntegerField()
	begindatum = models.DateField(default=timezone.now)
	einddatum = models.DateField(default=timezone.now)

	class Meta:
		verbose_name = 'Gemeente'
		verbose_name_plural = 'Gemeente'


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
	partij = models.ForeignKey(Partij, on_delete=models.CASCADE)
	politieker = models.ForeignKey(Politieker, on_delete=models.CASCADE)
	volgnummer = models.IntegerField()
	voorkeurstemmen = models.IntegerField()
	verkozen = models.BooleanField()
	verkozen_volgnummer = models.IntegerField()

	class Meta:
		verbose_name = 'Politieker_partij_link'
		verbose_name_plural = 'Politieker_partij_link'

class User_edits(models.Model):
	id = models.IntegerField(primary_key=True)
	politieker = models.ForeignKey(Politieker, on_delete=models.CASCADE)
	column_naam = models.CharField(max_length=100)
	accepted_date = models.DateField(null=True, blank=True)
	suggested_value = models.CharField(max_length=200)

	class Meta:
		verbose_name = 'User_edits'
		verbose_name_plural = 'User_edits'