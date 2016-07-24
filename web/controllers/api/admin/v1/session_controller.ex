defmodule Rosa.SessionController do
    use Rosa.Web, :controller

    plug Guardian.Plug.EnsureAuthenticated, %{handler: Rosa.SessionController} when action in [:show]

    def create(conn, %{"session" => session_params}) do
        case Rosa.Auth.authenticate(session_params) do
            {:ok, user} ->
                {:ok, jwt, _full_claims} = user |> Guardian.encode_and_sign(:token)

                conn
                |> put_status(:created)
                |> render("show.json", jwt: jwt, user: user)
            
            :error ->
                conn
                |> put_status(:unprocessable_entity)
                |> render("error.json", error: "Invalid email or password")
        end
    end

    def show(conn, _params) do
        user = Guardian.Plug.current_resource(conn)

        conn
        |> put_status(:ok)
        |> render("show.json", user: user)
    end

    def unauthenticated(conn, _params) do
        conn
        |> put_status(:forbidden)
        |> render(Rosa.SessionView, "error.json", error: "Not Authenticated")
    end
end
