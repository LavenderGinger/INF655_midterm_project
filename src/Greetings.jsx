import React, { useState } from 'react';

function Greeting({ username }) {
  const [greeting, setGreeting] = useState("Hello");

  const changeGreeting = () => {
    const greetings = ["Hi", "Hey", "ni hao", "konnichiwa"];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    setGreeting(randomGreeting);
  };

  const inlineStyle = {
    border: '3px solid blue',
    fontSize: '16px',
    padding: '10px',
    marginBottom: '10px'
  };

  return (
    <div>
      <h1>{greeting}, {username}!</h1>
      <p style={inlineStyle}>
        Today's date: {new Date().toLocaleDateString()}
      </p>
      <button onClick={changeGreeting}>Change Greeting</button>
    </div>
  );
}

export default Greeting;