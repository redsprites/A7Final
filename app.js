const express = require('express');
const app = express();
const cors = require('cors');
const { connect } = require('./lib/mongo.js');
const cookieParser = require('cookie-parser');

// Import routes
const authRoutes = require('./routes/api/auth.js');
const userRoutes = require('./routes/api/users.js');
const blogRoutes = require('./routes/api/blogs.js');
const companyRouts = require('./routes/api/companies.js');
const commentRoutes = require('./routes/api/comments.js');


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/public', express.static('public'));
app.use('/assets', express.static('assets'));

const port = 8080;
(async () => {
  const { User, Blog, Comment, PW_2023_Q2 } = await connect();
   // Use routes
  app.use('/api/auth', (req,  res, next) =>{
    req.models = { User};
   next();}, authRoutes);
  app.use('/api/users', (req, res, next) =>{
    req.models = { User};
   next();}, userRoutes);
  app.use('/api/blogs', (req,  res, next) => {
    req.models = { Blog, User };
    next(); }, blogRoutes);
  // app.use('/api/companies', (req, res, next) => {
  //   console.log("app called")
  //     req.models = { PW_2023_Q2 };
  //     next();
  // }, companyRouts);
  app.use('/api/companies', (req, res, next) => {
    console.log("app called")
    // console.log(req.params.jobTitle);
    req.models = { PW_2023_Q2 };
    next();
}, companyRouts());

  app.use('/api/comments', commentRoutes);
  app.listen(port, () => {
    console.log('Server started on port', port);
  });
    // console.log(PW_2023_Q2.countDocuments());
    // async function fetchCompanies() {
    //   try {
    //     const cursor = PW_2023_Q2.find({}).limit(100).cursor();
    //     // for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    //     //   console.log(doc);
    //     // }
        
    //     const cursor2 = PW_2023_Q2.find({ EMPLOYER_LEGAL_BUSINESS_NAME: 'Qualcomm Technologies, Inc.'}).cursor();
    //     for (let doc = await cursor2.next(); doc != null; doc = await cursor2.next()) {
    //       console.log(doc);
    //     }
    //   } catch(err) {
    //     console.log(err);
    //   }
    // }
    // async function fetchCompanies() {
    //   try {
    //     let i = 0;
    //     while (true) {
    //       const companies = await PW_2023_Q2.find({}).skip(i).limit(100);
    //       if (companies.length === 0) {
    //         break;
    //       }
    //       for (let j = 0; j < companies.length; j++) {
    //         console.log(companies[j]);
    //       }
    //       i += 100;
    //     }
    //   } catch(err) {
    //     console.log(err);
    //   }
    // }
    
    // fetchCompanies();
    
  //   const jobTitleQuery = async (jobTitle) => {
     
  //     try {
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
  
  //         console.log(result);
  
  //         return result;
  //     } catch (error) {
  //         console.error(error);
  //         return null;
  //     }
  // };
  // jobTitleQuery("SOFTWARE ENGINEER");


    
})();