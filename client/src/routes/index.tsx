import { MdAdd } from "react-icons/md";
import {
	Button,
	Container,
	Divider,
	Flex,
	Grid,
	Group,
	Modal,
	Text,
	Title,
} from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { getAllExpenses } from "../data/expense";
import ExpenseCard from "../components/expenseCard";
import { useDisclosure } from "@mantine/hooks";
import CreateExpenseForm from "../components/createExpenseForm";

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
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<Container fluid mx={0}>
			<Flex direction={"column"} gap={6}>
				<Group justify="space-between">
					<Title order={2}>Dashboard</Title>
					<Button onClick={open} size="xs">
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
				<Modal size={'lg'} title="Create a new Expense" opened={opened} onClose={close}>
					<CreateExpenseForm onSuccess={close} />
				</Modal>
			</Flex>
		</Container>
	);
}
