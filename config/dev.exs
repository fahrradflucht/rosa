use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :rosa, Rosa.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [
    node: ["node_modules/webpack/bin/webpack.js", "--watch", "--color", cd: Path.expand("../", __DIR__)]
  ]


# Watch static and templates for browser reloading.
config :rosa, Rosa.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# Configure your database
config :rosa, Rosa.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "rosa_dev",
  hostname: "localhost",
  port: "32771",
  pool_size: 10

# Configures Guardian secret
config :guardian, Guardian,
  secret_key: "fE9fjSVLVKUMybcw9npvXouVU73x1kVVPNanUvz6Ky5vjPiU5cB9HGIUd0ay"
