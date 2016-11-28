# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Rosa.Repo.insert!(%Rosa.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Rosa.{Repo}

initial_admin = %{
    email: "admin@example.com",
    password: "adminpassword",
    first_name: "Admin",
    last_name: "The Greatest"
}

%Rosa.User{}
|> Rosa.User.changeset(initial_admin)
|> Repo.insert!()
