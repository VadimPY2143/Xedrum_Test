from django.db import models
from main.base import TimeStamp

class User(TimeStamp):
    username = models.CharField(max_length=100)
    group = models.ForeignKey('groups.Groups', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.username
