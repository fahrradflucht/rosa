defmodule Rosa.UserTest do
  use Rosa.ModelCase

  alias Rosa.User

  @valid_attrs %{email: "some@content.com", password: "flyingCarpetsIsNotCrime", first_name: "Ali", last_name: "Bashir"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
