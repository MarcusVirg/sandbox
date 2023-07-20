import Config

config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :cors_plug,
  origin: ["http://localhost:3000"],
  max_age: 86400,
  methods: ["*"]
