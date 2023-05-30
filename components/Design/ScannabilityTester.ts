import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType } from '@zxing/library';

export default function getReader() {
  const hints = new Map();
  const formats = [BarcodeFormat.QR_CODE];

  hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

  const reader = new BrowserMultiFormatReader()
  reader.hints = hints
  return reader
}

