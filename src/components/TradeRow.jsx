import "./TradeRow.css";

function TradeRow({ trade, setJournal }) {

    const handleAddLeg = (type) => {
        const newLeg = {
            id: Date.now(),
            price: 0,
            quantity: 0,
            date: new Date().toISOString().split("T")[0]
        };

        setJournal((prev) => {
            return {
                ...prev,
                trades: prev.trades.map((t) => {
                    if (t.trade_id === trade.trade_id) {
                        return {
                            ...t,
                            [type]: [...t[type], newLeg]
                        };
                    }
                    return t;
                })
            };
        });
    };

    const handleChange = (type, legId, field, value) => {
        setJournal((prev) => {
            return {
                ...prev,
                trades: prev.trades.map((t) => {
                    if (t.trade_id === trade.trade_id) {
                        return {
                            ...t,
                            [type]: t[type].map((leg) => {
                                if (leg.id === legId) {
                                    return {
                                        ...leg,
                                        [field]: value
                                    };
                                }
                                return leg;
                            })
                        };
                    }
                    return t;
                })
            };
        });
    };

    const handleDelete = (type, legId) => {
        setJournal((prev) => {
            return {
                ...prev,
                trades: prev.trades.map((t) => {
                    if (t.trade_id === trade.trade_id) {
                        return {
                            ...t,
                            [type]: t[type].filter((leg) => leg.id !== legId)
                        };
                    }
                    return t;
                })
            };
        });
    };

    const toggleTradeStatus = () => {
        setJournal((prev) => {
            return {
                ...prev,
                trades: prev.trades.map((t) => {
                    if (t.trade_id === trade.trade_id) {
                        return {
                            ...t,
                            status: t.status === "OPEN" ? "CLOSED" : "OPEN"
                        };
                    }
                    return t;
                })
            };
        });
    };

    const calculateAvg = (legs) => {
        const totalQty = legs.reduce((sum, l) => sum + Number(l.quantity), 0);
        const totalValue = legs.reduce(
            (sum, l) => sum + l.price * l.quantity,
            0
        );

        if (totalQty === 0) return 0;

        return (totalValue / totalQty).toFixed(2);
    };

    return (
        <div className="trade-container">

            {/* BUY SIDE */}
            <div className="table buy">
                <div className="table-header">
                    <span>Symbol</span>
                    <span>Price</span>
                    <span>Qty</span>
                    <span>Date</span>
                    <span>Action</span>
                </div>

                {trade.buy.map((b) => (
                    <div key={b.id} className="table-row">
                        <span>{trade.symbol}</span>

                        <input
                            type="number"
                            value={b.price}
                            disabled={trade.status === "CLOSED"}
                            onChange={(e) =>
                                handleChange("buy", b.id, "price", e.target.value)
                            }
                        />

                        <input
                            type="number"
                            value={b.quantity}
                            onChange={(e) =>
                                handleChange("buy", b.id, "quantity", e.target.value)
                            }
                        />

                        <input
                            type="date"
                            value={b.date}
                            onChange={(e) =>
                                handleChange("buy", b.id, "date", e.target.value)
                            }
                        />

                        <button onClick={() => handleDelete("buy", b.id)}>
                            ❌
                        </button>
                    </div>
                ))}

                {trade.status === "OPEN" && (
                    <button onClick={() => handleAddLeg("buy")}>+ Buy</button>
                )}
            </div>

            {/* TRADE CENTER */}
            <div className="trade-meta">
                <h3>{trade.symbol}</h3>
                <p>{trade.direction}</p>

                <p className={trade.status === "OPEN" ? "open" : "closed"}>
                    {trade.status}
                </p>
                <p>Avg Buy: ₹{calculateAvg(trade.buy)}</p>
                <p>Avg Sell: ₹{calculateAvg(trade.sell)}</p>

                <button onClick={toggleTradeStatus}>
                    {trade.status === "OPEN" ? "Close Trade" : "Reopen"}
                </button>
            </div>

            {/* SELL SIDE */}
            <div className="table sell">
                <div className="table-header">
                    <span>Symbol</span>
                    <span>Price</span>
                    <span>Qty</span>
                    <span>Date</span>
                    <span>Action</span>
                </div>

                {trade.sell.map((s) => (
                    <div key={s.id} className="table-row">
                        <span>{trade.symbol}</span>

                        <input
                            type="number"
                            value={s.price}
                            onChange={(e) =>
                                handleChange("sell", s.id, "price", e.target.value)
                            }
                        />

                        <input
                            type="number"
                            value={s.quantity}
                            disabled={trade.status === "CLOSED"}
                            onChange={(e) =>
                                handleChange("sell", s.id, "quantity", e.target.value)
                            }
                        />

                        <input
                            type="date"
                            value={s.date}
                            onChange={(e) =>
                                handleChange("sell", s.id, "date", e.target.value)
                            }
                        />

                        <button onClick={() => handleDelete("sell", s.id)}>
                            ❌
                        </button>
                    </div>
                ))}

                {trade.status === "OPEN" && (
                    <button onClick={() => handleAddLeg("sell")}>+ Sell</button>
                )}
            </div>

        </div>
    );
}

export default TradeRow;