import { useEffect, useMemo, useState } from "react";

/**
 * StreamList
 * - Captures user input (title)
 * - Displays items as a list
 * - Lets user complete, edit, and delete items
 * - Clears the input on submit
 * - Persists to localStorage for a nicer UX between reloads
 */
export default function StreamList() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("streamlist.items");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("streamlist.items", JSON.stringify(items));
  }, [items]);

  const onSubmit = (e) => {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;
    const newItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title: value,
      completed: false,
      createdAt: Date.now(),
    };
    setItems((prev) => [newItem, ...prev]);
    setInput(""); // clear input after submit
  };

  const filtered = useMemo(() => {
    switch (filter) {
      case "active":
        return items.filter((i) => !i.completed);
      case "completed":
        return items.filter((i) => i.completed);
      default:
        return items;
    }
  }, [items, filter]);

  const remaining = items.filter((i) => !i.completed).length;

  const toggle = (id) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i))
    );

  const remove = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditText(item.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const text = editText.trim();
    if (!text) return;
    setItems((prev) =>
      prev.map((i) => (i.id === editingId ? { ...i, title: text } : i))
    );
    cancelEdit();
  };

  return (
    <section className="page">
      <h1 className="title">
        <span className="material-icons title-icon">playlist_add_check</span>
        StreamList
      </h1>

      <form className="form" onSubmit={onSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Add a movie or show…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Add to StreamList"
          autoComplete="off"
        />
        <button className="btn" type="submit" aria-label="Add">
          <span className="material-icons">add</span>
          Add
        </button>
      </form>

      <div className="toolbar">
        <div className="filters" role="tablist" aria-label="Filter items">
          <button
            className={`chip ${filter === "all" ? "chip-active" : ""}`}
            onClick={() => setFilter("all")}
            role="tab"
            aria-selected={filter === "all"}
          >
            <span className="material-icons chip-icon">list</span>
            All
          </button>
          <button
            className={`chip ${filter === "active" ? "chip-active" : ""}`}
            onClick={() => setFilter("active")}
            role="tab"
            aria-selected={filter === "active"}
          >
            <span className="material-icons chip-icon">radio_button_unchecked</span>
            Active
          </button>
          <button
            className={`chip ${filter === "completed" ? "chip-active" : ""}`}
            onClick={() => setFilter("completed")}
            role="tab"
            aria-selected={filter === "completed"}
          >
            <span className="material-icons chip-icon">check_circle</span>
            Done
          </button>
        </div>
        <div className="meta">
          <span className="muted">{remaining} remaining</span>
          {items.length > 0 && (
            <button
              className="link danger"
              onClick={() =>
                setItems((prev) => prev.filter((i) => !i.completed))
              }
              title="Clear completed"
            >
              <span className="material-icons">delete_sweep</span> Clear done
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="empty muted">
          No items yet. Add your first title above.
        </p>
      ) : (
        <ul className="list" role="list">
          {filtered.map((item) => (
            <li key={item.id} className="card">
              <div className="row">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggle(item.id)}
                    aria-label={item.completed ? "Mark as active" : "Mark as completed"}
                  />
                  <span className="checkmark" />
                </label>

                {editingId === item.id ? (
                  <form onSubmit={saveEdit} className="edit-form">
                    <input
                      autoFocus
                      className="input"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      aria-label="Edit title"
                    />
                    <button className="btn" type="submit" aria-label="Save">
                      <span className="material-icons">save</span>
                      Save
                    </button>
                    <button
                      type="button"
                      className="link"
                      onClick={cancelEdit}
                      aria-label="Cancel"
                    >
                      <span className="material-icons">close</span>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <div className="title-wrap">
                    <span className={`item-title ${item.completed ? "done" : ""}`}>
                      {item.title}
                    </span>
                    <div className="actions">
                      <button
                        className="icon-btn"
                        onClick={() => startEdit(item)}
                        title="Edit"
                        aria-label="Edit"
                      >
                        <span className="material-icons">edit</span>
                      </button>
                      <button
                        className="icon-btn"
                        onClick={() => remove(item.id)}
                        title="Delete"
                        aria-label="Delete"
                      >
                        <span className="material-icons">delete</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="hint">
        Tip: Your list is saved in your browser. You can export it by copying the
        contents of localStorage key <code>streamlist.items</code>.
      </p>
    </section>
  );
}
