import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';



import machineasous from './machineasous.css';

const OBJECTS = [
	"🍎",
  	"🍇",
	"🍊",
  	"🍓",
  	"🍉",
  	"🍒",
  	"🍍",
  	"🍋",
  	"🥝",
  	"🍌",
];

function App() {
	const [spinning, setSpinning] = useState(false);
	const [result, setResult] = useState(["", "", ""]);
	const [balance, setBalance] = useState(100);

	const spin = () => {
		if (spinning) return;
		setSpinning(true);
		setBalance(balance - 1);
		setResult([
			OBJECTS[Math.floor(Math.random() * OBJECTS.length)],
			OBJECTS[Math.floor(Math.random() * OBJECTS.length)],
			OBJECTS[Math.floor(Math.random() * OBJECTS.length)],
		]);
	};

	useEffect(() => {
		if (spinning) {
			const timeoutId = setTimeout(() => {
			setSpinning(false);
			checkResult();
			}, 2000);
		return () => clearTimeout(timeoutId);
		}
	}, [spinning]);

	const checkResult = () => {
		const [object1, object2, object3] = result;
		if (object1 === object2 && object2 === object3) {
			setBalance(balance + 10);
		} else if (object1 === object2 || object2 === object3 || object1 === object3) {
			setBalance(balance + 1);
		}
	};

  return (
    <div className="App">
      <div className="machine">
        <div className={`spinner ${spinning ? "spin" : ""}`}>
          <div>{result[0]}</div>
          <div>{result[1]}</div>
          <div>{result[2]}</div>
        </div>
        <button onClick={spin} disabled={spinning}>
          {spinning ? "Spinning..." : "Spin"}
        </button>
      </div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default App;


