# Generated by Django 2.0.7 on 2018-09-29 10:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kiestze', '0022_auto_20180929_1110'),
    ]

    operations = [
        migrations.AlterField(
            model_name='politiekerpartijlink',
            name='verkozen',
            field=models.NullBooleanField(default=False),
        ),
    ]