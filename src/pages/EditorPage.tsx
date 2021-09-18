import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";
import abcjs from "abcjs";
import { VscChevronRight, VscFolderOpened, VscGist } from "react-icons/vsc";
import useStorage from "use-local-storage-state";
import Editor from "@monaco-editor/react";
import { Registry } from "monaco-textmate";
import { wireTmGrammars } from "monaco-editor-textmate";
import type { editor } from "monaco-editor/esm/vs/editor/editor.api";
import animals from "../lib/animals.json";
import ABC from "../lib/abc.json";
import Rustpad, { UserInfo } from "../lib/rustpad";
import ConnectionStatus from "../components/ConnectionStatus";
import Footer from "../components/Footer";
import User from "../components/User";

function getWsUri(id: string) {
  return (
    (window.location.origin.startsWith("https") ? "wss://" : "ws://") +
    window.location.host +
    `/api/socket/${id}`
  );
}

function generateName() {
  return "Anonymous " + animals[Math.floor(Math.random() * animals.length)];
}

function generateHue() {
  return Math.floor(Math.random() * 360);
}

function EditorPage() {
  const toast = useToast();
  const [connection, setConnection] = useState<
    "connected" | "disconnected" | "desynchronized"
  >("disconnected");
  const [users, setUsers] = useState<Record<number, UserInfo>>({});
  const [name, setName] = useStorage("name", generateName);
  const [hue, setHue] = useStorage("hue", generateHue);
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor>();
  const [darkMode, setDarkMode] = useStorage("darkMode", () => false);
  const rustpad = useRef<Rustpad>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (editor?.getModel()) {
      const model = editor.getModel()!;
      model.setValue("");
      model.setEOL(0); // LF
      rustpad.current = new Rustpad({
        uri: getWsUri(id),
        editor,
        onConnected: () => setConnection("connected"),
        onDisconnected: () => setConnection("disconnected"),
        onDesynchronized: () => {
          setConnection("desynchronized");
          toast({
            title: "Desynchronized with server",
            description: "Please save your work and refresh the page.",
            status: "error",
            duration: null,
          });
        },
        onChangeUsers: setUsers,
      });
      return () => {
        rustpad.current?.dispose();
        rustpad.current = undefined;
      };
    }
  }, [id, editor, toast, setUsers]);

  useEffect(() => {
    if (connection === "connected") {
      rustpad.current?.setInfo({ name, hue });
    }
  }, [connection, name, hue]);

  async function handleCopy() {
    await navigator.clipboard.writeText(`${window.location.origin}/#${id}`);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

  function handleDarkMode() {
    setDarkMode(!darkMode);
  }

  const [abcString, setAbcString] = useState("");

  useEffect(() => {
    abcjs.renderAbc("paper", abcString, {});
  }, [abcString]);

  return (
    <Flex
      direction="column"
      h="100vh"
      overflow="hidden"
      bgColor={darkMode ? "#1e1e1e" : "white"}
      color={darkMode ? "#cbcaca" : "inherit"}
    >
      <Box
        flexShrink={0}
        bgColor={darkMode ? "#333333" : "#e8e8e8"}
        color={darkMode ? "#cccccc" : "#383838"}
        textAlign="center"
        fontSize="sm"
        py={0.5}
      >
        Composing Studio
      </Box>
      <Flex flex="1 0" minH={0}>
        <Container
          w="xs"
          bgColor={darkMode ? "#252526" : "#f3f3f3"}
          overflowY="auto"
          maxW="full"
          lineHeight={1.4}
          py={4}
        >
          <ConnectionStatus darkMode={darkMode} connection={connection} />

          <Flex justifyContent="space-between" mt={4} mb={1.5} w="full">
            <Heading size="sm">Dark Mode</Heading>
            <Switch isChecked={darkMode} onChange={handleDarkMode} />
          </Flex>

          <Heading mt={4} mb={1.5} size="sm">
            Share Link
          </Heading>
          <InputGroup size="sm">
            <Input
              readOnly
              pr="3.5rem"
              variant="outline"
              bgColor={darkMode ? "#3c3c3c" : "white"}
              borderColor={darkMode ? "#3c3c3c" : "white"}
              value={`${window.location.origin}/${id}`}
            />
            <InputRightElement width="3.5rem">
              <Button
                h="1.4rem"
                size="xs"
                onClick={handleCopy}
                _hover={{ bg: darkMode ? "#575759" : "gray.200" }}
                bgColor={darkMode ? "#575759" : "gray.200"}
              >
                Copy
              </Button>
            </InputRightElement>
          </InputGroup>

          <Heading mt={4} mb={1.5} size="sm">
            Active Users
          </Heading>
          <Stack spacing={0} mb={1.5} fontSize="sm">
            <User
              info={{ name, hue }}
              isMe
              onChangeName={(name) => name.length > 0 && setName(name)}
              onChangeColor={() => setHue(generateHue())}
              darkMode={darkMode}
            />
            {Object.entries(users).map(([id, info]) => (
              <User key={id} info={info} darkMode={darkMode} />
            ))}
          </Stack>

          <Heading mt={4} mb={1.5} size="sm">
            About
          </Heading>
          <Text fontSize="sm" mb={1.5}>
            <strong>Composing Studio</strong> is an open-source collaborative
            music composition tool that lets anyone write music together.
          </Text>
          <Text fontSize="sm" mb={1.5}>
            Share a link to this studio with others, and they'll be able to edit
            from their browser while seeing your changes in real time.
          </Text>
          <Text fontSize="sm" mb={1.5}>
            Built using Rust and TypeScript. See the{" "}
            <Link
              color="blue.600"
              fontWeight="semibold"
              href="https://github.com/ekzhang/composing.studio"
              isExternal
            >
              GitHub repository
            </Link>{" "}
            for details.
          </Text>
        </Container>
        <Flex flex={1} minW={0} h="100%" direction="column" overflow="hidden">
          <HStack
            h={6}
            spacing={1}
            color="#888888"
            fontWeight="medium"
            fontSize="13px"
            px={3.5}
            flexShrink={0}
          >
            <Icon as={VscFolderOpened} fontSize="md" color="blue.500" />
            <Text>documents</Text>
            <Icon as={VscChevronRight} fontSize="md" />
            <Icon as={VscGist} fontSize="md" color="purple.500" />
            <Text>{id}</Text>
          </HStack>
          <Box flex={1} minH={0}>
            <Flex flex={1} minW={0} h="100%" direction="row" overflow="hidden">
              <Box flex={1}>
                <Editor
                  theme={darkMode ? "vs-dark" : "vs"}
                  language="abc"
                  options={{
                    automaticLayout: true,
                    fontSize: 13,
                  }}
                  onMount={async (editor, monaco) => {
                    setEditor(editor);

                    const registry = new Registry({
                      getGrammarDefinition: async (scopeName: any) => {
                        return {
                          format: "json",
                          content: ABC,
                        };
                      },
                    });

                    // map of monaco "language id's" to TextMate scopeNames
                    const grammars = new Map();
                    grammars.set("abc", "source.abc");
                    await wireTmGrammars(monaco, registry, grammars, editor);
                  }}
                  onChange={(text) => {
                    typeof text === "string" && setAbcString(text);
                  }}
                />
              </Box>

              <Box flex={1}>
                <div id="paper"></div>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
}

export default EditorPage;
