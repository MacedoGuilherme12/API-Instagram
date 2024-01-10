const B2 = require('backblaze-b2');
const fsp = require('fs/promises')

const b2 = new B2({
  applicationKeyId: '005778ee99a6df40000000001', 
  applicationKey: 'K005YCR8ddyYpQACRsXqRxNZKUxRRaQ' 
});
const unlinkAsync = fsp.unlink;
class FileController {
  async upload(req, res) {
    const { filename, path } = req.file;

    try {

      const file = await fsp.readFile(`uploads/${filename}`, (err, data) => {
        if (err) {
          throw err
        }

        return data;
      });

      await b2.authorize();

      const { data: { uploadUrl, authorizationToken } } = await b2.getUploadUrl({
        bucketId: 'f73768bebe39f93a86cd0f14'
      });

      const { data } = await b2.uploadFile({
        uploadUrl: uploadUrl,
        uploadAuthToken: authorizationToken,
        fileName: filename,
        data: file
      });

      await unlinkAsync(path);

      return res.send({ url: `${data.fileName}` });

    } catch (error) {
      return res.status(400).send({ message: 'Failed to upload!' });
    }

  }
}
module.exports = new FileController()