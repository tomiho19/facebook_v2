from django.db import models


class Friend(models.Model):
    first_name = models.CharField(max_length=120)
    last_name = models.CharField(max_length=120)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=50, default='password')
    birth_date = models.DateField()
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'