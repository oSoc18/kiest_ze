# Generated by Django 2.0.7 on 2018-07-25 13:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kiestze', '0020_auto_20180725_1159'),
    ]

    operations = [
        migrations.AlterField(
            model_name='politiekerpartijlink',
            name='verkozen_volgnummer',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='politiekerpartijlink',
            name='volgnummer',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='politiekerpartijlink',
            name='voorkeurstemmen',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
