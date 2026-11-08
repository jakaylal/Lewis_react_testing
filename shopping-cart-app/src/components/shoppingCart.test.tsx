import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShoppingCart } from './shoppingCart';

describe('ShoppingCart', () => {
	it('should start with an empty cart', () => {
		render(<ShoppingCart />);

		expect(screen.getByText('Your cart is empty'))
	});

	it('should add an item, update its quantity, and remove it', async () => {
		const user = userEvent.setup();
		render(<ShoppingCart />);

		await user.type(screen.getByRole('textbox', { name: 'Product name' }), 'Headphones');
		await user.type(screen.getByRole('spinbutton', { name: 'Product price' }), '60');
		await user.click(screen.getByRole('button', { name: 'Add to Cart' }));

		expect(screen.getByText('Headphones'))
		expect(screen.getByText('Subtotal: $60.00'))

		const quantity = screen.getByRole('spinbutton', { name: 'Quantity for Headphones' });
		await user.clear(quantity);
		await user.type(quantity, '2');

		expect(screen.getByText('Subtotal: $120.00'))
		expect(screen.getByText('Total: $116.64'))

		await user.click(screen.getByRole('button', { name: 'Remove' }));

		expect(screen.getByText('Your cart is empty'))
	});
});
