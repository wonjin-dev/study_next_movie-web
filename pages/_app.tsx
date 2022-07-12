import { AppProps } from "next/app";
import NavBar from "../components/NavBar";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />;
    </>
  );
};

export default App;
