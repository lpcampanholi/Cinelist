import requests
from django.conf import settings
from django.forms.models import model_to_dict
from .models import Favorite, CachedMovie

class Movie:
    def __init__(self, tmdb_id, genre_ids, title, overview, release_date, poster_path, backdrop_path, vote_average, user=None):
        self.tmdb_id = tmdb_id
        self.genre_ids = genre_ids
        self.title = title
        self.overview = overview
        self.release_date = release_date
        self.poster_path = poster_path
        self.backdrop_path = backdrop_path
        self.vote_average = vote_average
        self.is_favorite = False
        self.genres = self.genres_by_id()

        if user:
            self.check_favorite(user)

        self.save_to_cache()

    def save_to_cache(self):
        try:
            # Verifica se o filme já existe no cache
            if not CachedMovie.objects.filter(tmdb_id=self.tmdb_id).exists():
                if CachedMovie.objects.count() >= 100:  # limite de filmes no banco
                    oldest_movie = CachedMovie.objects.earliest('id')
                    oldest_movie.delete()

                CachedMovie.objects.create(
                    tmdb_id=self.tmdb_id,
                    genre_ids=self.genre_ids,
                    genres=self.genres,
                    title=self.title,
                    overview=self.overview,
                    release_date=self.release_date,
                    poster_path=self.poster_path,
                    backdrop_path=self.backdrop_path,
                    vote_average=self.vote_average
                )

        except Exception as e:
            print(f"Erro ao salvar o filme {self.title} no cache: {str(e)}")

    def check_favorite(self, user):
        self.is_favorite = Favorite.objects.filter(user=user, tmdb_id=self.tmdb_id).exists()

    def genres_by_id(self):
        from .models import Genre
        return [genre.name for genre in Genre.objects.filter(id__in=self.genre_ids)]

    def to_dict(self):
        return {
            'tmdb_id': self.tmdb_id,
            'genre_ids': self.genre_ids,
            'genres': self.genres,
            'title': self.title,
            'overview': self.overview,
            'release_date': self.release_date,
            'poster_path': self.poster_path,
            'backdrop_path': self.backdrop_path,
            'vote_average': self.vote_average,
            'is_favorite': self.is_favorite
        }

    @classmethod
    def from_api_data(cls, movie_data, user=None):
        return cls(
            tmdb_id=movie_data.get('tmdb_id') or movie_data.get('id'),
            genre_ids=movie_data.get('genre_ids') or [],
            title=movie_data.get('title') or 'Título Desconhecido',
            overview=movie_data.get('overview') or 'Sem descrição disponível',
            release_date=movie_data.get('release_date') or '0000-00-00',
            poster_path=movie_data.get('poster_path') or '',
            backdrop_path=movie_data.get('backdrop_path') or '',
            vote_average=movie_data.get('vote_average') or 0,
            user=user
        )

    @classmethod
    def sort_by_vote_average(cls, movies):
        return sorted(movies, key=lambda movie: movie.vote_average, reverse=True)


def tmdb_request(endpoint, params=None):
    if params is None:
        params = {}
    params['api_key'] = settings.TMDB_API_KEY
    url = f"https://api.themoviedb.org/3/{endpoint}"
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()


def search_movies(query):
    base_url = "https://api.themoviedb.org/3/search/movie"
    url = f"{base_url}?api_key={settings.TMDB_API_KEY}&language=pt-BR&query={query}&page=1"
    response = requests.get(url)
    return response.json()


def get_movie_details(movie_id):
    try:
        cached_movie = CachedMovie.objects.get(tmdb_id=movie_id)
        return model_to_dict(cached_movie, fields=[
            'tmdb_id',
            'genre_ids',
            'genres',
            'title',
            'overview',
            'release_date',
            'poster_path',
            'backdrop_path',
            'vote_average',
        ])
    except CachedMovie.DoesNotExist:
        url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={settings.TMDB_API_KEY}&language=pt-BR"
        response = requests.get(url)
        movie_data = response.json()

        if 'genres' in movie_data:
            movie_data['genre_ids'] = [genre['id'] for genre in movie_data['genres']]
            movie_data['genres'] = [genre['name'] for genre in movie_data['genres']]

        movie_instance = Movie.from_api_data(movie_data)
        movie_instance.save_to_cache()

        return movie_instance.to_dict()

def get_top_movies(category):
    base_url = "https://api.themoviedb.org/3/movie/"
    url = f"{base_url}{category}?api_key={settings.TMDB_API_KEY}&language=pt-BR&page=1"
    response = requests.get(url)
    return response.json()

