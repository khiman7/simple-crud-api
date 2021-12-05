const parseBodyData = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      let data = '';

      req.on('data', (chunk) => {
        data += chunk.toString();
      });

      req.on('end', () => {
        resolve(JSON.parse(data));
      });
    } catch (err) {
      reject(err);
    }
  });
};

const isUuid = (str) => {
  const uuidRegExp = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;

  return uuidRegExp.test(str);
}

module.exports = {
  parseBodyData,
  isUuid,
};
