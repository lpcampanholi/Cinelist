from django.contrib.auth import login, authenticate, logout as django_logout
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, RegisterSerializer

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = Token.objects.create(user=user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key
        })

class LoginAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, 'username': username})
        return Response({"error": "Invalid Credentials"}, status=400)


@method_decorator(csrf_exempt, name='dispatch')
class LogoutAPI(View):
    def post(self, request, *args, **kwargs):
        try:
            request.user.auth_token.delete()
            django_logout(request)
            return JsonResponse({"success": "Logged out successfully"}, status=200)
        except AttributeError:
            return JsonResponse({"error": "No active session found"}, status=400)

def check_auth_status(request):
    if request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': True, 'username': request.user.username})
    else:
        return JsonResponse({'isAuthenticated': False})