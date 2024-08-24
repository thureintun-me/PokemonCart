import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { getRequest } from "../../../api/apiClient"
import { cardsListData } from "../../../mocks/cardsListData"


const useInfinitePokemonCards = (search) => {
    const getPokemonCards = async ({pageParam=1}) => {
         const url = search ? `cards?q=name:${search}&page=${pageParam}&pageSize=3` : `cards?page=${pageParam}&pageSize=3`
        const result = await getRequest(url)
          return {
            data: result.data.data,
            nextPage: pageParam + 1,
          };
    }

    const query = useInfiniteQuery({
        queryKey: ['cards',search],
        queryFn: getPokemonCards,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.data.length < 3) return undefined;
            return lastPage.nextPage;
        },

    })
    return query
}

export default useInfinitePokemonCards