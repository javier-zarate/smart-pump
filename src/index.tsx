import { GlobalStyles } from "@mui/material";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { styles } from "styles";
import { App } from "./App";

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
