const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "pablic", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  console.log(tempUpload);
  const file = await Jimp.read(tempUpload);
  await file.resize(250, 250).write(tempUpload);
  const { _id: id } = req.user;
  try {
    const resultUpload = path.join(avatarsDir, originalname);
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join("pablic", "avatars", `${id}_${originalname}`);
    await User.findByIdAndUpdate(req.user._id, { avatarUrl });
    res.json({ avatarUrl });
  } catch {
    await fs.unlink(tempUpload);
    throw Error;
  }
};

module.exports = updateAvatar;
