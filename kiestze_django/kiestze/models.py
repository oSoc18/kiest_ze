from django.db import models
from django.utils import timezone
from allauth.socialaccount.models import SocialAccount
from django.contrib.auth.models import User


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
	naam = models.CharField(max_length=100)
	geboorte = models.DateField(blank=True)
	geslacht = models.CharField(max_length=1)

	class Meta:
		verbose_name = 'Politieker'
		verbose_name_plural = 'Politieker'

	def __str__(self):
		return self.naam + " [" + str(self.id) + "]"


class PolitiekerPartijLink(models.Model):
	partij = models.ForeignKey(Partij, on_delete=models.CASCADE)
	politieker = models.ForeignKey(Politieker, on_delete=models.CASCADE)
	volgnummer = models.IntegerField(blank=True)
	voorkeurstemmen = models.IntegerField(blank=True)
	verkozen = models.BooleanField(blank=True, default=False)
	verkozen_volgnummer = models.IntegerField(blank=True)

	class Meta:
		verbose_name = 'Politieker_partij_link'
		verbose_name_plural = 'Politieker_partij_link'


class EditableField(models.Model):
	id = models.AutoField(primary_key=True)
	fieldname = models.CharField(max_length=100, unique=True)

	class Meta:
		verbose_name = 'EditableField'
		verbose_name_plural = 'EditableField'

	def __str__(self):
		return self.fieldname


class UserEdit(models.Model):
	guid = models.CharField(max_length=36, primary_key=True)  # uuid.uuid4()
	politieker = models.ForeignKey(Politieker, on_delete=models.CASCADE)
	field = models.ForeignKey(EditableField, on_delete=models.CASCADE)
	accepted_date = models.DateTimeField(null=True, blank=True)
	suggested_value = models.CharField(max_length=300)

	class Meta:
		verbose_name = 'UserEdit'
		verbose_name_plural = 'UserEdit'

	def get_approvers(self):
		return Approver.objects.filter(aanpassing=self.guid)
	approvers = property(get_approvers)

	def __str__(self):
		return "[%s] %s (%s==>%s)" %(self.guid, self.politieker, self.field, self.suggested_value)


class Approver(models.Model):
	aanpassing = models.ForeignKey(UserEdit, on_delete=models.CASCADE)
	user_id = models.ForeignKey(User, on_delete=models.CASCADE) # SocialAccount
	date = models.DateTimeField(default=timezone.now)

	class Meta:
		verbose_name = 'Approver'
		verbose_name_plural = 'Approver'

	def __str__(self):
		return "[%s] (%s) %s" %(self.date, self.aanpassing, self.user_id)