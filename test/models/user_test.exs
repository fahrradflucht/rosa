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

  test "changeset does not except invalid email addresses" do
    attrs = Map.put(@valid_attrs, :email, String.duplicate("ab", 10))
    assert {:email, "has invalid format"} in errors_on(%User{}, attrs)
  end

  test "changeset does not accept to short passwords" do
    attrs = Map.put(@valid_attrs, :password, "1234567")
    assert {:password, "should be at least 8 character(s)"} in 
      errors_on(%User{}, attrs)
  end

  test "converts unique_constraint on email to error" do
    insert_user(email: "ali@bashir.com")
    attrs = Map.put(@valid_attrs, :email, "ali@bashir.com")
    changeset = User.changeset(%User{}, attrs)

    assert {:error, changeset} = Repo.insert(changeset)
    assert {:email, {"Email already taken", []}} in changeset.errors
  end
end
