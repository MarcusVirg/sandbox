defmodule RedisStreams.Store do
  alias RedisStreams.Event

  def next_account_id(),
    do: ["INCR", "seq:account"] |> issue_command()

  def log_event(%Event{} = event, account_id) do
    event
    |> Event.record_list()
    |> build_xadd(["XADD", "account:#{account_id}:log", "*"])
    |> issue_command()
  end

  def read_events(account_id, last_event_id) do
    ["XREAD", "STREAMS", "account:#{account_id}:log", last_event_id]
    |> IO.inspect()
    |> issue_command()
    |> stream_entries_to_events()
  end

  defp issue_command(command), do: Redix.command!(:redix, command)

  defp build_xadd(record_list, command), do: [command | record_list] |> List.flatten()

  defp stream_entries_to_events(nil), do: nil

  defp stream_entries_to_events([[_stream, entries]]) do
    entries
    |> Enum.map(fn [entry_id, entry] ->
      [{:event_id, entry_id} | list_to_keyword_list(entry)]
    end)
    |> Enum.map(fn event -> struct(Event, event) end)
  end

  defp list_to_keyword_list([]), do: []

  defp list_to_keyword_list([key, value | tail]) do
    [{String.to_existing_atom(key), value} | list_to_keyword_list(tail)]
    # [{key, value} | list_to_keyword_list(tail)]
  end
end
