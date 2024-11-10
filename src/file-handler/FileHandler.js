import { promises as fs } from 'fs';

const FileHandler = {
  async readFile(fileName) {
    try {
      return await fs.readFile(`./public/${fileName}`, 'utf-8');
    } catch (error) {
      MissionUtils.Console.print('파일을 불러오지 못했습니다.');
    }
  },

  async fileToObj(fileName) {
    const file = await this.readFile(fileName);

    const rows = file.split('\r\n');
    const keys = rows[0].split(',');

    return this.makeObjs(rows, keys);
  },

  makeObjs(rows, keys) {
    const objs = [];
    for (let i = 1; i < rows.length - 1; i++) {
      let row = rows[i].split(',');
      const obj = this.makeObj(row, keys);
      objs.push(obj);
    }
    return objs;
  },

  makeObj(row, keys) {
    let obj = {};
    for (let i = 0; i < keys.length; i++) {
      obj[keys[i]] = this.typeChange(row[i]);
    }
    return obj;
  },

  typeChange(value) {
    if (value === 'null') return null;
    else if (!isNaN(value)) return parseInt(value);
    else return value;
  },
};

export default FileHandler;
