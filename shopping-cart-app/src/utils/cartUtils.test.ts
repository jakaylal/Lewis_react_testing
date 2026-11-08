import { describe, expect, it } from 'vitest';
import {
	calculateDiscount,
	calculateItemTotal,
	calculateSubtotal,
	calculateTax,
	calculateTotal,
	formatCurrency,
	isValidQuantity,
	type CartItem,
} from './cartUtils';

const sampleItems: CartItem[] = [
	{ id: 1, name: 'Notebook', price: 12.5, quantity: 2 },
	{ id: 2, name: 'Pen', price: 1.25, quantity: 4 },
];

describe('calculateItemTotal', () => {
	it('should multiply an item price by its quantity', () => {
		expect(calculateItemTotal(sampleItems[0])).toBe(25);
	});

	it('should return zero when the quantity is zero', () => {
		expect(calculateItemTotal({ ...sampleItems[0], quantity: 0 })).toBe(0);
	});
});

describe('calculateSubtotal', () => {
	it('should add the totals for all cart items', () => {
		expect(calculateSubtotal(sampleItems)).toBe(30);
	});

	it('should return zero for an empty cart', () => {
		expect(calculateSubtotal([])).toBe(0);
	});
});

describe('calculateDiscount', () => {
	it.each([
		[49.99, 0],
		[50, 2.5],
		[99.99, 4.9995],
		[100, 10],
	])('should apply the correct discount at subtotal $%s', (subtotal, discount) => {
		expect(calculateDiscount(subtotal)).toBeCloseTo(discount);
	});
});

describe('calculateTax', () => {
	it('should calculate 8 percent tax', () => {
		expect(calculateTax(80)).toBeCloseTo(6.4);
	});

	it('should return zero tax for a zero amount', () => {
		expect(calculateTax(0)).toBe(0);
	});
});

describe('calculateTotal', () => {
	it('should subtract the discount and add tax, rounded to cents', () => {
		const items: CartItem[] = [
			{ id: 3, name: 'Headphones', price: 60, quantity: 2 },
		];

		expect(calculateTotal(items)).toBe(116.64);
	});

	it('should return zero for an empty cart', () => {
		expect(calculateTotal([])).toBe(0);
	});
});

describe('formatCurrency', () => {
	it('should format whole and fractional amounts with two decimal places', () => {
		expect(formatCurrency(5)).toBe('$5.00');
		expect(formatCurrency(12.345)).toBe('$12.35');
	});
});

describe('isValidQuantity', () => {
	it.each([1, 2, 100])('should accept the positive integer quantity %i', (quantity) => {
		expect(isValidQuantity(quantity)).toBe(true);
	});

	it.each([0, -1, 1.5, NaN, Infinity])(
		'should reject the invalid quantity %s',
		(quantity) => {
			expect(isValidQuantity(quantity)).toBe(false);
		},
	);
});
