import { Container } from "@chakra-ui/react";
import { Heading,
  Box,
  Button, } from '@chakra-ui/react';
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import EventList from "../components/EventList";

export default function Home() {
return (
<Container maxW="7xl">

<Auth />
<Box maxW='32rem'>
  <Heading as='h4' size='md'>Todo List</Heading>
</Box>
<TodoList />
<br></br>
<Box maxW='32rem'>
  <Heading as='h4' size='md'>EventList</Heading>
</Box>
<EventList/>
</Container>
);
}