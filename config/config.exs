# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :rosa,
  ecto_repos: [Rosa.Repo]

# Configures the endpoint
config :rosa, Rosa.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "azzIgIwWxiAgvD62BooGt0yTLmKX6O+HvgRetn+H34DkwaUNyujVZRLZZqqAziRV",
  render_errors: [view: Rosa.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Rosa.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Configures Guardian
config :guardian, Guardian,
  issuer: "Rosa", # Is this unsafe? (Every instance will have the same issuer)
  ttl: { 3, :days },
  verify_issuer: true,
  serializer: Rosa.GuardianSerializer

# Configures Hound
config :hound, driver: "phantomjs"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
