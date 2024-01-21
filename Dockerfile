FROM oven/bun:apline

WORKDIR /usr/app

COPY package.json .

COPY bun.lockb .

RUN bun install --frozen-lockfile

COPY . .

CMD ["bun", "start"]