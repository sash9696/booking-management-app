import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

function useCabins() {

    const {
		isLoading,
		data: cabins,
		error,
	} = useQuery({
		queryKey: ["cabins"], //can be more complex to identify the data
		queryFn: getCabins,
	});

  return {isLoading,cabins, error }
}

export default useCabins