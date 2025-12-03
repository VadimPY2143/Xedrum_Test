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


        group.delete()
        return Response(
            {'message': 'Group deleted successfully'},
            status=status.HTTP_204_NO_CONTENT
        )
