# contractapp/models.py
from django.db import models

class ServiceContract(models.Model):
    N = models.CharField(max_length=255)
    Exp = models.TextField()

    def __str__(self):
        return self.N
