const AnnualLeave = require("../models/AnnualLeave");

const addAnnualLeaveEntitlement = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAnnualLeaveEntitlement = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAnnualLeaveEntitlement = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAnnualLeavePerEmployeePerYear = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addAnnualLeavePerServicePerYear = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAnnualLeavePerEmployeeAllTimes = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addAnnualLeavePerServiceAllTimes = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAnnualLeavePerEmployeePerYear = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const recordAnnualLeaveRequest = async (req, res) => {
  try {
    //this will go in anualLeaveSchema -> under annualLeaveTakenSchema
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAnnualLeaveRequest = async (req, res) => {
  try {
    //this will go in anualLeaveSchema -> under annualLeaveTakenSchema
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAnnualLeaveRequest = async (req, res) => {
  try {
    //this will go in anualLeaveSchema -> under annualLeaveTakenSchema
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAnnualLeaveRequests = async (req, res) => {
  try {
    //this will go in anualLeaveSchema -> under annualLeaveTakenSchema
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addAnnualLeaveEntitlement,
  updateAnnualLeaveEntitlement,
  deleteAnnualLeaveEntitlement,
  getAnnualLeavePerEmployeeAllTimes,
  getAnnualLeavePerEmployeePerYear,
  getAnnualLeaveRequests,
  recordAnnualLeaveRequest,
  addAnnualLeavePerServicePerYear,
  addAnnualLeavePerServiceAllTimes,
  updateAnnualLeaveRequest,
  deleteAnnualLeaveRequest,
};
