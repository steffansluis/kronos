class TemporalList extends Sonic.AbstractList

  constructor: ( values = [] ) ->
    super()

    @_source = values
    @_move(0, next: 0)
    @_add value, next:0 for value in @_source
    Object.observe @_source, @_onSourceInvalidate

  set: ( id, value ) ->
    return @_set(id, value)

  push: ( value ) ->
    return @_add(value, next: 0)

  unshift: ( value ) ->
    return @_add(value, prev: 0)

  pop: ( ) ->
    id = @prev()
    value = @get(id)
    return value if @_delete(id)

  shift: ( ) ->
    id = @next()
    value = @get(id)
    return value if @_delete(id)

  add: ( value ) ->
    return @push(value)

  remove: ( value ) ->
    id = @idOf(value)
    return @_delete(id)

  delete: ( id ) ->
    return @_delete(id)

  _onSourceInvalidate: ( events ) =>
    for event in events
      continue if isNaN parseInt(event.name)
      value = event.object[event.name]

      console.log event, event.type
      switch event.type
        when 'add'
          console.log "Adding", value
          @add(value)
        when 'delete'
          console.log "Removing", value
          @remove value
        when 'update'
          oldValue = event.oldValue
          console.log "Updating", oldValue, "to", value
          @set(@idOf(oldValue), value)
          # @get(@idOf(event.oldValue)).yield(value)

    @_invalidate()


module.exports = TemporalList
