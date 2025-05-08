import { AppShell, Button, Group, ScrollArea, Title } from "@mantine/core";
import { useParams } from "@tanstack/react-router";
import React from "react";

const CustomAppShell: React.FC<{ children: any }> = ({ children }) => {
	const { id: expenseId } = useParams({
		from: "/expense/$id",
	});

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 260, breakpoint: "sm" }}
			padding={"md"}
		>
			<AppShell.Header>
				<Group h={"100%"} px={"md"}>
					<Title order={3}>Expense Tracker</Title>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p={"sm"}>
				<AppShell.Section grow mb={"sm"} component={ScrollArea}>
					<Button
						variant="default"
						fullWidth
						style={{
							border: "none",
						}}
					>
						Dashboard
					</Button>
					<Button
						variant="default"
						fullWidth
						style={{
							border: "none",
						}}
					>
						Bills
					</Button>
					
					<Button
						variant="default"
						fullWidth
						style={{
							border: "none",
						}}
					>
						Contributors
					</Button>
				</AppShell.Section>
			</AppShell.Navbar>
			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
};

export default CustomAppShell;
