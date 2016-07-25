defmodule Rosa.Router do
  use Rosa.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  scope "/api", Rosa do
    pipe_through :api

    scope "/admin" do
      scope "/v1" do
        get "/session", SessionController, :show
        post "/session", SessionController, :create
      end
    end
  end

  scope "/", Rosa do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index

    get "/admin*path", PageController, :admin # Serves the admin react app.
  end
end
