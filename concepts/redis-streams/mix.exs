defmodule RedisStreams.MixProject do
  use Mix.Project

  def project do
    [
      app: :redis_streams,
      version: "0.1.0",
      elixir: "~> 1.15",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger],
      mod: {RedisStreams.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:bandit, "~> 1.0-pre"},
      {:dotenvy, "~> 0.8.0"},
      {:plug, "~> 1.14"},
      {:redix, "~> 1.1"},
      {:typed_struct, "~> 0.3.0"},
      {:websock_adapter, "~> 0.5"}
    ]
  end
end
