defmodule Rosa.SessionView do
    use Rosa.Web, :view

    def render("show.json", %{jwt: jwt, user: user}) do
        %{
            ok: true,
            jwt: jwt,
            user: user
        }
    end

    def render("show.json", %{user: user}) do
        %{
            ok: true,
            user: user
        }
    end

    def render("error.json", %{error: error}) do
        %{
            error: error
        }
    end
end