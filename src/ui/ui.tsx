import { useState } from "react";
import "./ui.css";

export const Ui = () => {
  const [count, setCount] = useState(0);

  const create = () => {
    parent.postMessage(
      { pluginMessage: { type: "create-rectangles", count } },
      "*"
    );
  };

  const cancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  return (
    <main className="wrapper">
      <label className="label" htmlFor="count">
        Rectangles count
      </label>
      <input
        className="input"
        id="count"
        type="number"
        value={count}
        onChange={(e) => setCount(parseInt(e.target.value))}
      />
      <div className="actions">
        <button className="button" onClick={create}>
          create
        </button>
        <button className="button" onClick={cancel}>
          cancel
        </button>
      </div>
    </main>
  );
};
