import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	//query supabase client
	let { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}
	return data;
}

export async function createEditCabin(newCabin, id) {

	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		"/",
		""
	);
	const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	console.log('newCabin',{hasImagePath,imageName,imagePath})

	// https://xwncjkmfjagnjhfuohpq.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

	//1.create a cabin
	let query = supabase.from("cabins");

	//Create
	if (!id) query= query.insert([{ ...newCabin, image: imagePath }]);

	//Edit

	if (id) query= query.update({ ...newCabin, image: imagePath }).eq("id", id);

	// const { data, error } = await query
	// 	// .insert([newCabin]) earlier
	// 	.insert([{...newCabin, image: imagePath}])
	//

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be created");
	}
	//2.upload the image
	if(hasImagePath) return data;
	const { storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);

	//3.delete the cabin if there was an error uploading the image

	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		console.error(storageError);
		throw new Error(
			"Cabin Image could not be uploaded and the cabin was not created."
		);
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
