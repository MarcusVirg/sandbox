defmodule RedisStreams.Store do
  use GenServer

  alias RedisStreams.Event

  def start_link(redis_endpoint: redis_endpoint) do
    {:ok, conn} = Redix.start_link(redis_endpoint, name: :redix)

    GenServer.start_link(__MODULE__, conn, name: __MODULE__)
  end

  # Client
  def next_account_id(),
    do: GenServer.call(__MODULE__, {:next_account_id})

  def next_event_id(account_id),
    do: GenServer.call(__MODULE__, {:next_event_id, account_id})

  def log_event(%Event{} = event, account_id),
    do: GenServer.call(__MODULE__, {:log_event, account_id, event})

  def read_event(account_id, last_event_id),
    do: GenServer.call(__MODULE__, {:read_event, account_id, last_event_id})

  def close(), do: GenServer.cast(__MODULE__, :close)

  # Server
  def init(conn), do: {:ok, conn}

  def handle_call({:next_account_id}, _from, conn),
    do: ["INCR", "seq:account"] |> issue_command(conn)

  def handle_call({:next_event_id, account_id}, _from, conn),
    do: ["HINCRBY", "account:#{account_id}", "seq:event", "1"] |> issue_command(conn)

  def handle_call({:log_event, account_id, event}, _from, conn) do
    event
    |> Event.record_list()
    |> build_xadd(["XADD", "account:#{account_id}:log", event.event_id])
    |> issue_command(conn)

    {:reply, :ok, conn}
  end

  def handle_call({:read_event, account_id, last_event_id}, _from, conn) do
    ["XREAD", "STREAMS", "account:#{account_id}:log", last_event_id]
    |> issue_command(conn)
  end

  defp build_xadd(record_list, command), do: [command | record_list] |> List.flatten()

  defp issue_command(command, conn), do: Redix.command!(conn, command)

  def handle_cast(:close, conn) do
    :ok = Redix.stop(conn)
    {:stop, :normal, []}
  end
end
