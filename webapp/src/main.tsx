import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript, ThemeConfig, extendTheme } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./view/App.tsx";
import PasteList from "./view/PasteList.tsx";
import AddPaste from "./view/AddPaste.tsx";
import { RecoilRoot, RecoilEnv } from "recoil";

if (import.meta.env.MODE == "development") {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <PasteList />,
      },
      {
        path: "add-paste",
        element: <AddPaste />,
      },
    ],
  },
]);

const themeConfig: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config: themeConfig,
  styles: {
    global: {
      "*": {
        WebkitTapHighlightColor: "transparent",
      },
      body: {
        bg: "gray.100",
        _dark: {
          bg: "gray.900",
        },
      },
    },
  },
  colors: {
    brand: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      200: "#EDF2F7",
      300: "#E2E8F0",
      400: "#A0AEC0",
      500: "#1A202C",
      600: "#1A202C",
      700: "#171923",
      800: "#171923",
      900: "#171923",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorModeScript initialColorMode={themeConfig.initialColorMode} />
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </ChakraProvider>
  </StrictMode>
);
