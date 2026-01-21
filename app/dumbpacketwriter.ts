import BufferWriter from "./bufferwriter.js";
import Color from "./color.js";
import NetworkText from "./networktext.js";
import Writer from "./writer.js";

class PacketWriter implements Writer {
    protected _writer: BufferWriter;

    constructor(buffer: Buffer) {
        this._writer = new BufferWriter(buffer);
    }

    private updateSize() {
        const offset = this._writer._offset;
        this._writer._buffer.writeUInt16LE(offset, 0);
    }

    public setType(type: number) {
        this.packUInt16(3);
        this.packByte(type);
        return this;
    }

    public packInt16(int16: number) {
        this._writer.packInt16(int16);
        this.updateSize();
        return this;
    }

    public packUInt16(uint16: number) {
        this._writer.packUInt16(uint16);
        this.updateSize();
        return this;
    }

    public packInt32(int32: number) {
        this._writer.packInt32(int32);
        this.updateSize();
        return this;
    }

    public packUInt32(uint32: number) {
        this._writer.packUInt32(uint32);
        this.updateSize();
        return this;
    }

    public packSingle(single: number) {
        this._writer.packSingle(single);
        this.updateSize();
        return this;
    }

    public packDouble(single: number) {
        this._writer.packSingle(single);
        this.updateSize();
        return this;
    }

    public packByte(byte: number) {
        this._writer.packByte(byte);
        this.updateSize();
        return this;
    }

    public packSByte(byte: number) {
        this._writer.packSByte(byte);
        this.updateSize();
        return this;
    }

    public packInt64(int64: bigint): Writer {
        this._writer.packInt64(int64);
        this.updateSize();
        return this;
    }

    public packUInt64(uint64: bigint): Writer {
        this._writer.packUInt64(uint64);
        this.updateSize();
        return this;
    }

    public packHex(hex: string) {
        this._writer.packHex(hex);
        this.updateSize();
        return this;
    }

    public packBuffer(buffer: Buffer) {
        this._writer.packBuffer(buffer);
        this.updateSize();
        return this;
    }

    public packBytes(bytes: number[]) {
        this._writer.packBytes(bytes);
        this.updateSize();
        return this;
    }

    public packString(str: string) {
        this._writer.packString(str);
        this.updateSize();
        return this;
    }

    public packNetworkText(networkText: NetworkText) {
        this.packByte(networkText.mode);
        this.packString(networkText.text);
        return this;
    }

    public packColor(color: Color) {
        this.packByte(color.R);
        this.packByte(color.G);
        this.packByte(color.B);
        return this;
    }

    public get data() {
        return this._writer.data;
    }
}

export default PacketWriter;
