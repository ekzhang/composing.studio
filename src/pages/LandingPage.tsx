import { useEffect, useState } from "react";
import { Button, Flex, Image, Stack } from "@chakra-ui/react";
import { VscArrowRight } from "react-icons/vsc";
import { useHistory } from "react-router-dom";

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const idLen = 6;

function getRandomId() {
  let id = "";
  for (let i = 0; i < idLen; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function LandingPage() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [showLogo, setShowLogo] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Animated landing page entrance sequence.
    setTimeout(() => setShowLogo(true), 500);
    setTimeout(() => setShowButton(true), 1500);
  }, []);

  function handleClick() {
    setLoading(true);
    // Arbitrary delay for suspense reasons.
    setTimeout(() => {
      const id = getRandomId();
      history.push(`/${id}`);
    }, 500);
  }

  return (
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
      </Stack>
    </Flex>
  );
}

export default LandingPage;
