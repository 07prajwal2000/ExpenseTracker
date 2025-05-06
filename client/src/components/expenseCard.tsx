import { FaFileInvoiceDollar } from "react-icons/fa";
import { Card, Flex, Group, Text } from "@mantine/core";
import React from "react";
import { MdPeople } from "react-icons/md";
import { useNavigate } from "@tanstack/react-router";

type ExpenseCardType = {
	id: string;
	title: string;
	totalBills: number;
	totalContributors: number;
	totalPaid: number;
};

const ExpenseCard: React.FC<ExpenseCardType> = (props) => {
	const nav = useNavigate();

	function onCardClick() {
		nav({
			to: "/expense/$id",
			params: {
				id: props.id,
			},
		});
	}

	return (
		<Card
			onClick={onCardClick}
			style={{
				cursor: "pointer",
			}}
			shadow="xs"
			padding={"sm"}
			m={0}
			radius={"md"}
		>
			<Text>{props.title}</Text>
			<Flex direction={"row"} mt={5} justify={"space-between"} align={"center"}>
				<Group gap={6}>
					<MdPeople size={20} />
					<Text>{props.totalContributors}</Text>
				</Group>
				<Group justify="start" gap={3}>
					<FaFileInvoiceDollar size={20} />
					<Text>{props.totalPaid}</Text>
					<Text>/</Text>
					<Text>{props.totalBills}</Text>
				</Group>
			</Flex>
		</Card>
	);
};

export default ExpenseCard;
