# `import Kronos from 'kronos';`

describe "Kronos", ->
  describe "without any arguments", ->
    it "should create a new empty list", ->
      list = Kronos()
      expect(list.toArray()).toEqual([])

  describe "given an array", ->
    it "should create a new list containing the items", ->
      items = [1,2,3,4]
      list = Kronos(items)
      expect(list.toArray()).toEqual(items)


  describe "given an existing list", ->
    it "should return the list", ->
      items = [1,2,3,4]
      list = Kronos(items)
      result = Kronos(list)
      expect(result).toBe(list)

