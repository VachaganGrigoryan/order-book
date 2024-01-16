from rest_framework.permissions import IsAuthenticated


class IsOrderBookOwner(IsAuthenticated):

    @staticmethod
    def check_object_permission(user, obj):
        return bool(user and user.is_authenticated and user == obj.user)

    def has_object_permission(self, request, view, obj):
        return self.check_object_permission(request.user, obj)
