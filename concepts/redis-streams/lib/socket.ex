defmodule RedisStreams.Socket do
  alias RedisStreams.Consume
  alias RedisStreams.Event
  alias RedisStreams.Store

  def init(account_id: account_id) do
    account_id |> IO.inspect(label: "Socket initialized for account")
    consumer_pid = Consume.subscribe(account_id, 0)

    {:ok, {account_id, consumer_pid}}
  end

  def handle_in({"ping", [opcode: :text]}, state) do
    {:push, {:text, "pong"}, state}
  end

  def handle_in({"event:" <> recipient_aid, [opcode: :text]}, {aid, _} = state) do
    %Event{
      type: "SOME_EVENT",
      payload: "Some payload for account(#{recipient_aid}) from account(#{aid})"
    }
    |> Store.log_event(recipient_aid)

    {:ok, state}
  end

  def handle_info({:on_events, events}, state) do
    events
    |> Enum.map(fn event -> {:text, Event.to_string(event)} end)
    |> then(&{:push, &1, state})
  end

  def handle_info(_, state), do: {:ok, state}
end
