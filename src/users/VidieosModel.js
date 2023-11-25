const mongoose = require('mongoose');

const socialPanelSchema = new mongoose.Schema({
  videoId: {
    type: String, // Changed type to String
    unique: true,
    required: true,
  },
  socialMedia: {
    type: String,
    enum: ['Youtube', 'Facebook', 'Instagram', 'Twitter', 'TikTok'],
    required: true,
  },
  video: {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
});

const SocialLinks = mongoose.model('SocialLinks', socialPanelSchema);

module.exports = SocialLinks;
