defmodule RedisStreams.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      {Bandit, plug: RedisStreams.Http},
      {RedisStreams.Store, Application.get_env(:redis_streams, RedisStreams.Store)}
    ]

    opts = [strategy: :one_for_one, name: RedisStreams.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
