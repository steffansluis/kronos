class Signal

  constructor: ( value ) ->
    @_handlers = []
    @_value = value
    @_observe()

  value: ( ) ->
    return @_value

  _observe: ( ) ->
    Object.observe @_value, @_onInvalidate if Object.observe?

  _unobserve: ( ) ->
    Object.unobserve @_value, @_onInvalidate if Object.unobserve?

  _onInvalidate: ( events ) =>
    for event in events
      # continue if isNaN parseInt(event.name)
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

      @_yield()

  _yield : ->
    # @_value = value
    # return if options? and options.silent

    # toRemove = []

    res = null
    for handler in @_handlers
      res = handler(@_value, @)
      break unless res

    return res

    # @_handlers.forEach ( handler ) =>
    #   # toRemove.push handler unless res
    #   return res

    # for item in toRemove
    #   index = @_handlers.indexOf(item)
    #   @_handlers.splice(index, 1)

    # return true

  do: ( fn ) ->
    # @once fn
    @_unobserve()
    res = fn(@_value)
    @_observe()
    return false unless res

    # @do(fn) if @_yield()

    return @

  when: ( fn ) ->
    @_handlers.push fn
    return @

  until: ( fn ) ->
    @when ( foo ) -> not fn(foo)
    return @

  every: ( fn ) ->
    @when ( value ) =>
      res = fn(value)
      unless res
        index = @_handlers.indexOf(arguments.callee)
        @_handlers.splice(index, 1)
      return true

    return @

  once: ( fn ) ->
    @every (value) -> fn(value);false
    return @

  # forEvery: ( handler ) ->

  root: ( ) ->
    return @

module.exports = Signal

