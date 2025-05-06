import { createFileRoute } from "@tanstack/react-router";
import { getExpense } from "../../data/expense";
import CustomAppShell from "../../components/AppShell";

export const Route = createFileRoute("/expense/$id")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const { data } = await getExpense(params.id);
		return {
			data,
		};
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
