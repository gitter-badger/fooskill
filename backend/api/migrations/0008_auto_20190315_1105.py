# Generated by Django 2.1.7 on 2019-03-15 18:05

from django.db import migrations
import django.db.models.functions.text


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20190315_1101'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='player',
            options={'ordering': [django.db.models.functions.text.Upper('name')]},
        ),
        migrations.AlterModelOptions(
            name='user',
            options={'ordering': [django.db.models.functions.text.Upper('username')]},
        ),
    ]
