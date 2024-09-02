from django.contrib import admin
from .models import Favorite, Genre, FavoriteShareToken

admin.site.register(Favorite)
admin.site.register(Genre)
admin.site.register(FavoriteShareToken)