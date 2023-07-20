defmodule RedisStreams.Http do
  use Plug.Router
  alias RedisStreams.Socket

  plug Plug.Logger
  plug CORSPlug
  plug :match
  plug :dispatch

  get "/" do
    conn |> Plug.Conn.send_resp(200, "Healthy")
  end

  get "/ws/:account_id" do
    conn
    |> WebSockAdapter.upgrade(Socket.Server, [account_id: account_id], timeout: 60_000)
    |> Plug.Conn.halt()
  end

  match _ do
    conn |> Plug.Conn.send_resp(404, "Not Found")
  end
end

defmodule RedisStreams.Socket.Server do
  alias RedisStreams.Consume
  alias RedisStreams.Event
  alias RedisStreams.Store

  def init(account_id: account_id) do
    consumer_pid = Consume.subscribe(account_id, 0)

    {:ok, {account_id, 0, consumer_pid}}
  end

  def handle_in({"ping", [opcode: :text]}, state) do
    {:push, {:text, "pong"}, state}
  end

  def handle_in({"event:" <> recipient_aid, [opcode: :text]}, {aid, _, _} = state) do
    %Event{
      account_id: recipient_aid,
      event_id: Store.next_event_id(recipient_aid),
      type: "ACCOUNT_EVENT",
      created_at: DateTime.utc_now() |> DateTime.to_iso8601(),
      payload: "Some payload for account(#{recipient_aid}) from account(#{aid})"
    }
    |> Store.log_event(account_id)
  end

  def handle_info({:on_event, event}, state) do
    # event |> IO.inspect()
    {:push, {:text, event.event_id}, state}
  end

  def terminate(_reason, {_, _, consumer_pid}) do
    Process.exit(consumer_pid, :kill)
  end
end
