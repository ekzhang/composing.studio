import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import init, { set_panic_hook } from "cstudio-wasm";
import App from "./App";
import "./index.css";

// An asynchronous entry point is needed to load WebAssembly files.
init().then(() => {
  set_panic_hook();
  ReactDOM.render(
    <StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </StrictMode>,
    document.getElementById("root")
  );
});
