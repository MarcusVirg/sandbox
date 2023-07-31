defmodule RedisStreams.Consume do
  alias RedisStreams.Store

  def subscribe(account_id, event_id) do
    owner_pid = self()
    Process.spawn(fn -> consume(event_id, account_id, owner_pid) end, [:link])
  end

  def consume(event_id, account_id, owner) when is_pid(owner) do
    Store.read_events(account_id, event_id)
    |> send_events?(owner)
    |> last_event_id(event_id)
    |> tap(&throttle/1)
    |> consume(account_id, owner)
  end

  defp send_events?(nil, _pid), do: nil
  defp send_events?([], _pid), do: nil

  defp send_events?(events, pid),
    do: events |> tap(&Process.send(pid, {:on_events, &1}, [:noconnect]))

  defp last_event_id(nil, event_id), do: event_id
  defp last_event_id(events, _), do: events |> List.last() |> Map.get(:id)

  defp throttle(_), do: Process.sleep(1000)
end
