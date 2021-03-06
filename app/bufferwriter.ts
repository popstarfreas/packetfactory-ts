import { textToBuffer } from './utils';
import * as utf8 from 'utf8';
import NetworkText from './networktext';
import Writer from './writer';

class BufferWriter implements Writer {
    protected _buffer: Buffer;
    protected _offset: number = 0;

    constructor(buffer: Buffer) {
        this._buffer = buffer;
    }

    public changeOffset(offset: number) {
        this._offset = offset;
    }

    public packInt16(int16: number) {
        this._buffer.writeInt16LE(int16, this._offset);
        this._offset += 2;
        return this;
    }

    public packUInt16(uint16: number) {
        this._buffer.writeUInt16LE(uint16, this._offset);
        this._offset += 2;
        return this;
    }

    public packInt32(int32: number) {
        this._buffer.writeInt32LE(int32, this._offset);
        this._offset += 4;
        return this;
    }

    public packUInt32(uint32: number) {
        this._buffer.writeUInt32LE(uint32, this._offset);
        this._offset += 4;
        return this;
    }

    public packInt64(int64: bigint) {
        this._buffer.writeBigInt64LE(int64, this._offset);
        this._offset += 8;
        return this;
    }

    public packUInt64(uint64: bigint) {
        this._buffer.writeBigUInt64LE(uint64, this._offset);
        this._offset += 8;
        return this;
    }

    public packSingle(single: number) {
        this._buffer.writeFloatLE(single, this._offset);
        this._offset += 4;
        return this;
    }

    public packDouble(double: number) {
        this._buffer.writeDoubleLE(double, this._offset);
        this._offset += 8;
        return this;
    }

    public packByte(byte: number) {
        if (byte < 0) byte = -byte;
        this._buffer.writeUInt8(byte, this._offset);
        this._offset += 1;
        return this;
    }

    public packSByte(byte: number) {
        this._buffer.writeInt8(byte, this._offset);
        this._offset += 1;
        return this;
    }

    public packBytes(bytes: number[]) {
        for (const byte of bytes) {
            this.packByte(byte);
        }

        return this;
    }

    public packHex(hex: string) {
        const buf = Buffer.from(hex, "hex");
        buf.copy(this._buffer, this._offset, 0);
        this._offset += buf.length;
        return this;
    }

    public packBuffer(buffer: Buffer) {
        buffer.copy(this._buffer, this._offset, 0);
        this._offset += buffer.length;
        return this;
    }

    public packString(str: string) {
        const packedStr = textToBuffer(utf8.encode(str));
        const strLen = packedStr.length;

        if (strLen >= 128) {
            this.packByte((strLen % 128) + 128);
            this.packByte(Math.floor(strLen / 128));
        } else {
            this.packByte(strLen);
        }

        this.packBuffer(packedStr);
        return this;
    }

    public packColor(color: {R:number;G:number;B:number}) {
        this.packByte(color.R);
        this.packByte(color.G);
        this.packByte(color.B);
        return this;
    }

    public packNetworkText(networkText: NetworkText) {
        this.packByte(networkText.mode);
        this.packString(networkText.text);
        return this;
    }

    public get data() {
        return this._buffer;
    }

    public get packedLength() {
        return this._offset;
    }

    public get slicedData() {
        return this._buffer.slice(0, this._offset);
    }
}

export default BufferWriter;
