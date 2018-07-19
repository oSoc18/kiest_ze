from django.db import models
from django.utils import timezone


class Gemeente(models.Model):
	naam = models.CharField(max_length=100)
	nis = models.IntegerField(primary_key=True)
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
	nis = models.ForeignKey(Gemeente, on_delete=models.CASCADE)

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


class Aanpassing:
	guid = models.CharField(max_length=36, primary_key=True) # uuid.uuid4()
	politieker_id = models.ForeignKey(Politieker, on_delete=models.CASCADE)
	veld = models.CharField(max_length=50)
	value = models.CharField(max_length=300)
	accepted_date = models.DateField()

	class Meta:
		verbose_name = 'Aanpassing'
		verbose_name_plural = 'Aanpassing'