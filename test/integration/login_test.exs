defmodule Rosa.LoginTest do
  use Rosa.IntegrationCase

  @tag :integration
  test "GET /admin/login" do
    navigate_to "/admin/login"
    assert element_displayed?({:id, "login-form"})
  end

  @tag :integration
  test "Redirect to /admin/login if unauthorized" do
    navigate_to "/admin"
    assert current_path() == "/admin/login"
  end

  @tag :integration
  test "Sign in with wrong creds gives error" do
    navigate_to "/admin/login"
    assert element_displayed?({:id, "login-form"})
    login_form = find_element(:id, "login-form")

    login_form
    |> find_within_element(:name, "email")
    |> fill_field("wrong@mail.com")

    login_form
    |> find_within_element(:name, "password")
    |> fill_field("12345678")

    login_form
    |> find_within_element(:tag, "Button")
    |> click

    assert element_displayed?({:class, "alert"})

    assert page_source =~ "Invalid email or password"
  end

  @tag :integration
  @tag timeout: 6000
  test "Successfull login" do
    user = insert_user()
    login_through_ui(user)
  end

  @tag :integration
  @tag timeout: 6000
  test "Successfull login sets right JWT cookie" do
    user = insert_user()
    login_through_ui(user)

    assert cookies()
    |> Enum.any?(fn(cookie) ->
      cookie["name"] == "RosaJWT" &&
      Guardian.decode_and_verify!(cookie["value"]) &&
      !Map.has_key?(cookie, "expires")
    end)
  end

  @tag :integration
  @tag timeout: 6000
  test "Successfull login with remember_me checked sets right JWT cookie" do
    user = insert_user()
    login_through_ui(user, remember_me: true)

    assert cookies()
    |> Enum.any?(fn(cookie) ->
      cookie["name"] == "RosaJWT" &&
      Guardian.decode_and_verify!(cookie["value"]) &&
      Map.has_key?(cookie, "expires")
    end)
  end

  @doc """
  Log a given user in by filling out the login form.

  Takes a `remember_me` option that, if set to true, checks the rememberMe checkbox.

  Note that every test that includes this has to have a timeout set since it uses
  `wait_for/1` to check when the login is completed.
  """
  def login_through_ui(user, options \\ [remember_me: false]) do
    navigate_to "/admin/login"
    assert element_displayed?({:id, "login-form"})
    login_form = find_element(:id, "login-form")

    login_form
    |> find_within_element(:name, "email")
    |> fill_field(user.email)

    login_form
    |> find_within_element(:name, "password")
    |> fill_field(user.password)

    if options[:remember_me] do
      login_form
      |> find_within_element(:name, "rememberMe")
      |> click
    end

    login_form
    |> find_within_element(:tag, "Button")
    |> click

    assert wait_for(fn -> current_path == "/admin" end)
  end
end