# Generated by Django 3.1.7 on 2021-05-04 15:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('socials', '0003_auto_20210428_2156'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification_model',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pro_pic', models.TextField(blank=True)),
                ('username', models.TextField()),
                ('content', models.TextField()),
                ('read', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notifications', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
