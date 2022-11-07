import { render, screen, fireEvent } from '@testing-library/react';
import App, { replaceCamelWithSpaces } from './App';

test('button has correct initial color, and updates when clicked', () => {
	render(<App />);

	const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
	expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

	fireEvent.click(colorButton);

	expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });
	expect(colorButton).toHaveTextContent('Change to Medium Violet Red');
});

test('initial conditions', () => {
	render(<App />);

	const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
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

test('Disabled button has gray background and reverts to MediumVioletRed', () => {
	render(<App />);
	const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
	const button = screen.getByRole('button', { name: 'Change to Midnight Blue' });

	fireEvent.click(checkbox);
	expect(button).toHaveStyle({ backgroundColor: 'gray' });

	fireEvent.click(checkbox);
	expect(button).toHaveStyle({ backgroundColor: 'MediumVioletRed' });
});

test('Clicked disabled button has gray background and reverts to MidnightBlue', () => {
	render(<App />);
	const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
	const button = screen.getByRole('button', { name: 'Change to Midnight Blue' });

	fireEvent.click(button);

	fireEvent.click(checkbox);
	expect(button).toHaveStyle({ backgroundColor: 'gray' });

	fireEvent.click(checkbox);
	expect(button).toHaveStyle({ backgroundColor: 'MidnightBlue' });
});

describe('spaces before camel-case capital letters', () => {
	test('Works for no inner capital letters', () => {
		expect(replaceCamelWithSpaces('Red')).toBe('Red');
	});

	test('Works for one inner capital letter', () => {
		expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
	});

	test('Works for multiple inner capital letters', () => {
		expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
	});
});
