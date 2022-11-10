import React, { useState } from 'react';

const SummaryForm = () => {
	const [agreed, setAgreed] = useState(false);

	return (
		<div>
			<input
				type="checkbox"
				defaultChecked={agreed}
				id="disable-button-checkbox"
				onChange={e => setAgreed(e.target.checked)}
			/>

			<label htmlFor="disable-button-checkbox">I agree to Terms and Conditions</label>

			<button disabled={!agreed} onClick={() => {}}>
				Confirm order
			</button>
		</div>
	);
};

export default SummaryForm;
