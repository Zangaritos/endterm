import React, { useState } from "react";
import "./App.css"; 

function App() {
  const [name, setName] = useState(""); 
  const [greeting, setGreeting] = useState(""); 
  const [error, setError] = useState(""); 

 
  const fetchGreeting = async (userName) => {
    try {
      const response = await fetch("https://6736be3baafa2ef222315f5b.mockapi.io/:endpoint", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userName }), 
      });

      if (response.ok) {
        const data = await response.json(); 
        setGreeting(`Привет, ${data.name || userName}!`); 
        setError(""); 
      } else {
        setError("Ошибка при обращении к серверу.");
        setGreeting(""); 
      }
    } catch (err) {
      setError("Не удалось подключиться к серверу.");
      setGreeting(""); 
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (name.trim() === "") {
      setError("Имя не может быть пустым.");
      setGreeting(""); 
      return;
    }
    fetchGreeting(name); 
  };

  return (
    <div>
      <h1>Hello Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)} 
        />
        <button type="submit">Отправить</button>
      </form>
      {error && <p>{error}</p>} {}
      {greeting && <h2>{greeting}</h2>} {}
    </div>
  );
}

export default App;
