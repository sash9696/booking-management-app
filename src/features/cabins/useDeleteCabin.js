import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useDeleteCabin() {
	//hook to return the instance of query client that I put in main.jsx
	const queryClient = useQueryClient();

	//to mutate remote state

	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		mutationFn: deleteCabinApi,
		onSuccess: () => {
			toast.success("Cabin successfully deleted");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		}, //what to do as soon asthe mutuation is successfull so we want to refetch the data
		onError: (error) => toast.error(error.message),
	});

    return {isDeleting, deleteCabin};
}
