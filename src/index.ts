import { Context, Hono } from 'hono';
import { products } from '@/data/products';
import { paginate } from '@/middlewares/paginate';
import { Product, Variables } from '@/types';

const app = new Hono();

app.get(
  '/products',
  paginate(products),
  (c: Context<{ Variables: Variables<Product> }>) => {
    const result = c.get('paginationResult');

    return c.json({
      ok: true,
      data: result,
    });
  },
);

export default app;
