const BuyAndSell = require("./Buyandsellmodel");
const createBuySell = async (req, res) => {
    const { serialNo, earningPlatforms, aboutThisAccount } = req.body;

    if (!serialNo || !earningPlatforms || !aboutThisAccount.title || !aboutThisAccount.accName || !aboutThisAccount.accountUrl) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const existingBuySell = await BuyAndSell.findOne({ 'serialNo': serialNo });
        if (existingBuySell) {
            return res.status(409).json({ message: 'Serial number already exists' });
        }

        const newBuySell = new BuyAndSell({
            serialNo: serialNo,
            earningPlatforms: earningPlatforms,
            aboutThisAccount: {
                title: aboutThisAccount.title,
                accPrice: aboutThisAccount.accPrice,
                accName: aboutThisAccount.accName,
                accountDescription: aboutThisAccount.accountDescription,
                accountUrl: aboutThisAccount.accountUrl,
                accountAge: aboutThisAccount.accountAge,
            },
        });

        const newRecord = await newBuySell.save();
        res.status(201).json({ message: 'Buy_Sell record created successfully', newRecord: newRecord });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Buy_Sell record', error: error.message });
    }
};
const getAllBuySell = async (req, res) => {
    try {
        const buySellRecords = await BuyAndSell.find();

        if (!buySellRecords || buySellRecords.length === 0) {
            return res.status(404).json({ message: 'No Buy_Sell records found' });
        }

        res.json(buySellRecords);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Buy_Sell records', error: error.message });
    }
};
const updateBuySell = async (req, res) => {
    const serialNo = req.params.serialNo;
    const updateData = req.body;

    if (!serialNo) {
        return res.status(400).json({ message: 'Missing serial number' });
    }

    if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'Missing update data' });
    }

    try {
        const buySellRecord = await BuyAndSell.findOne({ serialNo });

        if (!buySellRecord) {
            return res.status(404).json({ message: 'Buy_Sell record not found for the serial number' });
        }

        Object.assign(buySellRecord, updateData);
        await buySellRecord.save();

        res.status(200).json({ message: 'Buy_Sell record updated successfully', updatedRecord: buySellRecord });
    } catch (error) {
        res.status(500).json({ message: 'Error updating Buy_Sell record', error: error.message });
    }
};


const deleteBuySell = async (req, res) => {
    const serialNo = req.params.serialNo; 
    //  serial kkkkbh parameter

    try {
        const buySellRecord = await BuyAndSell.findOneAndDelete({ serialNo });

        if (!buySellRecord) {
            return res.status(404).json({ message: 'Buy_Sell record not found for the serial number' });
        }

        res.status(200).json({ message: 'Buy_Sell record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Buy_Sell record', error: error.message });
    }
};


module.exports = {
    deleteBuySell,
    createBuySell,
    getAllBuySell,
    updateBuySell
};
