import { useState } from "react";

export default function StreamList() {
  const [input, setInput] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;
    console.log("[StreamList] User input:", value); // Week 1 requirement: log to console
    setInput("");
  };

  return (
    <section className="page">
      <h1 className="title">
        <span className="material-icons title-icon">playlist_add</span>
        My StreamList
      </h1>

      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="stream-input" className="sr-only">
          Add a movie or show
        </label>
        <input
          id="stream-input"
          className="input"
          type="text"
          placeholder="Add a movie or show…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Add to StreamList"
          autoComplete="off"
        />
        <button className="btn" type="submit">
          <span className="material-icons">add</span> Add
        </button>
      </form>

      <p className="hint">
        Tip: Open your browser’s developer console to see your input.
        (Examples: <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> on Windows/Chromebook,
        <kbd>Cmd</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> on Mac)
      </p>
    </section>
  );
}
