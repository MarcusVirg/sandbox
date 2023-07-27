defmodule RedisStreams.Store do
  alias RedisStreams.Event

  def next_account_id(),
    do: ["INCR", "seq:account"] |> issue_command()

  def log_event(%Event{} = event, account_id) do
    event
    |> event_to_entry()
    |> build_xadd(["XADD", "account:#{account_id}:log", "*"])
    |> issue_command()
  end

  def read_events(account_id, last_event_id) do
    ["XREAD", "STREAMS", "account:#{account_id}:log", last_event_id]
    |> IO.inspect()
    |> issue_command()
    |> entries_to_events()
  end

  defp issue_command(command), do: Redix.command!(:redix, command)

  defp build_xadd(entry, command), do: [command | entry] |> List.flatten()

  defp event_to_entry(%Event{} = event) do
    [
      "session_id",
      event.session_id,
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
      [{:event_id, entry_id} | list_to_keyword_list(entry)]
    end)
    |> Enum.map(fn event -> struct(Event, event) end)
  end

  defp list_to_keyword_list([]), do: []

  defp list_to_keyword_list([key, value | tail]) do
    [{String.to_existing_atom(key), value} | list_to_keyword_list(tail)]
  end
end
