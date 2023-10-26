import React, { useState } from "react";
import { FiCheck, FiInfo } from 'react-icons/fi'; // Import icons
import { FaLanguage } from 'react-icons/fa';

import {
  Box,
  Text,
  Textarea,
  Input,
  Button,
  Flex,
  VStack,
  Select,
  Icon
} from "@chakra-ui/react";
import axios from "axios";
function App() {
  const baseUrl=process.env.REACT_APP_API_URL
  console.log(baseUrl,"is url")
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("english");
  const handleGenerateText = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/generate-text`,
        {
          prompt: input,
          max_tokens: 100, // Example max tokens
        }
      );

      setResult(response.data);
      setInput("")
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleSummarizeText = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/summarize-text`,
        {
          text: input,
          max_tokens: 100, // Example max tokens
        }
      );

      setResult(response.data);
      setInput("")
    } catch (error) {
      console.error(error);
    }
  };

  const handleTranslateText = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/translate-text`,
        {
          text: input,
          target_language: targetLanguage, // Example target language
        }
      );

      setResult(response.data);
      setInput("")
    } catch (error) {
      console.error(error);
    }
  };
  const clearOutput = () => {
    // Clear the output when needed
    setResult("");
  };
  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      bg="lightblue"
      
    >
      <VStack spacing="4" p="20px" borderRadius="8px" bg="white" boxShadow="lg">
        <Text fontSize="2xl" fontWeight="bold">
          Your Text App
        </Text>
        {/* <Text placeholder="Enter your text here"size="lg" onChange={(e) => setInput(e.target.value)}>{input}</Text> */}
          <Textarea placeholder="Enter your text here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          size="lg"
          width={'50%'}/>
        

        <Button
          onClick={() => {
            handleGenerateText();
            clearOutput();
          }}
          leftIcon={<Icon as={FiCheck} />}
          colorScheme="teal"
        >
          Generate Text
        </Button>
        <Button
          onClick={() => {
            handleSummarizeText();
            clearOutput();
          }}
          leftIcon={<Icon as={FiInfo} />}
          colorScheme="teal"
        >
          Summarize Text
        </Button>
        <Flex gap={10}>
          <Select
            placeholder="Select Target Language"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)} // Update the target language
            width={"100%"}
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="telugu">Telugu</option>
            <option value="kannada">Kannada</option>
            <option value="tamil">Tamil</option>
            {/* Add more language options as needed */}
          </Select>
          <Button
            pr={10} pl={10}
            // border={"1px solid red"}
            onClick={() => {
              handleTranslateText();
              clearOutput();
            }}
            colorScheme="teal"
            leftIcon={<Icon as={FaLanguage} />}
          >
            Translate Text
          </Button>
        </Flex>
        <Box width="50%" marginTop="20px">
          <Box 
          w="80%"
          p="10px"
          borderRadius="8px"
          bg="white"
          boxShadow="md"
          minH="150px"
          >
            <Text fontSize="xl" fontWeight="semibold">
              Output
            </Text>
            <Text fontSize="md">{result}</Text>
          </Box>
        </Box>
      </VStack>
    </Flex>
  );
}

export default App;
