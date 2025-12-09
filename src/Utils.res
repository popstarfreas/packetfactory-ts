type packet = {
    packetType: int,
    data: NodeJs.Buffer.t,
}

type getPacketsResult = {
    bufferPacket: NodeJs.Buffer.t,
    packets: array<packet>,
}

@new @module("@popstarfreas/packetfactory/utils.js") external getPacketsFromBuffer: NodeJs.Buffer.t => getPacketsResult = "getPacketsFromBuffer"
