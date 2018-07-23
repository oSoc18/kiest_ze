from django.db import models
from django.utils import timezone
from allauth.socialaccount.models import SocialAccount


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


class User_edit(models.Model):
	guid = models.CharField(max_length=36, primary_key=True)  # uuid.uuid4()
	politieker = models.ForeignKey(Politieker, on_delete=models.CASCADE)
	column_name = models.CharField(max_length=100)
	accepted_date = models.DateField(null=True, blank=True)
	suggested_value = models.CharField(max_length=300)

	class Meta:
		verbose_name = 'User_edit'
		verbose_name_plural = 'User_edit'


class Approver(models.Model):
	aanpassing = models.ForeignKey(User_edit, on_delete=models.CASCADE)
	user_id = models.ForeignKey(SocialAccount, on_delete=models.CASCADE)
	date = models.DateField(default=timezone.now)
