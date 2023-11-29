const BuyAndSell = require("./Buyandsellmodel");

// old one working but not Good
// const createBuySell = async (req, res) => {
//     const { serialNo, earningPlatforms, aboutThisAccount } = req.body;
//     if (!serialNo || !earningPlatforms ||  !aboutThisAccount.accName || !aboutThisAccount.accountUrl) {
//         return res.status(400).json({ message: 'Missing required fields' });
//     }
// // need to update this according to social selll
// // my name is imran ali
//     try {
//         const existingBuySell = await BuyAndSell.findOne({ 'serialNo': serialNo });
//         if (existingBuySell) {
//             return res.status(409).json({ message: 'Serial Number Already Exists' });
//         }

//         const newBuySell = new BuyAndSell({
//             serialNo: serialNo,
//             earningPlatforms: earningPlatforms,
//             aboutThisAccount: {
//                 accPrice: aboutThisAccount.accPrice,
//                 accName: aboutThisAccount.accName,
//                 accountUrl: aboutThisAccount.accountUrl,
//                 accountAge: aboutThisAccount.accountAge,
//             },
//         });

//         const newRecord = await newBuySell.save();
//         res.status(201).json({ message: 'Buy Account  Created Successfully', newRecord: newRecord });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating Buy Account  Record', error: error.message });
//     }
// };
// updatebuy and sell according to hafiz
const createBuySell = async (req, res) => {
    const { serialNo, earningPlatforms, aboutThisAccount, details } = req.body;

    if (!serialNo || !earningPlatforms || !aboutThisAccount.accName || !aboutThisAccount.accountUrl || !details.accountFullname || !details.descFull || !details.siteAge || !details.monthlyProfit || !details.profitMargin || !details.pageViews) {
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
            aboutThisAccount: aboutThisAccount,
            details: details,
        });

        const newRecord = await newBuySell.save();
        res.status(201).json({ message: 'Social Account Created Successfully', newRecord: newRecord });
    } catch (error) {
        res.status(500).json({ message: 'Error Creating Social Account Record', error: error.message });
    }
};

// ================================================================================================
// const getAllBuySell = async (req, res) => {
//     try {
//         const buySellRecords = await BuyAndSell.find().sort({ createdAt: -1 });

//         if (!buySellRecords || buySellRecords.length === 0) {
//             return res.status(404).json({ message: 'No Buy Account  Record Found' });
//         }

//         res.json(buySellRecords);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving Buy Account  Record', error: error.message });
//     }
// };
// ===================================================================================================
// update Alll data Done swag

const getAllBuySell = async (req, res) => {
    try {
      const buySellRecords = await BuyAndSell.find().sort({ createdAt: -1 }).limit(5);
  
      if (!buySellRecords || buySellRecords.length === 0) {
        return res.status(404).json({ message: 'No Social Account Found' });
      }
      const limitedDetails = buySellRecords.map((record) => {
        const { _id, serialNo, earningPlatforms, aboutThisAccount } = record;
        return {
          _id,
          serialNo,
          earningPlatforms,
          aboutThisAccount,
        };
      });
  
      res.json(limitedDetails);
    } catch (error) {
      res.status(500).json({ message: 'Error Retrieving Social Account', error: error.message });
    }
  };
  
  const getAllBuySellDetails = async (req, res) => {
    try {
      const { id } = req.params; // Assuming you have an ID parameter for the specific record
  
      const socialSellRecord = await BuyAndSell.findById(id);
  
      if (!socialSellRecord) {
        return res.status(404).json({ message: 'Social Account not found' });
      }
  
      res.json(socialSellRecord); // Sending the full details of the record
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving Social Account details', error: error.message });
    }
  };

// ==================================================================
// old Update method
// const updateBuySell = async (req, res) => {
//     const serialNo = req.params.serialNo;
//     const updateData = req.body;

//     if (!serialNo) {
//         return res.status(400).json({ message: 'Missing serial number' });
//     }

//     if (!updateData || Object.keys(updateData).length === 0) {
//         return res.status(400).json({ message: 'Missing update data' });
//     }

//     try {
//         const buySellRecord = await BuyAndSell.findOne({ serialNo });

//         if (!buySellRecord) {
//             return res.status(404).json({ message: 'Buy Account Record Not Found For The Eerial Number' });
//         }

//         Object.assign(buySellRecord, updateData);
//         await buySellRecord.save();

//         res.status(200).json({ message: 'Buy Account  Updated Successfully', updatedRecord: buySellRecord });
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating Buy Account  Record', error: error.message });
//     }
// };
// ___________________________________________________________________________________________________
// porana code of updated sell anadsdsa
// const updateBuySell = async (req, res) => {
//     const serialNo = req.params.serialNo;
//     const updateData = req.body;
  
//     if (!serialNo) {
//       return res.status(400).json({ message: 'Missing serial number' });
//     }
  
//     if (!updateData || Object.keys(updateData).length === 0) {
//       return res.status(400).json({ message: 'Missing update data' });
//     }
  
//     try {
//       const buySellRecord = await SocialSell.findOne({ serialNo });
  
//       if (!buySellRecord) {
//         return res.status(404).json({ message: 'Social Account Record Not Found For The Serial Number' });
//       }
  
//       const { earningPlatforms, aboutThisAccount } = updateData;
//       buySellRecord.earningPlatforms = earningPlatforms;
//       buySellRecord.aboutThisAccount = {
//         ...buySellRecord.aboutThisAccount,
//         ...aboutThisAccount,
//       };
  
//       await buySellRecord.save();
  
//       res.status(200).json({ message: 'Social Account Updated Successfully', updatedRecord: buySellRecord });
//     } catch (error) {
//       res.status(500).json({ message: 'Error updating Social Account', error: error.message });
//     }
//   };
// ________________________________________________________________________________________________________

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
        return res.status(404).json({ message: 'Social Account Record Not Found For The Serial Number' });
      }
  
      const { earningPlatforms, aboutThisAccount } = updateData;
      buySellRecord.earningPlatforms = earningPlatforms;
      buySellRecord.aboutThisAccount = {
        ...buySellRecord.aboutThisAccount,
        ...aboutThisAccount,
      };
  
      await buySellRecord.save();
  
      res.status(200).json({ message: 'Social Account Updated Successfully', updatedRecord: buySellRecord });
    } catch (error) {
      res.status(500).json({ message: 'Error updating Social Account', error: error.message });
    }
  };

const deleteBuySell = async (req, res) => {
    const serialNo = req.params.serialNo; 
    //  serial kkkkbh parameter

    try {
        const buySellRecord = await BuyAndSell.findOneAndDelete({ serialNo });

        if (!buySellRecord) {
            return res.status(404).json({ message: 'Buy Account  Record  Not Found For The Eerial Number' });
        }

        res.status(200).json({ message: 'Buy Account Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error Deleting Buy Account ', error: error.message });
    }
};
module.exports = {
    deleteBuySell,
    createBuySell,
    getAllBuySell,
    updateBuySell,
    getAllBuySellDetails
};
