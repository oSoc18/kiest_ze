# Generated by Django 2.0.7 on 2018-09-29 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kiestze', '0021_auto_20180725_1509'),
    ]

    operations = [
        migrations.AlterField(
            model_name='politieker',
            name='geslacht',
            field=models.CharField(blank=True, max_length=1, null=True),
        ),
    ]