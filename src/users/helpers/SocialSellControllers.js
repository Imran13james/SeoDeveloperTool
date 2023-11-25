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
            return; // Early return to prevent further processing
        }

        res.json(buySellRecords);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Buy_Sell records', error });
    }
};
const UpdateSocialsell = async (req, res) => {
    const customerId = req.params.customerId; // Access customerId from params
    const updateData = req.body; // Contains the fields to be updated

    // Validate required fields
    if (!updateData || !Object.keys(updateData).length) {
        res.status(400).json({ message: 'Missing update data' });
        return; // Early return to prevent further processing
    }

    try {
        // Find the record to be updated based on customerId
        const buySellRecord = await SocialSell.findOne({ customerId });

        if (!buySellRecord) {
            res.status(404).json({ message: 'Buy Acc record not found for the customer ID' });
            return; // Early return to prevent further processing
        }

        // Update the record with the provided data
        Object.assign(buySellRecord, updateData);

        // Save the updated record
        await buySellRecord.save();

        res.status(200).json({ message: 'Buy Acc record updated successfully', updatedRecord: buySellRecord }); // Send updated record in response
    } catch (error) {
        res.status(500).json({ message: 'Error updating Buy_Sell record', error });
    }
};
const DeleteSocialsell = async (req, res) => {
    const customerId = req.params.customerId; // Access customerId from params

    // Find the record to be deleted based on customerId
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
