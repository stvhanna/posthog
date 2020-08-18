# Generated by Django 3.0.3 on 2020-03-07 00:22

import secrets

from django.db import migrations, models


def add_signup_tokens(apps, schema_editor):
    Team = apps.get_model("posthog", "Team")
    for team in Team.objects.filter(signup_token__isnull=True):
        team.signup_token = secrets.token_urlsafe(22)
        team.save()


def backwards(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("posthog", "0030_migrate_dashboard_days"),
    ]

    operations = [
        migrations.AddField(
            model_name="team", name="signup_token", field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.RunPython(add_signup_tokens, backwards),
    ]
