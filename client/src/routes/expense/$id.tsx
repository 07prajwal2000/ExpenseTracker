import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getExpense } from "../../data/expense";
import CustomAppShell from "../../components/AppShell";
import { isAxiosError } from "axios";
import { notifications } from "@mantine/notifications";

export const Route = createFileRoute("/expense/$id")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const { data } = await getExpense(params.id);
		return {
			data,
		};
	},
	errorComponent: (data) => {
		const nav = useNavigate();
		notifications.show({
			title: "Error",
			message: isAxiosError(data.error) ? data.error.response?.data.message : "Unable to load data",
			color: "red",
			id: "expense-by-id-error",
		});
		nav({
			to: "/",
		});
		return <></>;
	},
});

function RouteComponent() {
	const { data } = Route.useLoaderData();

	return (
		<CustomAppShell>
			<div></div>
		</CustomAppShell>
	);
}
