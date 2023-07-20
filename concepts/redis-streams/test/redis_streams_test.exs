defmodule RedisStreamsTest do
  use ExUnit.Case
  doctest RedisStreams

  test "greets the world" do
    assert RedisStreams.hello() == :world
  end
end
