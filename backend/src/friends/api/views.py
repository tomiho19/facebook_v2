from friends.models import Friend
from .serializers import FriendSerializer

from rest_framework import viewsets


class FriendViewSet(viewsets.ModelViewSet):
    serializer_class = FriendSerializer
    queryset = Friend.objects.all()

# from rest_framework.generics import (
#     ListAPIView,
#     RetrieveAPIView,
#     CreateAPIView,
#     DestroyAPIView,
#     UpdateAPIView
# )
#
# from friends.models import Friend
# from .serializers import FriendSerializer
#
#
# class FriendListView(ListAPIView):
#     queryset = Friend.objects.all().values('first_name', 'last_name', 'birth_date', 'id')
#     serializer_class = FriendSerializer
#
#
# class FriendDetailView(RetrieveAPIView):
#     queryset = Friend.objects.all().values('first_name', 'last_name', 'birth_date', 'id')
#     serializer_class = FriendSerializer
#
#
# class FriendCreateView(CreateAPIView):
#     queryset = Friend.objects.all()
#     serializer_class = FriendSerializer
#
#
# class FriendUpdateView(UpdateAPIView):
#     queryset = Friend.objects.all()
#     serializer_class = FriendSerializer
#
#
# class FriendDeleteView(DestroyAPIView):
#     queryset = Friend.objects.all()
#     serializer_class = FriendSerializer


