import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import PropTypes from "prop-types";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
	const { id: editId, ...editValues } = cabinToEdit;

	const isEditSession = Boolean(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});
	const { errors } = formState;

	const { isCreating, createCabin } = useCreateCabin();
	const { isEditing, editCabin } = useEditCabin();

	const isWorking = isEditing || isCreating;

	function onSubmit(data) {
		//data will bw all thr fields associate with input
		// console.log(data)
		// mutate(data);
		const image =
			typeof data.image === "string" ? data.image : data.image[0];

		console.log("onSubmit", image);
		if (isEditSession)
			editCabin({ newCabinData: { ...data, image }, id: editId });
		else
			createCabin(
				{ ...data, image: image },
				{ onSuccess: () => reset() }
			);
	}

	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow
				label="Maximum capacity"
				error={errors?.maxCapacity?.message}>
				<Input
					disabled={isWorking}
					type="number"
					id="maxCapacity"
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be atleast 1",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Regular Price"
				error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					{...register("regularPrice", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be atleast 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					disabled={isWorking}
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						validate: (value) =>
							value <= getValues().regularPrice ||
							"Discount should be less than regular price)",
					})}
				/>
			</FormRow>

			<FormRow label="description" error={errors?.description?.message}>
				<Textarea
					id="description"
					defaultValue=""
					disabled={isWorking}
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo">
				<FileInput
					id="image"
					accept="image/*"
					{...register("image", {
						required: isEditSession
							? false
							: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{" "}
					{isEditSession ? "Edit Cabin" : "Create New Cabin"}{" "}
				</Button>
			</FormRow>
		</Form>
	);
}

CreateCabinForm.propTypes = {
	cabinToEdit: PropTypes.object.isRequired,
	// other prop definitions here
};

export default CreateCabinForm;
