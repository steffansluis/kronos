describe "TemporalList", ->

  beforeEach ->
    @array = [1,5,4,3,6]
    @list = new Kronos.TemporalList(@array)
    @map = @list.map (x) -> x*x
    console.log @map.toArray()

  it "should contain the initial values", ->
    expect(@list.toArray()).toEqual(@array)
