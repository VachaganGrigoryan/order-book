from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.mixins import RetrieveModelMixin, CreateModelMixin

from auth.permissions import UserIsOwnerOrAdmin
from auth.serializers import UserSerializer, RegisterSerializer


class UserViewSet(CreateModelMixin, RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    serializer_register_class = RegisterSerializer
    permission_classes = (UserIsOwnerOrAdmin,)

    def get_serializer_class(self):
        serializers = {
            'retrieve': self.serializer_class,
            'create': self.serializer_register_class,
            'register': self.serializer_register_class,
        }

        return serializers.get(self.action, super().get_serializer_class())

    @action(methods=["POST"], detail=False, url_path="register")
    def register(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
