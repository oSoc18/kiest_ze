# Generated by Django 2.0.7 on 2018-07-23 09:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kiestze', '0007_auto_20180723_0743'),
    ]

    operations = [
        migrations.AlterField(
            model_name='partij',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='partij',
            name='lijstnummer',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]