open Zora

zoraBlock("should correctly parse and serialise NpcUpdate", t => {
  let identity = NetworkText.make(0, "Hello World!")->NetworkText.toString
  t->equal(identity, "Hello World!")
})
