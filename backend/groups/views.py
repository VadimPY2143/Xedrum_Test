from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Groups
from .serializers import GroupSerializer
from users.models import User


class GroupsView(APIView):
    def get(self, request, group_id=None):
        if group_id:
            try:
                group = Groups.objects.get(id=group_id)
                serializer = GroupSerializer(group)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Groups.DoesNotExist:
                return Response(
                    {'error': 'Group not found'},
                    status=status.HTTP_404_NOT_FOUND)
        else:
            groups = Groups.objects.all()
            serializer = GroupSerializer(groups, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = GroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, group_id):
        try:
            group = Groups.objects.get(id=group_id)
        except Groups.DoesNotExist:
            return Response(
                {'error': 'Group not found'},
                status=status.HTTP_404_NOT_FOUND)

        serializer = GroupSerializer(group, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, group_id):
        try:
            group = Groups.objects.get(id=group_id)
        except Groups.DoesNotExist:
            return Response(
                {'error': 'Group not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        users_in_group = User.objects.filter(group=group).count()
        if users_in_group > 0:
            return Response(
                {
                    'error': f'Cannot delete group. {users_in_group} user(s) assigned to this group.',
                    'users_count': users_in_group
                },
                status=status.HTTP_403_FORBIDDEN
            )

        group.delete()
        return Response(
            {'message': 'Group deleted successfully'},
            status=status.HTTP_204_NO_CONTENT
        )
