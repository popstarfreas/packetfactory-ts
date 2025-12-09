type t

@get external mode: t => int = "mode"
@get external text: t => string = "text"
@send external toString: t => string = "toString"
@new @bs.module("@popstarfreas/packetfactory/networktext.js") external make: (int, string) => t = "default"
