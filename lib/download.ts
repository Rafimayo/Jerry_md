import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import * as fs from 'fs';

const downloadMediaMessage = async (message: any, filename?: string) => {
  const stream = await downloadContentFromMessage(message, message.type.replace('Message', '').toLowerCase());
  let buffer = Buffer.from([]);
  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk]);
  }

  if (filename) {
    fs.writeFileSync(filename, buffer);
  }

  return new Uint8Array(buffer);
};

export default downloadMediaMessage;
