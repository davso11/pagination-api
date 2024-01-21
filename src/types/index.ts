export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

export type Variables<T> = {
  paginationResult: PaginationResult<T>;
};

export type PaginationResult<T> = {
  next: PaginationFutur;
  prev: PaginationFutur;
  items: T[];
  total: number;
};

export type PaginationFutur = {
  page: number;
  limit: number;
} | null;
