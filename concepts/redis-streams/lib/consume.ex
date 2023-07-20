defmodule RedisStreams.Consume do
  alias RedisStreams.Store

  def subscribe(account_id, last_event_id) do
    owner_pid = self()
    Process.spawn(fn -> consume(account_id, last_event_id, owner_pid) end, [:link])
  end

  def consume(account_id, last_event_id, owner) when is_pid(owner) do
    event = Store.read_event(account_id, last_event_id)
    event |> IO.inspect() |> Process.send(owner, {:on_event, event})
    # Throttle
    Process.sleep(5000)
    consume(account_id, event.event_id, owner)
  end
end
