Signal       = require('./signal')

class TemporalList extends Sonic.List

  constructor: ( values = [] ) ->
    super(values)
    @_source = values
    @_observe()

  _observe: ( ) ->
    Object.observe @_source, @_onSourceInvalidate if Object.observe?

  _unobserve: ( ) ->
    Object.unobserve @_source, @_onSourceInvalidate if Object.observe?

  _onSourceInvalidate: ( events ) =>
    for event in events
      continue if isNaN parseInt(event.name)
      value = event.object[event.name]
      oldValue = event.oldValue

      # console.log event, event.type
      switch event.type
        when 'add'
          console.log "Adding", value
          @add(value)
        when 'delete'
          console.log "Removing", oldValue
          @remove oldValue
        when 'update'
          oldValue = event.oldValue
          console.log "Updating", oldValue, "to", value
          @set(@idOf(oldValue), value)
          # @get(@idOf(event.oldValue)).yield(value)

    # @_invalidate()
  _invalidate: ( ) ->

  yield: ( values ) ->
    @_unobserve()
    @delete id for id in Object.keys(@_byId)
    # @_yield(@_source, silent: true)
    @_source.length = values.length
    for i in [0...values.length]
      @_source[i] = values[i]
      @push(@_source[i])

    @_observe()
module.exports = TemporalList
