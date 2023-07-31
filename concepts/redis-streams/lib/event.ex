defmodule RedisStreams.Event do
  alias __MODULE__
  use TypedStruct

  typedstruct do
    field :id, String.t()
    field :type, String.t()
    field :payload, binary()
  end

  def to_string(%Event{} = event) do
    """
    Event(
      id: #{event.id},
      type: #{event.type},
      payload: #{event.payload}
    )
    """
  end
end
