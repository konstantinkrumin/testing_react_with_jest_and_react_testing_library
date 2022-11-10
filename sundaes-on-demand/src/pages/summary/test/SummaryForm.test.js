import { fireEvent, render, screen } from '@testing-library/react';

import SummaryForm from '../SummaryForm';

test('Initial conditions', () => {
	render(<SummaryForm />);
	const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
	expect(checkbox).not.toBeChecked();

	const confirmButton = screen.getByRole('button', { name: /confirm order/i });
	expect(confirmButton).toBeDisabled();
});

test('Checkbox disables button on first click and enables on second', () => {
	render(<SummaryForm />);

	const checkbox = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions' });
	const confirmButton = screen.getByRole('button', { name: 'Confirm order' });

	fireEvent.click(checkbox);
	expect(confirmButton).toBeEnabled();

	fireEvent.click(checkbox);
	expect(confirmButton).toBeDisabled();
});
