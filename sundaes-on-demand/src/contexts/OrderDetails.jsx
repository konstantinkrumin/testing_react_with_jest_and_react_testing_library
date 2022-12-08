import { createContext, useContext, useState } from 'react';

import { pricePerItem } from '../constants';

const OrderDetails = createContext();

// create custom hook to check whether we're in a provider
export function useOrderDetails() {
	const contextValue = useContext(OrderDetails);

	if (!contextValue) {
		throw new Error('useOrderDetails must be called from within an OrderDetailsProvider');
	}

	return contextValue;
}

export function OrderDetailsProvider(props) {
	const [optionCounts, setOptionCounts] = useState({
		scoops: {}, // example: { Chocolate: 1, Vanilla: 2 }
		toppings: {} // example: { "Gummi Bears": 1 }
	});

	function updateItemCount(itemName, newItemCount, optionType) {
		const newOptionCounts = { ...optionCounts };

		newOptionCounts[optionType][itemName] = newItemCount;

		setOptionCounts(newOptionCounts);
	}

	function resetOrder() {
		setOptionCounts({ scoops: {}, toppings: {} });
	}

	function calculateTotal(optionType) {
		const countsArray = Object.values(optionCounts[optionType]);

		const totalCount = countsArray.reduce((total, value) => total + value, 0);

		return totalCount * pricePerItem[optionType];
	}

	const totals = {
		scoops: calculateTotal('scoops'),
		toppings: calculateTotal('toppings')
	};

	const value = { optionCounts, totals, updateItemCount, resetOrder };
	return <OrderDetails.Provider value={value} {...props} />;
}
