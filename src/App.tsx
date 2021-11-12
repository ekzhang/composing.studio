import { loader } from "@monaco-editor/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import EditorPage from "./pages/EditorPage";

initAbc();

async function initAbc() {
  const monaco = await loader.init();
  monaco.languages.register({ id: "abc" });
  monaco.languages.setLanguageConfiguration("abc", {
    comments: {
      lineComment: "%",
    },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: '"', close: '"' },
    ],
  });
  monaco.languages.setMonarchTokensProvider("abc", {
    tokenPostfix: ".abc",

    tokenizer: {
      root: [
        // V: Voice
        [/^V:[^\n]*/, "strong"],
        // m: message comment
        [/^m:[^\n]*/, "comment"],
        // X: Annotations
        [/^[A-Za-z]:[^\n]*/, "emphasis"],
        // % Comments
        [/%.*$/, "comment"],
        // Chords like "A"
        [/"[^"]*"/, "string"],
        // Syntax for bar lines
        [/:?\|[:\]]?/, "keyword.control"],
        // Syntax for bar lines
        [/:?\|[:\]]?/, "keyword.control"],
        // Notes
        [/[a-gA-G][,']*[0-9]*\/*[0-9]*/, "variable.value"],
      ],
    },
  });
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:id" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
