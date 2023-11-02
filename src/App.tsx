import { StoriesFeedProvider, StoriesFeed } from "@/components/StoriesFeed";
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
