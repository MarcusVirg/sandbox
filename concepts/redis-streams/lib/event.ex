defmodule RedisStreams.Event do
  alias __MODULE__
  use TypedStruct

  typedstruct do
    field :event_id, String.t()
    field :session_id, pos_integer()
    field :type, String.t()
    field :payload, binary()
  end

  def to_string(%Event{} = event) do
    """
    Event(
      event_id: #{event.event_id},
      session_id: #{event.session_id},
      type: #{event.type},
      payload: #{event.payload}
    )
    """
  end
end
