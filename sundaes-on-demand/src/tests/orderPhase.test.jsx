import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
	const user = userEvent.setup();

	render(<App />);

	const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
	await user.clear(vanillaInput);
	await user.type(vanillaInput, '1');

	const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
	await user.clear(chocolateInput);
	await user.type(chocolateInput, '2');

	const cherriesCheckbox = await screen.findByRole('checkbox', {
		name: 'Cherries'
	});
	await user.click(cherriesCheckbox);

	const orderSummaryButton = screen.getByRole('button', {
		name: /order sundae/i
	});
	await user.click(orderSummaryButton);

	const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
	expect(summaryHeading).toBeInTheDocument();

	const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
	expect(scoopsHeading).toBeInTheDocument();

	const toppingsHeading = screen.getByRole('heading', { name: 'Toppings: $1.50' });
	expect(toppingsHeading).toBeInTheDocument();

	expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
	expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
	expect(screen.getByText('Cherries')).toBeInTheDocument();

	const tcCheckbox = screen.getByRole('checkbox', {
		name: /terms and conditions/i
	});
	await user.click(tcCheckbox);

	const confirmOrderButton = screen.getByRole('button', {
		name: /confirm order/i
	});
	await user.click(confirmOrderButton);

	const loading = screen.getByText(/loading/i);
	expect(loading).toBeInTheDocument();

	const thankYouHeader = await screen.findByRole('heading', {
		name: /thank you/i
	});
	expect(thankYouHeader).toBeInTheDocument();

	const notLoading = screen.queryByText('loading');
	expect(notLoading).not.toBeInTheDocument();

	const orderNumber = await screen.findByText(/order number/i);
	expect(orderNumber).toBeInTheDocument();

	const newOrderButton = screen.getByRole('button', { name: /new order/i });
	await user.click(newOrderButton);

	const scoopsTotal = await screen.findByText('Scoops total: $0.00');
	expect(scoopsTotal).toBeInTheDocument();
	const toppingsTotal = await screen.findByText('Toppings total: $0.00');
	expect(toppingsTotal).toBeInTheDocument();

	await screen.findByRole('spinbutton', { name: 'Vanilla' });
	await screen.findByRole('checkbox', { name: 'Cherries' });
});
