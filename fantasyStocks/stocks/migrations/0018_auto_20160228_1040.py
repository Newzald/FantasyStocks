# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-02-28 16:40
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('stocks', '0017_auto_20160103_1624'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stock',
            name='last_updated',
            field=models.DateTimeField(default=datetime.datetime(2016, 2, 28, 16, 20, 44, 899225, tzinfo=utc)),
        ),
    ]
