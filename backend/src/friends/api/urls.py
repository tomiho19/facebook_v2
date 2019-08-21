from .views import FriendViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', FriendViewSet, base_name='friend')
urlpatterns = router.urls