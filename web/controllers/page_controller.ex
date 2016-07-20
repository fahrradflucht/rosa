defmodule Rosa.PageController do
  use Rosa.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
