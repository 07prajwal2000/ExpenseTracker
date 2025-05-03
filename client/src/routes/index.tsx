import { MdAdd } from "react-icons/md";
import { Button, Divider, Flex, Group, Text, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className="p-2">
			<Flex direction={"column"} gap={5}>
				<Group justify="space-between">
					<Title order={2}>Dashboard</Title>
					<Button size="xs">
						<Group align="center" justify="space-around" gap={3}>
							<MdAdd size={20} />
							<Text>Add Expense</Text>
						</Group>
					</Button>
				</Group>
				<Divider />
        
			</Flex>
		</div>
	);
}
