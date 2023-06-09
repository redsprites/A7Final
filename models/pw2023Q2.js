const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  CASE_NUMBER: String,
  CASE_STATUS: String,
  RECEIVED_DATE: Date,
  DETERMINATION_DATE: Date,
  REDETERMINATION_DATE: Date,
  VISA_CLASS: String,
  EMPLOYER_POC_LAST_NAME: String,
  EMPLOYER_POC_FIRST_NAME: String,
  EMPLOYER_POC_JOB_TITLE: String,
  EMPLOYER_POC_ADDRESS1: String,
  EMPLOYER_POC_CITY: String,
  EMPLOYER_POC_STATE: String,
  EMPLOYER_POC_POSTAL_CODE: Number,
  EMPLOYER_POC_COUNTRY: String,
  EMPLOYER_POC_PHONE: String,
  EMPLOYER_POC_EMAIL: String,
  EMPLOYER_LEGAL_BUSINESS_NAME: String,
  EMPLOYER_ADDRESS_1: String,
  EMPLOYER_CITY: String,
  EMPLOYER_STATE: String,
  EMPLOYER_POSTAL_CODE: Number,
  EMPLOYER_COUNTRY: String,
  EMPLOYER_PHONE: String,
  NAICS_CODE: Number,
  JOB_TITLE: String,
  SUPERVISE_OTHER_EMP: String,
  REQUIRED_EDUCATION_LEVEL: String,
  REQUIRED_EDUCATION_MAJOR: String,
  REQUIRED_EXPERIENCE: String,
  REQUIRED_EXPERIENCE_MONTHS: Number,
  REQUIRED_OCCUPATION: String,
  SPECIAL_SKILLS_REQUIREMENTS: String,
  SPEC_REQ_OTHER: String,
  ALTERNATIVE_REQUIREMENTS: String,
  SUGGESTED_SOC_CODE: String,
  SUGGESTED_SOC_TITLE: String,
  SUPERVISOR_JOB_TITLE: String,
  PRIMARY_WORKSITE_ADDRESS_1: String,
  PRIMARY_WORKSITE_CITY: String,
  PRIMARY_WORKSITE_STATE: String,
  PRIMARY_WORKSITE_POSTAL_CODE: Number,
  PWD_SOC_CODE: String,
  PWD_SOC_TITLE: String,
  O_NET_CODE: String,
  O_NET_TITLE: String,
  PWD_WAGE_RATE: String,
  PWD_UNIT_OF_PAY: String,
  PWD_OES_WAGE_LEVEL: String,
  BLS_AREA: String,
  WAGE_DET_NOTES: String,
  PREVAIL_WAGE_DETERM_DATE: Date,
  PWD_WAGE_EXPIRATION_DATE: Date
});

// const Record = mongoose.model('Record', recordSchema);


module.exports = recordSchema;
