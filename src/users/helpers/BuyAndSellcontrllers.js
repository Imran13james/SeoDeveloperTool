const BuyANDSELL = require("./Buyandsellmodel");
const createBuySell = async (req, res) => {
    const { customerId, EarniningPlatfroms, SerialNo } = req.body;

    // Validate required fields including customerId
    if (!customerId || !EarniningPlatfroms || !SerialNo.title || !SerialNo.AccName || !SerialNo.AccountUrl) {
        res.status(400).json({ message: 'Missing required fields' });
        return; // Early return to prevent further processing
    }

    // Check for existing serial number
    const existingBuySell = await BuyANDSELL.findOne({ 'SerialNo.title': SerialNo.title });
    if (existingBuySell) {
        res.status(409).json({ message: 'Serial number already exists' });
        return; // Early return to prevent further processing
    }

    // Construct and save the new Buy_Sell record including customerId
    const newBuySell = new BuyANDSELL({
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
        res.status(201).json({ message: 'Buy_Sell record created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Buy_Sell record', error });
    }
};
const getAllBuySell = async (req, res) => {
    try {
        const buySellRecords = await BuyANDSELL.find();

        if (buySellRecords.length === 0) {
            res.status(404).json({ message: 'No Buy_Sell records found' });
            return; // Early return to prevent further processing
        }

        res.json(buySellRecords);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Buy_Sell records', error });
    }
};
const updateBuySell = async (req, res) => {
    const customerId = req.params.customerId; // Access customerId from params
    const updateData = req.body; // Contains the fields to be updated

    // Validate required fields
    if (!updateData || !Object.keys(updateData).length) {
        res.status(400).json({ message: 'Missing update data' });
        return; // Early return to prevent further processing
    }

    try {
        // Find the record to be updated based on customerId
        const buySellRecord = await BuyANDSELL.findOne({ customerId });

        if (!buySellRecord) {
            res.status(404).json({ message: 'Buy_Sell record not found for the customer ID' });
            return; // Early return to prevent further processing
        }

        // Update the record with the provided data
        Object.assign(buySellRecord, updateData);

        // Save the updated record
        await buySellRecord.save();

        res.status(200).json({ message: 'Buy_Sell record updated successfully', updatedRecord: buySellRecord }); // Send updated record in response
    } catch (error) {
        res.status(500).json({ message: 'Error updating Buy_Sell record', error });
    }
};
const deleteBuySell = async (req, res) => {
    const customerId = req.params.customerId; // Access customerId from params

    // Find the record to be deleted based on customerId
    try {
        const buySellRecord = await BuyANDSELL.findOneAndDelete({ customerId });

        if (!buySellRecord) {
            res.status(404).json({ message: 'Buy_Sell record not found for the customer ID' });
            return; // Early return to prevent further processing
        }

        res.status(200).json({ message: 'Buy_Sell record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Buy_Sell record', error });
    }
};

module.exports = {
    deleteBuySell,
    createBuySell,
    getAllBuySell,
    updateBuySell
};
