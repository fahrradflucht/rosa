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

  def wait_for(func) do
    case func.() do
      true -> true
      false ->
        :timer.sleep(100)
        wait_for(func)
    end
  end
end