from rest_framework import viewsets
from rest_framework.response import Response
from posthog.models import Event, PersonDistinctId
from django.db.models import Min, Sum, Subquery, OuterRef, Count

class PathsViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    def list(self, request):

        team = request.user.team_set.get()
        first_col = PersonDistinctId.objects.values('distinct_id')\
            .annotate(first_url=Subquery(
                Event.objects.filter(
                    team=team,
                    distinct_id=OuterRef('distinct_id')
                ).order_by('id').values('properties__$current_url')[:1]
            ))\
            .annotate(second_url=Subquery(
                Event.objects.filter(
                    team=team,
                    pk__gt=Subquery(
                        Event.objects.filter(
                            team=team,
                            **{'properties__$current_url': OuterRef('first_url')}
                        ).order_by('id').values('id')[:1]
                    ),
                    distinct_id=OuterRef('distinct_id')
                ).order_by('id').values('properties__$current_url')[:1]
            ))\
            .values('first_url')\
            .annotate(count=Count('first_url'))
        

        from ipdb import set_trace; set_trace()
        return Response([])
