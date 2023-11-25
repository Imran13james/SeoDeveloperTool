const SocialSell = require("../SocialSellModel");

const CreateSocialsell = async (req, res) => {
    const { customerId, EarniningPlatfroms, SerialNo } = req.body;

    if (!customerId || !EarniningPlatfroms || !SerialNo.title || !SerialNo.AccName || !SerialNo.AccountUrl) {
        res.status(400).json({ message: 'Missing required fields' });
        return; 
    }
    const existingBuySell = await SocialSell.findOne({ 'SerialNo.title': SerialNo.title });
    if (existingBuySell) {
        res.status(409).json({ message: 'Serial number already exists' });
        return; 
    }
    const newBuySell = new SocialSell({
        customerId,
        EarniningPlatfroms,
        SerialNo: {
            title: SerialNo.title,
            AccName: SerialNo.AccName,
            AccountDesccrption: SerialNo.AccountDesccrption,
            AccountUrl: SerialNo.AccountUrl,
            Account_Age: SerialNo.Account_Age,
        },
    });

    try {
        await newBuySell.save();
        res.status(201).json({ message: 'Buy Acc record created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Buy_Sell record', error });
    }
};
const GetSocialsell = async (req, res) => {
    try {
        const buySellRecords = await SocialSell.find();

        if (buySellRecords.length === 0) {
            res.status(404).json({ message: 'No Buy Acc records found' });
            return; 
        }

        res.json(buySellRecords);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Buy_Sell records', error });
    }
};
const UpdateSocialsell = async (req, res) => {
    try {
      const customerId = req.params.customerId; 
  
      const socialSell = await SocialSell.findOne({ customerId });
  
      if (!socialSell) {
        return res.status(404).json({ message: 'SocialSell not found' });
      }
  
      if (req.body.EarniningPlatfroms) {
        socialSell.EarniningPlatfroms = req.body.EarniningPlatfroms;
      }
  
      if (req.body.SerialNo) {
        socialSell.SerialNo = req.body.SerialNo;
      }
  
      const updatedSocialSell = await socialSell.save();
  
      res.json(updatedSocialSell);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
const DeleteSocialsell = async (req, res) => {
    const customerId = req.params.customerId; 

    try {
        const buySellRecord = await SocialSell.findOneAndDelete({ customerId });

        if (!buySellRecord) {
            res.status(404).json({ message: 'Buy Acc record not found for the customer ID' });
            return; // Early return to prevent further processing
        }

        res.status(200).json({ message: 'Buy Acc record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Buy Acc record', error });
    }
};

module.exports = {
    DeleteSocialsell,
    CreateSocialsell,
    GetSocialsell,
    UpdateSocialsell
};
