import { useEffect, useState } from "react";
import { initialJournal } from "./data/journal";
import TradeJournal from "./components/TradeJournal";

function App() {
  const [journal, setJournal] = useState(() => {
    const saved = localStorage.getItem("journal");
    return saved ? JSON.parse(saved) : initialJournal;
  });

  useEffect(() => {
    localStorage.setItem("journal", JSON.stringify(journal));
  }, [journal]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Trade Journal</h1>
      <TradeJournal journal={journal} setJournal={setJournal} />
    </div>
  );
}

export default App;