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

	def __str__(self):
		return self.naam + " (" + str(self.nis) + ")"


class Partij(models.Model):
	id = models.AutoField(primary_key=True)
	jaar = models.IntegerField()
	lijstnummer = models.IntegerField(null=True, blank=True)
	# nis,lijstnummer could be an unique reference too, but we choose to use an id for flexability
	lijstnaam = models.CharField(max_length=100)  # Op welke plaats kommt dese lijst op de verkiezingsbladen van de gemeente?
	nis = models.ForeignKey(Gemeente, on_delete=models.CASCADE)

	class Meta:
		verbose_name = 'Partij'
		verbose_name_plural = 'Partij'

	def __str__(self):
		return self.lijstnaam + " (" + str(self.nis) + ")"


class Politieker(models.Model):
	id = models.AutoField(primary_key=True)
	otb_id = models.IntegerField()
	naam = models.CharField(max_length=100)
	geboorte = models.DateField()
	geslacht = models.CharField(max_length=1)

	class Meta:
		verbose_name = 'Politieker'
		verbose_name_plural = 'Politieker'

	def __str__(self):
		return self.naam + " [" + str(self.id) + "]"


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

	def getApprovers(self):
		return Approver.objects.filter(aanpassing=self.guid)
	approvers = property(getApprovers)

	def __str__(self):
		return "[%s] %s (%s==>%s)" %(self.guid, self.politieker, self.column_name, self.suggested_value)


class Approver(models.Model):
	aanpassing = models.ForeignKey(User_edit, on_delete=models.CASCADE)
	user_id = models.ForeignKey(SocialAccount, on_delete=models.CASCADE)
	date = models.DateField(default=timezone.now)
