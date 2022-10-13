import { Badge, Box, Heading, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteEvent, toggleEventStatus } from "../api/event";
const EventList = () => {
    const [events, setEvents] = React.useState([]);
    const { user } = useAuth() || {};
    const toast = useToast();
    const refreshData = () => {
        if (!user) {
            setEvents([]);
            return;
        }
        const q = query(collection(db, "event"), where("user", "==", user.uid));
        onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
                ar.push({ id: doc.id, ...doc.data() });
            });
            setEvents(ar);
        });
    };
    useEffect(() => {
        refreshData();
    }, [user]);
    const handleEventDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this event?")) {
            deleteEvent(id);
            toast({ title: "Event deleted successfully", status: "success" });
        }
    };
    const handleToggle = async (id, status) => {
        const newStatus = status == "completed" ? "pending" : "completed";
        await toggleEventStatus({ docId: id, status: newStatus });
        toast({
            title: `Event marked ${newStatus}`,
            status: newStatus == "completed" ? "success" : "warning",
        });
    };
    return (
        <Box mt={5}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                {events &&
                    events.map((event) => (
                        <Box p={3} boxShadow="2xl" shadow={"dark-lg"} transition="0.2s" _hover={{ boxShadow: "sm" }} key={event.id}>
                            <Heading as="h3" fontSize={"xl"}>
                                {event.title}{" "}
                                <Badge
                                    color="red.500"
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    float="right"
                                    size="xs"
                                    onClick={() => handleEventDelete(event.id)}
                                >
                                    <FaTrash />
                                </Badge>
                                <Badge
                                    color={event.status == "pending" ? "gray.500" : "green.500"}
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    float="right"
                                    size="xs"
                                    onClick={() => handleToggle(event.id, event.status)}
                                >
                                    {event.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
                                </Badge>
                                <Badge float="right" opacity="0.8" bg={event.status == "pending" ? "yellow.500" : "green.500"}>
                                    {event.status}
                                </Badge>
                            </Heading>
                            <Text>{event.description}</Text>
                        </Box>
                    ))}
            </SimpleGrid>
        </Box>
    );
};
export default EventList;
