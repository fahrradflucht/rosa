defmodule Rosa.Auth do
    alias Rosa.{Repo, User}

    def authenticate(%{"email" => email, "password" => password}) do
        user = Repo.get_by(User, email: String.downcase(email))

        case check_password(user, password) do
            true -> {:ok, user}
            _ -> :error
        end
    end

    import Comeonin.Bcrypt, only: [checkpw: 2, dummy_checkpw: 0]

    defp check_password(user, given_password) do
        case user do
            nil -> dummy_checkpw()
            _ -> checkpw(given_password, user.password_hash)
        end
    end
end