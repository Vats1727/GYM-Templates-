import React from "react";
import { TICKER_ITEMS } from "../constants/data";
import useFetchData from "../hooks/useFetchData";
import VisualEditorTrigger from "./Admin/VisualEditorTrigger";

export default function Ticker() {
  const { data: tickerList } = useFetchData('ticker/active', []);
  
  if (!tickerList || tickerList.length === 0) return null;
  
  const displayItems = tickerList.map(t => t.item_text);

  // Double the items for continuous scrolling smoothness
  const continuousItems = [...displayItems, ...displayItems];

  return (
    <div className="ticker" style={{ position: 'relative' }}>
      <VisualEditorTrigger sectionPath="/admin/ticker" />
      <div className="ticker-track">
        {continuousItems.map((item, i) => (
          <div className="ticker-item" key={i}>
            <span className="ticker-dot">◆</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
