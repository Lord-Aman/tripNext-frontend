import { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  HStack,
  useDisclosure,
  ChakraProvider,
} from "@chakra-ui/react";

const EventModal = ({ event, onClose, onSave, onDelete, isOpen }) => {
  const [title, setTitle] = useState(event ? event.title : "");
  const [date, setDate] = useState(event ? event.date : "");
  const [startTime, setStartTime] = useState(event ? event.startTime : "");
  const [endTime, setEndTime] = useState(event ? event.endTime : "");
  const [type, setType] = useState(event ? event.type : "flight");

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = { title, date, startTime, endTime, type };
    if (event) {
      onSave({ ...event, ...eventData });
    } else {
      onSave(eventData);
    }
    onClose();
  };

  return (
    <ChakraProvider>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay zIndex={1300} />
        <ModalContent zIndex={1400}>
          <ModalHeader>{event ? "Edit Event" : "Create New Event"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="date">Date</FormLabel>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="startTime">Start Time</FormLabel>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="endTime">End Time</FormLabel>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="type">Event Type</FormLabel>
                  <Select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="flight">Flight</option>
                    <option value="bus">Bus</option>
                    <option value="hotel">Hotel</option>
                  </Select>
                </FormControl>
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={2} justifyContent="space-between" width="100%">
              {event && (
                <Button colorScheme="red" onClick={() => onDelete(event.id)}>
                  Delete
                </Button>
              )}
              <HStack spacing={2}>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue" onClick={handleSubmit}>
                  {event ? "Update" : "Add Event"}
                </Button>
              </HStack>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default EventModal;
