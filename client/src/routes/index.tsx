import { MdAdd } from "react-icons/md";
import {
	Button,
	Container,
	Divider,
	Flex,
	Grid,
	Group,
	Text,
	Title,
} from "@mantine/core";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getAllExpenses } from "../data/expense";
import ExpenseCard from "../components/expenseCard";

export const Route = createFileRoute("/")({
	component: Index,
	loader: async ({ params }) => {
		const { data } = await getAllExpenses();
		return {
			data: data!,
		};
	},
	staleTime: -1,
});

function Index() {
	const { data } = Route.useLoaderData();

	return (
		<Container fluid mx={0}>
			<Flex direction={"column"} gap={6}>
				<Group justify="space-between">
					<Title order={2}>Dashboard</Title>
					<Button size="xs">
						<Group align="center" justify="space-around" gap={3}>
							<MdAdd size={20} />
							<Text>Add Expense</Text>
						</Group>
					</Button>
				</Group>
				<Divider mb={"sm"} />
				<Grid>
					{data.map((expense) => (
						<Grid.Col key={expense.id} span={{ sm: 6, md: 4 }}>
							<ExpenseCard
								id={expense.id}
								title={expense.title}
								totalBills={expense.total_bills}
								totalContributors={expense.total_contributor}
								totalPaid={expense.total_completed}
							/>
						</Grid.Col>
					))}
				</Grid>
			</Flex>
		</Container>
	);
}
