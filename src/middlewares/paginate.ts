import { Context, Next } from 'hono';

export const paginate = <T>(list: T[]) => {
  return async (c: Context, nextFunc: Next) => {
    try {
      const q = c.req.query();

      const page = +q.page ?? 1;
      const limit = +q.limit ?? 5;
      const total = list.length;

      // Send page 1 and limit 5 by default
      if (isNaN(page) || isNaN(limit)) {
        return c.json({
          ok: true,
          data: {
            next: {
              page: 2,
              limit: 5,
            },
            prev: null,
            items: list.slice(0, 5),
            total,
          },
        });
      }

      const startIdx = (page - 1) * limit;
      const endIdx = page * limit;

      let next = null;
      let prev = null;

      if (endIdx < total) {
        const notEnoughItems = endIdx + limit > total;
        const diff = total - endIdx;

        next = {
          page: page + 1,
          limit: notEnoughItems ? diff : limit,
        };
      }

      if (startIdx < total && startIdx > 0) {
        prev = {
          page: page - 1,
          limit,
        };
      }

      c.set('paginationResult', {
        next,
        prev,
        items: list.slice(startIdx, endIdx),
        total,
      });

      await nextFunc();
    } catch (e) {
      return c.json(
        {
          ok: false,
          error: e,
        },
        500,
      );
    }
  };
};
