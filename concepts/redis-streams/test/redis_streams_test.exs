defmodule RedisStreamsTest do
  use ExUnit.Case

  alias RedisStreams.Store

  test "can send a redis command" do
    Store.next_account_id() |> IO.inspect()

    assert true
  end
end
