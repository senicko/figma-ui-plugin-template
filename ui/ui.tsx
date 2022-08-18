import { useState } from "react";
import "./ui.css";

export const Ui = () => {
  const [count, setCount] = useState(0);

  const create = () => {
    parent.postMessage({
      pluginMessage: {
        type: "create-rectangles",
        count,
      },
    });
  };

  const cancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  return (
    <main>
      <label htmlFor="count">Rectangles count</label>
      <input
        id="count"
        type="number"
        value={count}
        onChange={(e) => setCount(parseInt(e.target.value))}
      />
      <button onClick={create}>create</button>
      <button onClick={cancel}>cancel</button>
    </main>
  );
};
