from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'group', 'created_at', 'updated_at')
    list_filter = ('group', 'created_at')
    search_fields = ('username',)
    readonly_fields = ('created_at', 'updated_at')
