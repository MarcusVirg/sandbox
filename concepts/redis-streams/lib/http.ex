defmodule RedisStreams.Http do
  use Plug.Router
  alias RedisStreams.Socket

  plug Plug.Logger
  plug :match
  plug :dispatch

  get "/" do
    conn |> Plug.Conn.send_resp(200, "Healthy")
  end

  get "/ws/:account_id" do
    conn
    |> WebSockAdapter.upgrade(Socket, [account_id: account_id], timeout: 60_000)
    |> Plug.Conn.halt()
  end

  match _ do
    conn |> Plug.Conn.send_resp(404, "Not Found")
  end
end
