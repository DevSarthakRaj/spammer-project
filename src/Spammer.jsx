import { useEffect, useState } from "react";
import { API } from "./lib";

const Spammer = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [notEditing, setNotEditing] = useState(true);

  async function fetchMessages() {
    const res = await fetch(`${API}/messages`);

    const info = await res.json();
    console.log(info);
    setMessages(info.messages);
  }

  async function handleDelete(id) {
    const res = await fetch(`${API}/message/${id}`, {
      method: "DELETE",
    });
    const info = res.json();
    fetchMessages();
  }

  async function updateLikes(message) {
    const res = fetch(`${API}/message/${message.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message.text, likes: message.likes + 1 }),
    });
  }

  function handleChange(e) {
    console.log(e.target.value);
  }
  async function handleClick(newMsg) {
    const res = fetch(`${API}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newMsg,
        parentId: "caa490bf-d915-4419-86d0-e6fe95c74239",
      }),
    });
    const info = res.json();
    console.log(info);
  }

  function handleEditView(id) {
    setNotEditing(false);
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <h1>Spammer Project</h1>
      <div className="container">
        <form>
          <input type="text" onChange={handleChange} />
          <button
            className="btn"
            onClick={() => {
              handleClick(newMessage);
            }}
          >
            post message
          </button>
        </form>
        {messages.map((message) => {
          return (
            <div className="msgBox" key={message.id}>
              <p className="msgtext">{message.text}</p>
              {notEditing && (
                <button
                  className="btn"
                  onClick={() => {
                    handleEditView(message.id);
                  }}
                >
                  edit message
                </button>
              )}
              <div className="btnsDiv">
                <button>reply</button>
                <button
                  onClick={() => {
                    updateLikes(message);
                  }}
                >
                  Like {message.likes}
                </button>
                <button
                  onClick={() => {
                    handleDelete(message.id);
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Spammer;
