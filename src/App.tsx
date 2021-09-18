import { set_panic_hook } from "cstudio-wasm";
import { loader } from "@monaco-editor/react";
import { loadWASM } from "onigasm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import EditorPage from "./pages/EditorPage";

set_panic_hook();
initAbc();

async function initAbc() {
  await loadWASM(`/static/onigasm.wasm`); // See https://www.npmjs.com/package/onigasm#light-it-up

  const monaco = await loader.init();
  monaco.languages.register({ id: "abc" });
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/:id" component={EditorPage} />
      </Switch>
    </Router>
  );
}

export default App;
