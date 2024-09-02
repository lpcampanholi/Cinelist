from django.db import models
from django.contrib.auth.models import User
import secrets

class CachedMovie(models.Model):
    tmdb_id = models.IntegerField(unique=True)
    genre_ids = models.JSONField()
    genres = models.JSONField()
    title = models.CharField(max_length=255)
    overview = models.TextField()
    release_date = models.DateField()
    poster_path = models.URLField()
    backdrop_path = models.URLField()
    vote_average = models.FloatField()

    def __str__(self):
        return self.title

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tmdb_id = models.IntegerField()

    def __str__(self):
        return f"{self.user.username} - {self.tmdb_id}"


class Genre(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class FavoriteShareToken(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=6, unique=True, default='')

    def save(self, *args, **kwargs):
        if not self.token:
            self.token = self.generate_unique_token()
        super().save(*args, **kwargs)

    @classmethod
    def generate_unique_token(cls):
        while True:
            token = secrets.token_urlsafe(4)[:6]
            if not cls.objects.filter(token=token).exists():
                return token

    @classmethod
    def get_or_create_share_token(cls, user):
        try:
            share_token = cls.objects.get(user=user)
        except cls.DoesNotExist:
            share_token = cls.objects.create(user=user)
        return share_token.token

    def __str__(self):
        return f"Token for {self.user.username}"
