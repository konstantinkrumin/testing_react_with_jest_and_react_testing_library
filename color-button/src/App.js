import { useState } from 'react';
import './App.css';

function App() {
	const [buttonColor, setButtonColor] = useState('red');
	const [disabled, setDisabled] = useState(false);

	const newButtonColor = buttonColor === 'red' ? 'blue' : 'red';

	return (
		<div>
			<button
				disabled={disabled}
				style={{ backgroundColor: buttonColor }}
				onClick={() => setButtonColor(newButtonColor)}
			>
				Change to {newButtonColor}
			</button>

			<input
				type="checkbox"
				defaultChecked={disabled}
				id="disable-button-checkbox"
				onChange={e => setDisabled(e.target.checked)}
			/>

			<label htmlFor="disable-button-checkbox">Disable button</label>
		</div>
	);
}

export default App;
