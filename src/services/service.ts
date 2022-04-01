import {
	DocumentDefinition,
	FilterQuery,
	QueryOptions,
	Document,
    UpdateQuery
} from 'mongoose';

interface Service {
	create?<T extends Document>(input: DocumentDefinition<T> | object): object;
	update?<T extends Document>(query: FilterQuery<T>, update: UpdateQuery<T>, options: QueryOptions): object;

	find?<T extends Document>(
		query: FilterQuery<T> | any,
		options?: QueryOptions | undefined
	): Promise<T | null | boolean>;

	all?<T extends Document>(
		query: FilterQuery<T> | any
	): Promise<T[] | null | boolean>;
}

export default Service;
