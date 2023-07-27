import Config
import Dotenvy

source!([".env", System.get_env()])

config :redis_streams, Redix, {env!("REDIS_ENDPOINT", :string), [name: :redix]}
