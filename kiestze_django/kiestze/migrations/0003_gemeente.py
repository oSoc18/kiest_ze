# Generated by Django 2.0.7 on 2018-07-19 12:33

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('kiestze', '0002_auto_20180718_1003'),
    ]

    operations = [
        migrations.CreateModel(
            name='Gemeente',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('naam', models.CharField(max_length=100)),
                ('nis', models.IntegerField()),
                ('begindatum', models.DateField(default=django.utils.timezone.now)),
                ('einddatum', models.DateField(default=django.utils.timezone.now)),
            ],
            options={
                'verbose_name': 'Gemeente',
                'verbose_name_plural': 'Gemeente',
            },
        ),
    ]
