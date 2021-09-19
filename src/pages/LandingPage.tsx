import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { VscArrowRight } from "react-icons/vsc";
import { useHistory } from "react-router-dom";
import generate from "project-name-generator";
import { FullPage, Slide } from "react-full-page";
import { Link } from "react-scroll";

function getRandomId() {
  return generate({ number: true }).dashed;
}

function LandingPage() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [showLogo, setShowLogo] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // Animated landing page entrance sequence.
    setTimeout(() => setShowLogo(true), 500);
    setTimeout(() => setShowButton(true), 1500);
    setTimeout(() => setShowInfo(true), 2500);
  }, []);

  function handleClick() {
    setLoading(true);
    // Arbitrary delay for suspense reasons.
    setTimeout(() => {
      const id = getRandomId();
      history.push(`/${id}`);
    }, 500);
  }

  const images = {
    left: "path.png",
    center: "path.png",
    right: "path.png",
  };

  return (
    <FullPage className="overflow">
      <Slide>
        <Flex w="100%" h="100vh" align="center" justify="center">
          <Stack>
            <Image
              src="/static/logo.png"
              w="md"
              opacity={showLogo ? 1 : 0}
              transition="opacity 0.5s"
            />
            <Button
              size="lg"
              variant="ghost"
              textTransform="uppercase"
              fontSize="2xl"
              h={12}
              rightIcon={<VscArrowRight />}
              _hover={{ transform: "scale(1.1)", bgColor: "gray.50" }}
              onClick={handleClick}
              isLoading={loading}
              opacity={showButton ? 1 : 0}
            >
              Enter
            </Button>
            <Link to="info" smooth={true}>
              <Stack
                _hover={{ bgColor: "gray.100" }}
                opacity={showInfo ? 1 : 0}
                position="absolute"
                bottom="10%"
                left="43%"
                h={30}
                align="center"
                fontWeight="semibold"
              >
                <Box fontSize="1em" textTransform="uppercase">
                  Or scroll down for a demo
                </Box>
                <Box fontSize="5em">ˇ</Box>
              </Stack>
            </Link>
          </Stack>
        </Flex>
      </Slide>
      <Slide id="info">
        <Flex w="100%" h="100vh" align="center" justify="center" bg="gray.100">
          <Grid
            h="75%"
            w="75%"
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(6, 1fr)"
            gap={10}
          >
            <GridItem rowSpan={2} colSpan={2}>
              <Stack align="center">
                <Box
                  borderRadius="full"
                  boxSize="150px"
                  bg="gray.200"
                  my={5}
                  textAlign="center"
                  fontSize="2em"
                  fontWeight="semibold"
                >
                  Compose.
                </Box>
                <Image
                  borderRadius="5%"
                  src="/static/left.png"
                  w="md"
                  my={0}
                  _hover={{ transform: "scale(2)" }}
                />
              </Stack>
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
              <Stack align="center">
                <Box
                  borderRadius="full"
                  boxSize="150px"
                  bg="gray.200"
                  my={5}
                  textAlign="center"
                  fontSize="2em"
                  fontWeight="semibold"
                >
                  Play.
                </Box>
                <Image
                  borderRadius="5%"
                  src="/static/center.png"
                  w="md"
                  my={0}
                />
              </Stack>
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
              <Stack align="center">
                <Box
                  borderRadius="full"
                  boxSize="150px"
                  bg="gray.200"
                  my={5}
                  textAlign="center"
                  fontSize="2em"
                  fontWeight="semibold"
                >
                  Share
                </Box>
                <Image
                  borderRadius="5%"
                  src="/static/right.png"
                  w="md"
                  my={0}
                />
              </Stack>
            </GridItem>
            <GridItem rowStart={3} colSpan={6}>
              <Stack>
                <Box
                  left="50%"
                  align="center"
                  fontSize="1em"
                  mt={0}
                  fontWeight="semibold"
                  textTransform="uppercase"
                >
                  Make Music Together.
                </Box>
                <Button
                  size="lg"
                  variant="ghost"
                  fontSize="2xl"
                  h={12}
                  w="25%"
                  left="37.5%"
                  right="37.5%"
                  top="50%"
                  rightIcon={<VscArrowRight />}
                  _hover={{ transform: "scale(1.1)", bgColor: "gray.50" }}
                  onClick={handleClick}
                  isLoading={loading}
                  opacity={showButton ? 1 : 0}
                  color="white"
                  bg="gray.700"
                  textTransform="uppercase"
                >
                  Start Creating
                </Button>
              </Stack>
            </GridItem>
          </Grid>
        </Flex>
      </Slide>
    </FullPage>
  );
}

export default LandingPage;
