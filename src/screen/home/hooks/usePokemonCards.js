import { useQuery } from "@tanstack/react-query"
import { getRequest } from "../../../api/apiClient"
import { cardsListData } from "../../../mocks/cardsListData"


const usePokemonCards = () => {

    const getPokemonCards = async () => {
        const result = await getRequest('cards?page=1&pageSize=5')
        return result.data
    }
    const query = useQuery({ queryKey: ['cards'], queryFn: getPokemonCards })
    return query
}

export default usePokemonCards