defmodule Rosa.LoginTest do
  use Rosa.IntegrationCase

  @tag :integration
  test "GET /admin/login" do
    navigate_to "/admin/login"
    assert element_displayed?({:id, "login-form"})
  end
end