const { ObjectId } = require('mongodb');
const { parseRss } = require('../rssParser');

exports.jobTitleQuery = async (req, res) => {
    console.log("controller called");
    console.log(req.params.jobTitle);
    start = 0;
    jobTitle = req.params.jobTitle;
    const encodedJobTitle = encodeURIComponent(jobTitle);
    // Construct the RSS URL
    const rssUrl = "https://www.indeed.com/rss?q=" + encodedJobTitle + "&start="+ start;
    console.log(rssUrl);
  // Call the parseRss function
    // Call the parseRss function
    const companies = await parseRss(rssUrl);

    try {
        console.log(companies);
        const { PW_2023_Q2 } = req.models; 
        const inputCompanies = companies; // Assuming the input array is sent in the request body
        const companiesFound = [];
    
        for (const companyObj of inputCompanies) {
            const companyName = companyObj.company;
            const regex = new RegExp(companyName, 'i'); // 'i' makes it case insensitive
            const result = await PW_2023_Q2.aggregate([
                {
                    $match: {
                        EMPLOYER_LEGAL_BUSINESS_NAME: { $regex: regex }
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
    
            if (result.length > 0) {
                console.log(companyObj);
                companiesFound.push(companyObj);
            }
        }
    
        res.status(200).json({ success: true, companiesFound });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while processing your request' });
    }
    

//    try {
     
     
//         const { PW_2023_Q2 } = req.models; 
//         const result = await PW_2023_Q2.aggregate([
//             {
//                 $match: {
//                     JOB_TITLE: jobTitle
//                 }
//             },
//             {
//                 $group: {
//                     _id: "$EMPLOYER_LEGAL_BUSINESS_NAME",
//                     locations: { $addToSet: "$EMPLOYER_CITY" },
//                     salaries: { $addToSet: "$PWD_WAGE_RATE" },
//                     count: { $sum: 1 }
//                 }
//             }
//         ]);
        
//         res.status(200).json({ success: true, result });
//     } catch (error) {
     
//         console.error(error);
//         res.status(500).json({ success: false, message: 'An error occurred while processing your request' });
    
//     }
};
