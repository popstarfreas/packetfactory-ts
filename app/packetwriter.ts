import DumbPacketWriter from "./dumbpacketwriter";
import { getPackedStringByteLen } from "./utils";
import NetworkText from "./networktext";
import Color from "./color";
import Writer from "./writer";

interface QueueItem {
    method: string;
    value: any;
}

type WriterCls = new (buffer: Buffer) => Writer;

class PacketWriter implements Writer {
    private _queue: QueueItem[] = [];
    private _size: number = 0;
    private _data: Buffer | null = null;
    private _writerCls: WriterCls;

    constructor(writerCls: WriterCls = DumbPacketWriter) {
        this._writerCls = writerCls;
    }

    private compile() {
        const writer = new this._writerCls(Buffer.allocUnsafe(this._size));
        for (const item of this._queue) {
            (writer as any)[item.method](item.value);
        }

        this._data = writer.data;
    }

    public setType(type: number) {
        this._queue.push({method: "setType", value: type});
        if (this._size === 0) this._size = 3;
        return this;
    }

    public packInt16(int16: number) {
        this._queue.push({method: "packInt16", value: int16});
        this._size += 2;
        return this;
    }

    public packUInt16(uint16: number) {
        this._queue.push({method: "packUInt16", value: uint16});
        this._size += 2;
        return this;
    }

    public packInt32(int32: number) {
        this._queue.push({method: "packInt32", value: int32});
        this._size += 4;
        return this;
    }

    public packUInt32(uint32: number) {
        this._queue.push({method: "packUInt32", value: uint32});
        this._size += 4;
        return this;
    }

    public packInt64(int64: bigint) {
        this._queue.push({method: "packInt64", value: int64});
        this._size += 8;
        return this;
    }

    public packUInt64(uint64: bigint) {
        this._queue.push({method: "packUInt64", value: uint64});
        this._size += 8;
        return this;
    }

    public packSingle(single: number) {
        this._queue.push({method: "packSingle", value: single});
        this._size += 4;
        return this;
    }

    public packDouble(double: number) {
        this._queue.push({method: "packDouble", value: double});
        this._size += 8;
        return this;
    }

    public packByte(byte: number) {
        this._queue.push({method: "packByte", value: byte});
        this._size += 1;
        return this;
    }

    public packSByte(byte: number) {
        this._queue.push({method: "packSByte", value: byte});
        this._size += 1;
        return this;
    }

    public packBytes(bytes: number[]) {
        this._queue.push({method: "packBytes", value: bytes});
        this._size += bytes.length;
        return this;
    }

    public packHex(hex: string) {
        if (hex.length % 2 !== 0) {
            throw new Error("Tried to pack invalid hex string.");
        }

        this._queue.push({method: "packHex", value: hex});
        this._size += hex.length / 2;
        return this;
    }

    public packBuffer(buffer: Buffer) {
        this._queue.push({method: "packBuffer", value: buffer});
        this._size += buffer.length;
        return this;
    }

    public packString(str: string) {
        this._queue.push({method: "packString", value: str});
        this._size += getPackedStringByteLen(str);
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
        if (this._data === null) {
            this.compile();
        }

        return this._data as Buffer;
    }
}

export default PacketWriter;
