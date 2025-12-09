import NetworkText from "./networktext.js";

interface Writer {
    data: Buffer;
    packInt16(int16: number): Writer;
    packUInt16(uint16: number): Writer;
    packInt32(int32: number): Writer;
    packUInt32(uint32: number): Writer;
    packInt64(int64: BigInt): Writer;
    packUInt64(uint64: BigInt): Writer;
    packSingle(single: number): Writer;
    packDouble(double: number): Writer;
    packByte(byte: number): Writer;
    packBytes(bytes: number[]): Writer;
    packHex(hex: string): Writer;
    packBuffer(buffer: Buffer): Writer;
    packString(str: string): Writer;
    packColor(color: { R: number; G: number; B: number }): Writer;
    packNetworkText(networkText: NetworkText): Writer;
}

export default Writer;
