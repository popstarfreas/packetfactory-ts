type t

@get external mode: t => int = "mode"
@get external text: t => string = "text"
@get external substitutionList: t => option<array<t>> = "substitutionList"
@send external toString: t => string = "toString"
@new @module("@popstarfreas/packetfactory/networktext")
external make: (int, string, ~substitutionList: array<t>=?) => t = "default"
