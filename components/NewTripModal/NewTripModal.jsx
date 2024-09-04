"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  HStack,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { X, Plus, Trash } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

export default function TripModal({ isOpen, onClose }) {
  const [tripName, setTripName] = useState("");
  const [sourceCountry, setSourceCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [participants, setParticipants] = useState([""]);
  const [expenses, setExpenses] = useState([
    { category: "transport", amount: "" },
  ]);

  const handleAddParticipant = () => {
    setParticipants([...participants, ""]);
  };

  const handleParticipantChange = (index, value) => {
    const newParticipants = [...participants];
    newParticipants[index] = value;
    setParticipants(newParticipants);
  };

  const handleRemoveParticipant = (index) => {
    const newParticipants = participants.filter((_, i) => i !== index);
    setParticipants(newParticipants);
  };

  const handleAddExpense = () => {
    setExpenses([...expenses, { category: "transport", amount: "" }]);
  };

  const handleExpenseChange = (index, field, value) => {
    const newExpenses = [...expenses];
    newExpenses[index][field] = value;
    setExpenses(newExpenses);
  };

  const handleRemoveExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      tripName,
      sourceCountry,
      destinationCountry,
      startDate,
      endDate,
      participants,
      expenses,
    });
    onClose();
  };

  return (
    <ChakraProvider>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Trip</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel htmlFor="tripName">Trip Name</FormLabel>
                  <Input
                    id="tripName"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="sourceCountry">Source Country</FormLabel>
                  <Input
                    id="sourceCountry"
                    value={sourceCountry}
                    onChange={(e) => setSourceCountry(e.target.value)}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="destinationCountry">
                    Destination Country
                  </FormLabel>
                  <Input
                    id="destinationCountry"
                    value={destinationCountry}
                    onChange={(e) => setDestinationCountry(e.target.value)}
                    required
                  />
                </FormControl>
                <HStack width="100%">
                  <FormControl>
                    <FormLabel htmlFor="startDate">Start Date</FormLabel>
                    <DatePicker
                      id="startDate"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      customInput={<Input />}
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="endDate">End Date</FormLabel>
                    <DatePicker
                      id="endDate"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      customInput={<Input />}
                      required
                    />
                  </FormControl>
                </HStack>
                <FormControl>
                  <FormLabel>Participants</FormLabel>
                  <VStack spacing={2}>
                    {participants.map((participant, index) => (
                      <HStack key={index} width="100%">
                        <Input
                          value={participant}
                          onChange={(e) =>
                            handleParticipantChange(index, e.target.value)
                          }
                          required
                        />
                        <IconButton
                          aria-label="Remove participant"
                          icon={<Trash size={20} />}
                          onClick={() => handleRemoveParticipant(index)}
                          colorScheme="red"
                        />
                      </HStack>
                    ))}
                    <Button
                      leftIcon={<Plus size={16} />}
                      onClick={handleAddParticipant}
                      colorScheme="blue"
                    >
                      Add Participant
                    </Button>
                  </VStack>
                </FormControl>
                <FormControl>
                  <FormLabel>Expenses</FormLabel>
                  <VStack spacing={2}>
                    {expenses.map((expense, index) => (
                      <HStack key={index} width="100%">
                        <Select
                          value={expense.category}
                          onChange={(e) =>
                            handleExpenseChange(
                              index,
                              "category",
                              e.target.value
                            )
                          }
                          required
                        >
                          <option value="transport">Transport</option>
                          <option value="hotel">Hotel</option>
                          <option value="others">Others</option>
                        </Select>
                        <Input
                          type="number"
                          value={expense.amount}
                          onChange={(e) =>
                            handleExpenseChange(index, "amount", e.target.value)
                          }
                          placeholder="Amount"
                          required
                        />
                        <IconButton
                          aria-label="Remove expense"
                          icon={<Trash size={20} />}
                          onClick={() => handleRemoveExpense(index)}
                          colorScheme="red"
                        />
                      </HStack>
                    ))}
                    <Button
                      leftIcon={<Plus size={16} />}
                      onClick={handleAddExpense}
                      colorScheme="blue"
                    >
                      Add Expense
                    </Button>
                  </VStack>
                </FormControl>
              </VStack>
              <Box mt={4}>
                <Button type="submit" colorScheme="green">
                  Submit
                </Button>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}
