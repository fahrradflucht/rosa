defmodule Rosa.SessionControllerTest do
  use Rosa.ConnCase
  
  setup do
    conn = build_conn() |> put_req_header("accept", "application/json")
    {:ok, conn: conn}
  end

  test "POST /api/admin/v1/session with valid creds", %{conn: conn} do
    user = insert_user()
    session_params = %{session: %{email: user.email, password: user.password}}
    conn = post conn, "/api/admin/v1/session", session_params

    assert json_response(conn, 201)["user"] == %{
      "id" => user.id,
      "email" => user.email,
      "first_name" => user.first_name,
      "last_name" => user.last_name
    }
    
    assert json_response(conn, 201)["ok"] == true

    jwt = json_response(conn, 201)["jwt"]
    assert Guardian.decode_and_verify!(jwt)["aud"] == "User:#{user.id}"
  end

  test "POST /api/admin/v1/session invalid creds", %{conn: conn} do
    session_params = %{session: %{email: "", password: ""}}
    conn = post conn, "/api/admin/v1/session", session_params

    assert json_response(conn, 422) == %{ "error" => "Invalid email or password"}
  end

  test "GET /api/admin/v1/session with valid auth header", %{conn: conn} do
    user = insert_user()
    {:ok, jwt, _full_claims} = user |> Guardian.encode_and_sign(:token)
    conn = get conn |> put_req_header("authorization", jwt), "/api/admin/v1/session"
    
    assert json_response(conn, 200)["user"] == %{
      "id" => user.id,
      "email" => user.email,
      "first_name" => user.first_name,
      "last_name" => user.last_name
    }
  end

  test "GET /api/admin/v1/session with invalid auth header", %{conn: conn} do
    conn = get conn |> put_req_header("authorization", "1234"), "/api/admin/v1/session"
    
    assert json_response(conn, 403)["error"] == "Not Authenticated"
  end
end