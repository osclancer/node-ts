import { SessionDocument } from '../models/session.model';
import { UserType } from '../models/user.model';

export type CartType = {
	products: Array<Omit<ProductType, 'description' | 'available'>>;
	unit: number;
};

export type ProductType = {
	id: string;
	name: string;
	description: string;
	banner: string;
	price: number;
	available: boolean;
};

export type WishListType = Array<ProductType>;

export type UserPayload = Omit<
	UserType,
	'password' | 'createdAt' | 'updatedAt'
> & { sessionId: SessionDocument['id'] };

type EventPayloadType = {
	event:
		| 'ADD_TO_WISHLIST'
		| 'REMOVE_FROM_WISHLIST'
		| 'ADD_TO_CART'
		| 'REMOVE_FROM_CART'
		| 'CREATE_ORDER'
		| 'TEST';
	data: {
		userId: string;
		product: ProductType;
		order?: string;
		qty?: string;
	};
};
