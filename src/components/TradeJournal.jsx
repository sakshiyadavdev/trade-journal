import TradeRow from "./TradeRow";

function TradeJournal({ journal, setJournal }) {
    return (
        <div>
            {journal.trades.map((trade) => (
                <TradeRow
                    key={trade.trade_id}
                    trade={trade}
                    setJournal={setJournal}
                />
            ))}
        </div>
    );
}

export default TradeJournal;