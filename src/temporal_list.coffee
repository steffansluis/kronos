class TemporalList extends Sonic.List

  constructor: ( values = [] ) ->
    super()

    @_source = values
    @_move(0, next: 0)
    @_add(value, null, 0) for value in @_source
    Object.observe @_source, @_onSourceInvalidate if Object.observe?

  _onSourceInvalidate: ( events ) =>
    for event in events
      continue if isNaN parseInt(event.name)
      value = event.object[event.name]
      oldValue = event.oldValue

      # console.log event, event.type
      switch event.type
        when 'add'
          # console.log "Adding", value
          @add(value)
        when 'delete'
          # console.log "Removing", oldValue
          @remove oldValue
        when 'update'
          oldValue = event.oldValue
          # console.log "Updating", oldValue, "to", value
          @set(@idOf(oldValue), value)
          # @get(@idOf(event.oldValue)).yield(value)

    # @_invalidate()
  _invalidate: ( ) ->



module.exports = TemporalList
