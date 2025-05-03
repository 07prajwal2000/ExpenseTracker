import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import {
	MantineProvider,
} from "@mantine/core";

import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

// Create a new router instance
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<MantineProvider
			theme={{
				primaryColor: "blue",
				fontFamily: "Inter, sans-serif",
			}}
		>
			<RouterProvider router={router} />
		</MantineProvider>
	</StrictMode>
);
