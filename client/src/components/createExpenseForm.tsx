import { createExpenseSchema } from "@expensetracker/backend";
import { Button, Flex, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { createExpense } from "../data/expense";
import { notifications } from "@mantine/notifications";
import { useRouter } from "@tanstack/react-router";

const CreateExpenseForm = ({onSuccess}: {onSuccess?: Function}) => {
	const form = useForm({
		mode: "controlled",
		initialValues: {
			title: "",
			description: "",
		},
	});
	const [loading, setLoading] = useState(false);
  const router = useRouter();

	async function onSubmit(values: any) {
		const parsed = createExpenseSchema.safeParse(values);
		if (!parsed.success) {
			for (let error of parsed.error.errors) {
				error.path.forEach((path) => {
					form.setErrors({
						[path]: error.message,
					});
				});
			}
			return;
		}
		try {
			setLoading(true);
			const result = await createExpense(values);
			if (result.code > 299) {
				notifications.show({
					title: "Error",
					message: result.message,
					color: "red",
				});
			}
      onSuccess?.();
			notifications.show({
				title: "Success",
				message: "Expense created",
				color: "green",
			});
      router.invalidate({
        filter(d) {
          return d.pathname === "/";
        },
      });
		} catch (error) {
			notifications.show({
				title: "Error",
				message: "Unable to create expense",
				color: "red",
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Flex direction={"column"} gap={"sm"}>
				<TextInput
					label="Title of Expense"
					placeholder="Enter title of expense"
					withAsterisk
					name="title"
					minLength={2}
					maxLength={100}
					{...form.getInputProps("title")}
				/>
				<Textarea
					label="Description"
					placeholder="Enter description of expense"
					name="description"
					minRows={5}
					minLength={0}
					maxLength={512}
					{...form.getInputProps("description")}
				/>
				<Button loading={loading} type="submit">
					Create
				</Button>
			</Flex>
		</form>
	);
};

export default CreateExpenseForm;
