docker compose up -d --build --remove-orphans
docker exec -it summarize_api npx typeorm-ts-node-commonjs migration:run -d src/database/data-source.ts