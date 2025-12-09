import BufferWriter from "./bufferwriter.js";
import Color from "./color.js";
import NetworkText from "./networktext.js";

class PacketWriter extends BufferWriter {
    private updateSize() {
        const offset = this._offset;
        this._offset = 0;
        super.packUInt16(offset);
        this._offset = offset;
    }

    public setType(type: number) {
        this.packUInt16(3);
        this.packByte(type);
        return this;
    }

    public packInt16(int16: number) {
        super.packInt16(int16);
        this.updateSize();
        return this;
    }

    public packUInt16(uint16: number) {
        super.packUInt16(uint16);
        this.updateSize();
        return this;
    }

    public packInt32(int32: number) {
        super.packInt32(int32);
        this.updateSize();
        return this;
    }

    public packUInt32(uint32: number) {
        super.packUInt32(uint32);
        this.updateSize();
        return this;
    }

    public packSingle(single: number) {
        super.packSingle(single);
        this.updateSize();
        return this;
    }

    public packByte(byte: number) {
        super.packByte(byte);
        this.updateSize();
        return this;
    }

    public packSByte(byte: number) {
        super.packSByte(byte);
        this.updateSize();
        return this;
    }

    public packHex(hex: string) {
        super.packHex(hex);
        this.updateSize();
        return this;
    }

    public packBuffer(buffer: Buffer) {
        super.packBuffer(buffer);
        this.updateSize();
        return this;
    }

    public packString(str: string) {
        super.packString(str);
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
}

export default PacketWriter;
