import { GlobalStyles } from "@mui/material";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

const styles = {
  root: {
    background: "linear-gradient(to top left, #1b76bc, #fff)",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minWidth: 440,
  },
};

ReactDOM.render(
  <StrictMode>
    <GlobalStyles
      styles={{
        body: { ...styles.root },
      }}
    />
    <App />
  </StrictMode>,
  document.getElementById("root")
);
