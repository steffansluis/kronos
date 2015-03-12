Signal       = require('./signal')
TemporalList = require('./temporal_list')

Kronos = ( values = [] ) ->
  if values instanceof TemporalList
    return values
  else return new Kronos.TemporalList(values)

Kronos.Signal        = Signal
Kronos.TemporalList  = TemporalList

module.exports = Kronos

