# Generated by Django 2.0.7 on 2018-07-25 09:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kiestze', '0018_merge_20180725_1019'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='politieker',
            name='otb_id',
        ),
        migrations.AlterField(
            model_name='politieker',
            name='geboorte',
            field=models.DateField(blank=True),
        ),
    ]
