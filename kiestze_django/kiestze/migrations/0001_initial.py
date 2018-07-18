# Generated by Django 2.0.7 on 2018-07-18 08:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Partij',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('jaar', models.IntegerField()),
                ('lijstnummer', models.IntegerField()),
                ('lijstnaam', models.CharField(max_length=100)),
                ('nis', models.IntegerField()),
            ],
            options={
                'verbose_name': 'Partij',
                'verbose_name_plural': 'Partij',
            },
        ),
        migrations.CreateModel(
            name='Politieker',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('otb_id', models.IntegerField()),
                ('naam', models.CharField(max_length=100)),
                ('geboorte', models.DateField()),
                ('geslacht', models.CharField(max_length=1)),
            ],
            options={
                'verbose_name': 'Politieker',
                'verbose_name_plural': 'Politieker',
            },
        ),
        migrations.CreateModel(
            name='Politieker_partij_link',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('volgnummer', models.IntegerField()),
                ('voorkeurstemmen', models.IntegerField()),
                ('verkozen', models.BooleanField()),
                ('verkozen_volgnummer', models.IntegerField()),
                ('partij_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='kiestze.Partij')),
                ('politieker_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='kiestze.Politieker')),
            ],
            options={
                'verbose_name': 'Politieker_partij_link',
                'verbose_name_plural': 'Politieker_partij_link',
            },
        ),
    ]
