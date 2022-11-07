import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has correct initial color, and updates when clicked', () => {
	render(<App />);

	const colorButton = screen.getByRole('button', { name: 'Change to blue' });
	expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

	fireEvent.click(colorButton);

	expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });
	expect(colorButton).toHaveTextContent('Change to red');
});

test('initial conditions', () => {
	render(<App />);

	const colorButton = screen.getByRole('button', { name: 'Change to blue' });
	expect(colorButton).toBeEnabled();

	const checkbox = screen.getByRole('checkbox');
	expect(checkbox).not.toBeChecked();
});

test('Checkbox disables button on first click and enables on second click', () => {
	render(<App />);
	const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
	const button = screen.getByRole('button');

	fireEvent.click(checkbox);
	expect(button).toBeDisabled();

	fireEvent.click(checkbox);
	expect(button).toBeEnabled();
});
