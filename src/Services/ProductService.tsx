import {get} from './RequestService';

export const getProducts = async (pageNumber: number, perPage: number, sort: string) => {
    const url = `products?_page=${pageNumber}&_limit=${perPage}&_sort=${sort}`;
    const response = await get(url, {}, true);
    return response
  };