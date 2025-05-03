import { AppShell, Button, Group, ScrollArea, Title } from "@mantine/core";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => (
		<>
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
					<AppShell.Section grow my={"sm"} component={ScrollArea}>
						nav items
					</AppShell.Section>
					<AppShell.Section style={{
					}}>
						<Button fullWidth variant="outline" color="red">Logout</Button>
					</AppShell.Section>
				</AppShell.Navbar>
				<AppShell.Main>
					<Outlet />
				</AppShell.Main>
			</AppShell>
		</>
	),
});
