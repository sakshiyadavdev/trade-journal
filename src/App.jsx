import { useEffect, useState } from "react";
import { initialJournal } from "./data/journal";

function App() {
  const [journal, setJournal] = useState(() => {
    const saved = localStorage.getItem("journal");
    return saved ? JSON.parse(saved) : initialJournal;
  });

  useEffect(() => {
    localStorage.setItem("journal", JSON.stringify(journal));
  }, [journal]);

  return (
    <TradeJournal journal={journal} setJournal={setJournal} />
  );
}