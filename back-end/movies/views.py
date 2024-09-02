from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.cache import cache
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.utils.decorators import method_decorator
from django.urls import reverse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from .utils import search_movies, get_top_movies, get_movie_details, Movie
from .models import Favorite, FavoriteShareToken


class TopMoviesView(View):
    def get(self, request, *args, **kwargs):
        category = kwargs.get('category')
        limit = 10  # Altere este valor conforme necessário

        cache_key = f"top_movies_raw_{category}_{limit}"
        api_results = cache.get(cache_key)

        if not api_results:
            api_results = get_top_movies(category).get('results', [])[:limit]
            cache.set(cache_key, api_results, timeout=60 * 60)

        results = []
        for movie_data in api_results:
            movie = Movie.from_api_data(movie_data, user=request.user if request.user.is_authenticated else None)
            results.append(movie)

        sorted_movies = Movie.sort_by_vote_average(results)
        sorted_movies_dicts = [movie.to_dict() for movie in sorted_movies]

        return JsonResponse(sorted_movies_dicts, safe=False)

class SearchView(View):
    def get(self, request):
        query = request.GET.get('q')
        results = []
        if query:
            api_results = search_movies(query)
            for movie_data in api_results.get('results', []):
                movie = Movie.from_api_data(movie_data, user=request.user if request.user.is_authenticated else None)
                results.append(movie)
            sorted_movies = Movie.sort_by_vote_average(results)
            sorted_movies_dicts = [movie.to_dict() for movie in sorted_movies]
        else:
            sorted_movies_dicts = []

        return JsonResponse(sorted_movies_dicts, safe=False)

@method_decorator(csrf_exempt, name='dispatch')
class FavoriteView(LoginRequiredMixin, View):

    def post(self, request, movie_id):
        """Adiciona um filme aos favoritos do usuário"""
        user = request.user
        if Favorite.objects.filter(user=user, tmdb_id=movie_id).exists():
            return JsonResponse({'message': 'Este filme já está nos seus favoritos.'}, status=400)

        Favorite.objects.create(user=user, tmdb_id=movie_id)
        return JsonResponse({'message': f'Filme {movie_id} adicionado aos favoritos com sucesso.'}, status=201)

    def delete(self, request, movie_id):
        """Remove um filme dos favoritos do usuário"""
        user = request.user
        try:
            favorite = Favorite.objects.get(user=user, tmdb_id=movie_id)
            favorite.delete()
            return JsonResponse({'message': f'Filme {movie_id} removido dos favoritos com sucesso.'}, status=200)
        except Favorite.DoesNotExist:
            return JsonResponse({'message': 'Este filme não está nos seus favoritos.'}, status=404)

    def get(self, request):
        """Retorna a lista de filmes favoritos do usuário"""
        user = request.user
        favorites = Favorite.objects.filter(user=user)
        favorite_movies = []

        for favorite in favorites:
            movie_data = get_movie_details(favorite.tmdb_id)
            movie = Movie.from_api_data(movie_data, user=user)
            favorite_movies.append(movie.to_dict())

        return JsonResponse(favorite_movies, safe=False)

class GenerateShareableLinkView(LoginRequiredMixin, View):

    def get(self, request):
        """Gera e retorna o token de compartilhamento para a lista de favoritos do usuário"""
        user = request.user
        token = FavoriteShareToken.get_or_create_share_token(user)
        return JsonResponse({'token': token})



class SharedFavoriteListView(View):
    def get(self, request, token):
        """Retorna a lista de filmes favoritos compartilhada baseada em um token"""
        share_token = get_object_or_404(FavoriteShareToken, token=token)
        user = share_token.user

        favorites = Favorite.objects.filter(user=user)
        favorite_movies = []

        for favorite in favorites:
            movie_data = get_movie_details(favorite.tmdb_id)
            movie = Movie.from_api_data(movie_data)
            favorite_movies.append(movie)

        favorite_movies = Movie.sort_by_vote_average(favorite_movies)
        favorite_movies_dicts = [movie.to_dict() for movie in favorite_movies]

        response_data = {
            "username": user.username,
            "favorite_movies": favorite_movies_dicts
        }

        return JsonResponse(response_data, safe=False)


def movie_detail_view(request, id):
    movie_data = get_movie_details(id)
    movie = Movie.from_api_data(movie_data, user=request.user if request.user.is_authenticated else None)
    return JsonResponse(movie.to_dict())


@login_required
def add_to_favorites(request, tmdb_id):
    user = request.user

    if Favorite.objects.filter(user=user, tmdb_id=tmdb_id).exists():
        return JsonResponse({'message': 'Este filme já está nos seus favoritos.'}, status=400)

    Favorite.objects.create(user=user, tmdb_id=tmdb_id)
    return JsonResponse({'message': 'Filme adicionado aos favoritos com sucesso.'}, status=201)


@login_required
def remove_from_favorites(request, movie_id):
    user = request.user

    try:
        favorite = Favorite.objects.get(user=user, tmdb_id=movie_id)
        favorite.delete()
        return JsonResponse({'message': 'Filme removido dos favoritos com sucesso.'}, status=200)
    except Favorite.DoesNotExist:
        return JsonResponse({'message': 'Este filme não está nos seus favoritos.'}, status=404)


@login_required
def favorite_list(request):
    user = request.user
    favorites = Favorite.objects.filter(user=user)
    favorite_movies = []

    for favorite in favorites:
        movie_data = get_movie_details(favorite.tmdb_id)
        movie = Movie.from_api_data(movie_data, user=user)
        favorite_movies.append(movie.to_dict())

    return JsonResponse(favorite_movies, safe=False)

@login_required
def generate_shareable_link(request):
    user = request.user
    token = FavoriteShareToken.get_or_create_share_token(user)
    shareable_link = request.build_absolute_uri(reverse('shared_favorite_list', args=[token]))
    return JsonResponse({'shareable_link': shareable_link})
