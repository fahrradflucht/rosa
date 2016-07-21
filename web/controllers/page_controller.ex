defmodule Rosa.PageController do
  use Rosa.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def admin(conn, _params) do
    render conn, "admin.html", layout: {Rosa.LayoutView, "admin.html"}
  end
end
