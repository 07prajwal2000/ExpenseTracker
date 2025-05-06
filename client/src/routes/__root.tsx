import { AppShell, Button, Group, ScrollArea, Title } from "@mantine/core";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => (
		<>
			<Outlet />
		</>
	),
});
