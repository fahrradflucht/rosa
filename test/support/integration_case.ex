defmodule Rosa.IntegrationCase do
  @moduledoc """
  This module defines the test case to be used by
  integration tests.

  You may define functions here to be used as helpers in
  integration tests. See `user_sign_in/1`'s definition as reference.
  """

  use ExUnit.CaseTemplate
  use Hound.Helpers
  
  using do
    quote do
      use Hound.Helpers

      alias Rosa.Repo
      import Ecto
      import Ecto.Changeset
      import Ecto.Query

      import Rosa.TestHelpers
    end
  end

  setup do
    Hound.start_session
    if Hound.InternalHelpers.driver_supports?("delete_cookies") do
      delete_cookies()
    end

    parent = self
    on_exit fn->
      # NOTE PhantomJs uses the same cookie jar for all sessions.
      # We'll delete cookies after each session, because we only want to test our APIs
      Hound.end_session(parent)
    end
    :ok
  end

  setup tags do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Rosa.Repo)

    unless tags[:async] do
      Ecto.Adapters.SQL.Sandbox.mode(Rosa.Repo, {:shared, self()})
    end

    {:ok, conn: Phoenix.ConnTest.build_conn()}
  end
end