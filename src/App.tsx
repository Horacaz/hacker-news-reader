import StoriesFeed from "@/components/StoriesFeed";
import { StoriesFeedProvider } from "@/context/StoriesFeedContext";
import Header from "@/components/Header";
function App() {
  return (
    <>
      <Header />
      <StoriesFeedProvider>
        <StoriesFeed />
      </StoriesFeedProvider>
    </>
  );
}

export default App;
