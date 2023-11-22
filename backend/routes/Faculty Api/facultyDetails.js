const express = require("express");
const router = express.Router();
const facultyDetails = require("../../models/Faculty/FacultyDetails");

router.post("/getDetails", async (req, res) => {
  try {
    let user = await facultyDetails.find(req.body);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "No Faculty Found" });
    }
    const data = {
      success: true,
      message: "",
      user,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/addDetails", async (req, res) => {
  try {
    let user = await facultyDetails.findOne(req.body);
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Faculty With This EmployeeId Already Exists",
      });
    }
    user = await facultyDetails.create(req.body);
    const data = {
      success: true,
      message: "Faculty Details Added!",
      user,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/updateDetails/:id", async (req, res) => {
  try {
    let user = await facultyDetails.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No Faculty Found",
      });
    }
    const data = {
      success: true,
      message: "Updated Successfull!",
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/deleteDetails", async (req, res) => {
  try {
    const { employeeId } = req.body;

    // Check if faculty with the given employeeId exists
    const user = await facultyDetails.findOne({ employeeId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found with the provided EmployeeId",
      });
    }

    // Delete faculty details
    await facultyDetails.deleteOne({ employeeId });

    // Delete faculty authentication credentials
    await facultyAuth.deleteOne({ loginid: employeeId });

    const data = {
      success: true,
      message: "Faculty Details and Credentials Deleted!",
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "deleted" });
  }
});


router.get("/count", async (req, res) => {
  try {
    let user = await facultyDetails.count(req.body);
    const data = {
      success: true,
      message: "Count Successfull!",
      user,
    };
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
});



module.exports = router;
