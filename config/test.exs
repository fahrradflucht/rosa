use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :rosa, Rosa.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Reduce the number of bcrypt rounds during tests
config :comeonin, :bcrypt_log_rounds, 4

# Configure your database
config :rosa, Rosa.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "rosa_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
