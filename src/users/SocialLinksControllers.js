const SocialLinks = require("./VidieosModel");
const showVideos = async (req, res) => {
    try {
      const videoId = req.params.videoId;
      if (!videoId) {
        return res.status(404).send('Video ID not provided');
      }
        const socialLinks = await SocialLinks.find({ videoId });
        if (!socialLinks || !socialLinks.length) {
        return res.status(404).send('Social media panel data not found');
      }
        res.status(200).json({ socialLinks });
    } catch (error) {
      console.error('Error fetching social media panel data:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  

const AdminVideo = async (req, res) => {
    try {
        const socialLinks = await SocialLinks.find();
    
        if (!socialLinks || !socialLinks.length) {
          return res.status(404).json({ message: 'Social media panel data not found' });
        }
    
        let allVideos = [];
    
        socialLinks.forEach(socialMedia => {
          allVideos.push({
            socialMedia: socialMedia.socialMedia,
            video: socialMedia.video
          });
        });
    
        res.render('GetAllVideos', { videos: allVideos });
      } catch (error) {
        console.error('Error fetching social media panel data:', error);
        res.status(500).send({ origin: 'Internal Server Error origin', error: error.message });
      }
    }   
const showVideo = async (req, res) => {
    try {
        const socialLinks = await SocialLinks.find();

        if (!socialLinks || !socialLinks.length) {
            return res.status(404).json({ message: 'Social media panel data not found' });
        }

        let allVideos = [];

        socialLinks.forEach(socialMedia => {
            allVideos.push({
                socialMedia: socialMedia.socialMedia,
                video: socialMedia.video
            });
        });
        res.status(200).json(allVideos);
    } catch (error) {
        console.error('Error fetching social media panel data:', error);
        res.status(500).send({ origin: 'Internal Server Error origin', error: error.message });
    }
};const updateVideoByID = async (req, res) => {
  try {
      const videoId = req.params.id;
      const updatedFields = req.body;

      console.log('Video ID:', videoId);
      console.log('Updated Fields:', updatedFields);

      const video = await SocialLinks.findById(videoId);

      if (!video) {
          return res.status(404).json({ message: 'Video not found' });
      }

      if (updatedFields.socialMedia !== undefined) {
          video.socialMedia = updatedFields.socialMedia;
      }
      if (updatedFields.videoTitle !== undefined) {
          video.video.title = updatedFields.videoTitle;
      }
      if (updatedFields.videoUrl !== undefined) {
          video.video.url = updatedFields.videoUrl;
      }
      if (updatedFields.videoDescription !== undefined) {
          video.video.description = updatedFields.videoDescription;
      }

      const updatedVideo = await video.save();

      console.log('Updated Video:', updatedVideo);

      res.status(200).json({ message: 'Video updated successfully', updatedVideo });
  } catch (error) {
      console.error('Error updating video:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


const addVideo = async (req, res) => {
  try {
    const { socialMedia, videoTitle, videoUrl, videoDescription } = req.body;

    const existingVideos = await SocialLinks.findOne({ videoUrl });
    if (existingVideos) {
      return res.status(400).json({ message: 'Video with this link already exists' });
    }

    const newVideo = new SocialLinks({
      socialMedia,
      video: {
        title: videoTitle,
        url: videoUrl,
        description: videoDescription,
      },
    });

    const savedVideo = await newVideo.save();

    res.status(200).json({ message: 'Video successfully added', id: savedVideo._id });
  } catch (error) {
    console.error('Error adding video:', error);
    if (error.code === 11000) { 
      res.status(400).json({ message: 'Video with this link already exists' });
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
};


const deleteVideoByID = async (req, res) => {
    try {
      const videoId = req.params.id;
      const deletedVideo = await SocialLinks.findByIdAndDelete(videoId);
      if (!deletedVideo) {
        return res.status(404).json({ message: 'Video not found' });
      }
      res.status(200).json({ message: 'Video successfully deleted', deletedVideo });
    } catch (error) {
      console.error('Error deleting video:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };
  
  
module.exports = {
    deleteVideoByID,
    showVideos,
    updateVideoByID,
    addVideo,
    // deleteVideo,
    showVideo,
    AdminVideo
};
