import { ChakraProvider } from "@chakra-ui/react";
import AppRouter from "./router/AppRouter";
import {Toaster} from "react-hot-toast";

function App() {
  return (
    <ChakraProvider>
      <Toaster />
        <AppRouter />
    </ChakraProvider>
  );
}

export default App;
