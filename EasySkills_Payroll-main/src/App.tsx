import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PayrollPage from "./pages/Payrolls";
import Layout from "./components/Layout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <PayrollPage />
        </Layout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
