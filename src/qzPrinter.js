// src/qzService.js
import qz from "qz-tray";

const DEFAULT_RETRIES = 5;

const connect = async () => {
  if (qz.websocket && qz.websocket.isActive && qz.websocket.isActive()) {
    return;
  }
  try {
    await qz.websocket.connect({ retries: DEFAULT_RETRIES, delay: 1 });
    console.log("QZ Tray connected");
  } catch (err) {
    console.error("QZ connect error:", err);
    throw err;
  }
};

const disconnect = () => {
  try { qz.websocket.disconnect(); } catch (e) {}
};

const getDefaultPrinter = async () => {
  return qz.printers.getDefault();
};

const findPrinter = async (query) => {
  const list = await qz.printers.find(query); // returns array
  return list && list.length ? list[0] : null;
};

// Raw ESC/POS printing helper (recommended for thermal receipts)
const printRaw = async (printerName, linesArray /* array of strings/commands */) => {
  const config = qz.configs.create(printerName, { encoding: "UTF-8" });
  const data = [{
    type: "raw",
    format: "command",
    flavor: "plain",
    data: linesArray
  }];
  return qz.print(config, data);
};

// Pixel / HTML printing (use if you want to print full HTML file/string)
// Example: type:'pixel', format:'html', flavor:'plain' (or 'file' if URL)
const printHtml = async (printerName, htmlString) => {
  const config = qz.configs.create(printerName);
  const data = [{
    type: "pixel",
    format: "html",
    flavor: "plain",
    data: htmlString
  }];
  return qz.print(config, data);
};

export default {
  connect,
  disconnect,
  getDefaultPrinter,
  findPrinter,
  printRaw,
  printHtml
};
