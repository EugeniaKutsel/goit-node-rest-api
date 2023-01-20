const { User } = require('../../models/user');
const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarDir, filename);
    await fs.rename(tempUpload, resultUpload);

    Jimp.read(resultUpload)
      .then(image => {
        return image
          .resize(250, 250)
          .write(resultUpload)
      })
      .catch(err => {
        console.error(err);
      });

    const avatarUrl = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarUrl });

    res.status(200).json({
      avatarUrl
    })

  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
}

module.exports = updateAvatar;