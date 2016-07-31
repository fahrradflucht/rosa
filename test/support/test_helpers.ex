defmodule Rosa.TestHelpers do
  alias Rosa.Repo

  def insert_user(attrs \\ %{}) do
    first_name = "ali#{Base.encode16(:crypto.strong_rand_bytes(6))}"
    
    changes = Dict.merge(%{
      email: "#{String.downcase(first_name)}@bashir.com",
      password: "flyingCarpetsIsNotCrime",
      first_name: first_name,
      last_name: "Bashir"
    }, attrs)
    
    %Rosa.User{}
    |> Rosa.User.changeset(changes)
    |> Repo.insert!()
  end

  @doc """
  Retries a given function until it returns true.

  Takes a `:interval` option in which it should retry that defaults to 100ms.

  Caution: All tests that use this function must have a timeout set.
  """
  def wait_for(func, options \\ [interval: 100]) do
    case func.() do
      true -> true
      false ->
        :timer.sleep(options[:interval])
        wait_for(func)
    end
  end
end