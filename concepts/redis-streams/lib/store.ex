defmodule RedisStreams.Store do
  alias RedisStreams.Event

  def log_event(%Event{} = event, account_id) do
    event
    |> event_to_entry()
    |> build_xadd(account_id)
    |> send_command()
  end

  def read_events(account_id, last_event_id) do
    ["XREAD", "STREAMS", "account:#{account_id}:log", last_event_id]
    |> send_command()
    |> entries_to_events()
  end

  defp send_command(command), do: Redix.command!(:redix, command)

  defp build_xadd(entry, account_id),
    do: ["XADD", "account:#{account_id}:log", "*" | entry]

  defp event_to_entry(%Event{} = event) do
    [
      "type",
      event.type,
      "payload",
      event.payload
    ]
  end

  defp entries_to_events(nil), do: nil

  defp entries_to_events([[_stream, entries]]) do
    entries
    |> Enum.map(fn [entry_id, entry] ->
      [{:id, entry_id} | list_to_keyword_list(entry)]
    end)
    |> Enum.map(fn event -> struct(Event, event) end)
    |> IO.inspect(label: "New Events")
  end

  defp list_to_keyword_list([]), do: []

  defp list_to_keyword_list([key, value | tail]) do
    [{String.to_existing_atom(key), value} | list_to_keyword_list(tail)]
  end
end
