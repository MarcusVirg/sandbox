import Config
import Dotenvy

source!([".env", System.get_env()])

config :redis_streams, RedisStreams.Store, redis_endpoint: env!("REDIS_ENDPOINT", :string)
