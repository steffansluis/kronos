describe "TemporalList", ->

  beforeEach ->
    @array = [1,5,4,3,6]
    @list = new Kronos.TemporalList(@array)

  it "should contain the initial values", ->
    expect(@list.toArray()).toEqual(@array)
