# Generated by Django 2.0.7 on 2018-07-23 07:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kiestze', '0006_auto_20180721_0951'),
    ]

    operations = [
        migrations.AlterField(
            model_name='approver',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]