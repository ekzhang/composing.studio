import { Box, Portal } from "@chakra-ui/react";

function ProductHunt() {
  return (
    <Portal>
      <Box position="absolute" bottom={4} right={4} shadow="xl">
        <a
          href="https://www.producthunt.com/posts/composing-studio?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-composing-studio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=313340&theme=light"
            alt="Composing Studio - Online music editor with simple real-time collaboration | Product Hunt"
            style={{ width: 250, height: 54 }}
            width="250"
            height="54"
          />
        </a>
      </Box>
    </Portal>
  );
}

export default ProductHunt;
