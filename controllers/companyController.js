const { ObjectId } = require('mongodb');
exports.jobTitleQuery = async (req, res) => {
  console.log("controller called");
   try {
        console.log("controller called");
        jobTitle = "SOFTWARE ENGINEER";
        const { PW_2023_Q2 } = req.models; 
        const result = await PW_2023_Q2.aggregate([
            {
                $match: {
                    JOB_TITLE: jobTitle
                }
            },
            {
                $group: {
                    _id: "$EMPLOYER_LEGAL_BUSINESS_NAME",
                    locations: { $addToSet: "$EMPLOYER_CITY" },
                    salaries: { $addToSet: "$PWD_WAGE_RATE" },
                    count: { $sum: 1 }
                }
            }
        ]);
        
        res.status(200).json({ success: true, result });
    } catch (error) {
     
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while processing your request' });
    
    }
};
