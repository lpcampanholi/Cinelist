from django.urls import path
from .views import TopMoviesView, SearchView, FavoriteView, SharedFavoriteListView, GenerateShareableLinkView
from . import views

urlpatterns = [
    path('search/', SearchView.as_view(), name='search'),
    path('fav/add/<int:movie_id>/', FavoriteView.as_view(), name='add_to_favorites'),
    path('fav/remove/<int:movie_id>/', FavoriteView.as_view(), name='remove_from_favorites'),
    path('fav/list/', FavoriteView.as_view(), name='favorite_list'),
    path('fav/generate-link/', GenerateShareableLinkView.as_view(), name='generate_shareable_link'),
    path('shared/<str:token>/', SharedFavoriteListView.as_view(), name='shared_favorite_list'),
    path('top/rated/', TopMoviesView.as_view(), {'category': 'top_rated'}, name='top-rated'),
    path('top/popular/', TopMoviesView.as_view(), {'category': 'popular'}, name='top-popular'),
    path('top/now_playing/', TopMoviesView.as_view(), {'category': 'now_playing'}, name='top-now-playing'),
    path('<int:id>/', views.movie_detail_view, name='movie-detail'),
]