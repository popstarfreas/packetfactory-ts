import * as path from 'path';
import RawPacket from './rawpacket';
import BufferReader from './bufferreader';
import * as utf8 from 'utf8';
import PacketWriter from './packetwriter';
import BufferWriter from './bufferwriter';

export interface BuffersPackets {
  bufferPacket: Buffer;
  packets: RawPacket[];
}

export function bufferToText(buf: Buffer): string {
  const reader = new BufferReader(buf);
  let str: string = '';
  for (let i: number = 0; i < buf.length; i++) {
    str += String.fromCharCode(reader.readByte());
  }
  return str;
}

export function textToBuffer(str: string): Buffer {
  const writer = new BufferWriter(Buffer.allocUnsafe(str.length));
  for (var i = 0, l = str.length; i < l; i++) {
    writer.packByte(str.charCodeAt(i));
  }

  return writer.data;
}

export function getProperIP(ip: string | undefined): string | undefined {
  if (typeof ip === "undefined") return undefined;
  let IPFromRequest: string = ip;
  let indexOfColon: number = IPFromRequest.lastIndexOf(':');
  let IP: string = IPFromRequest.substring(indexOfColon + 1, IPFromRequest.length);
  return IP;
}

export function getPacketTypeFromBuffer(buf: Buffer): number {
  return buf.readUInt8(2);
}

export function getPacketsFromBuffer(buf: Buffer): BuffersPackets {
  const reader = new BufferReader(buf);
  let packets: RawPacket[] = [];
  let end: boolean = false;
  let length: number;
  let data: Buffer;
  let index: number = 0;
  let packetType: number;
  let bufferPacket: Buffer = Buffer.allocUnsafe(0);
  if (buf.length > 1) {
    while (!end) {
      length = reader.readUInt16();

      if (length === 0) {
        end = true;
      } else {
        // - 2, so that we capture the two length bytes already read
        data = buf.slice(reader.head - 2, reader.head - 2 + length);
        // -2 here because length includes 2 bytes already read
        reader.head += length - 2;
        if (reader.head > buf.length) {
          bufferPacket = data;
          end = true;
        } else {
          packetType = getPacketTypeFromBuffer(data);
          packets.push({
            packetType: packetType,
            data: data
          });

          // Need at least 2 bytes for the next length int16
          if (reader.head === buf.length - 1) {
            bufferPacket = buf.slice(buf.length - 1, buf.length);
            end = true;
          // No more bytes to read
          } else if(reader.head === buf.length) {
            end = true;
          }
        }
      }
    }
  } else {
    bufferPacket = buf.slice(0, 1);
  }

  return { bufferPacket: bufferPacket, packets: packets };
}

export function _invalidateRequireCacheForFile(filePath: string, require: NodeRequire) {
  var realPath = path.resolve(filePath);
  delete require.cache[realPath];
}

export function requireNoCache(filePath: string, require: NodeRequire) {
  _invalidateRequireCacheForFile(filePath, require);
  return require(filePath);
}

export function getPackedStringByteLen(str: string) {
  const strLen = textToBuffer(utf8.encode(str)).length;
  if (strLen >= 128) {
    return 2 + strLen;
  }

  return 1 + strLen;
}
