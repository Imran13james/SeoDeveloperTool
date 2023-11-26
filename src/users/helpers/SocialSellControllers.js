const SocialSell = require("../SocialSellModel");

const CreateSocialsell = async (req, res) => {
    const { serialNo, earningPlatforms, aboutThisAccount } = req.body;

    if (!serialNo || !earningPlatforms  || !aboutThisAccount.accName || !aboutThisAccount.accountUrl) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const existingBuySell = await SocialSell.findOne({ 'serialNo': serialNo });
        if (existingBuySell) {
            return res.status(409).json({ message: 'Serial number already exists' });
        }

        const newBuySell = new SocialSell({
            serialNo: serialNo,
            earningPlatforms: earningPlatforms,
            aboutThisAccount: {
                accPrice: aboutThisAccount.accPrice,
                accName: aboutThisAccount.accName,
                accountUrl: aboutThisAccount.accountUrl,
                accountAge: aboutThisAccount.accountAge,
            },
        });
        const newRecord = await newBuySell.save();
        res.status(201).json({ message: 'Social Account  Created Successfully', newRecord: newRecord });
    } catch (error) {
        res.status(500).json({ message: 'Error Creating Social Account Record', error: error.message });
    }
};
const GetSocialsell = async (req, res) => {
    try {
        const buySellRecords = await SocialSell.find().sort({ createdAt: -1 });;

        if (!buySellRecords || buySellRecords.length === 0) {
            return res.status(404).json({ message: 'No Social Account Found' });
        }

        res.json(buySellRecords);
    } catch (error) {
        res.status(500).json({ message: 'Error Retrieving Social Account', error: error.message });
    }
};


const UpdateSocialsell = async (req, res) => {
    const serialNo = req.params.serialNo;
    const updateData = req.body;

    if (!serialNo) {
        return res.status(400).json({ message: 'Missing serial number' });
    }

    if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'Missing update data' });
    }
    try {
        const buySellRecord = await SocialSell.findOne({ serialNo });

        if (!buySellRecord) {
            return res.status(404).json({ message: 'Social Account Record Not Found For The Serial Number' });
        }

        Object.assign(buySellRecord, updateData);
        await buySellRecord.save();

        res.status(200).json({ message: 'Social Account Updated Successfully', updatedRecord: buySellRecord });
    } catch (error) {
        res.status(500).json({ message: 'Error updating Social Account', error: error.message });
    }
};



const DeleteSocialsell = async (req, res) => {
    const serialNo = req.params.serialNo;
    try {
        const buySellRecord = await SocialSell.findOneAndDelete({ serialNo });

        if (!buySellRecord) {
            return res.status(404).json({ message: 'Social Account Record Not Found For The Serial Number' });
        }

        res.status(200).json({ message: 'Social Account Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error Deleting Social Account', error: error.message });
    }
};

module.exports = {
    DeleteSocialsell,
    CreateSocialsell,
    GetSocialsell,
    UpdateSocialsell
};
