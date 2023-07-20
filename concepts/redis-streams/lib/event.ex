defmodule RedisStreams.Event do
  alias __MODULE__
  use TypedStruct

  typedstruct do
    field :account_id, pos_integer()
    field :event_id, pos_integer()
    field :type, String.t()
    # ISO8601
    field :created_at, String.t()
    field :payload, binary()
  end

  def record_list(%Event{} = event) do
    [
      "account_id",
      event.account_id,
      "event_id",
      event.event_id,
      "type",
      event.event_type,
      "created_at",
      event.event_created_at,
      "payload",
      event.payload
    ]
  end
end
