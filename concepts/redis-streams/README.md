# RedisStreams

Use the devcontainer configuration or run `mix deps.get` setup the environment.

Start a local redis with docker:

```sh
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

Run `mix run --no-halt` to start the server at [http://localhost:4000](http://localhost:4000)
