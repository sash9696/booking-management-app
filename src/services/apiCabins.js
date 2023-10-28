import supabase from "./supabase";

export async function getCabins() {
	//query supabase client
	let { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}
	return data;
}

export async function createCabin(newCabin) {
	const { data, error } = await supabase
		.from("cabins")
		.insert([newCabin])
		.select();
	if (error) {
		console.error(error);
		throw new Error("Cabin could not be created");
	}
	return data;
}

export async function deleteCabin(id) {
	//query supabase client
	console.log("deleteCabin", id);
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}
	return data;
}
