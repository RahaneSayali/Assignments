import ExcelJS from "exceljs";
import { Response } from "express";
import Employee from "../models/EmpModel";
import Timesheet from "../models/TimeSheetModel";
import Shift from "../models/ShiftModel";

export const generateReport = async (res: Response) => {
  try {
    const employees = await Employee.findAll({
      attributes: ["id", "name", "assignedShiftHours"],
    });
    console.log("employess", employees);

    const timesheets = await Timesheet.findAll({
      attributes: ["employeeId", "fromDate", "duration"],
    });

    const workLog: {
      [key: string]: {
        name: string;
        date: string;
        assignedHours: number;
        actualHours: number;
      };
    } = {};

    timesheets.forEach((timesheet) => {
      const { employeeId, fromDate, toDate, duration } = timesheet;

      const employee = employees.find(
        (emp) => String(emp.dataValues.id) === String(employeeId)
      );
      console.log("employes is ", employee);

      if (!employee) {
        console.log("No employee found for ID:", employeeId);
        return;
      }

      const entryDate = timesheet.fromDate.toISOString().split("T")[0]; //YYYY-MM-DDTHH:MM:SS.sssZ. to YYYY-MM-DD format

      console.log("date is", entryDate);

      const key = `${employeeId}-${entryDate}`;
      console.log("key is now ", key);

      if (!workLog[key]) {
        workLog[key] = {
          name: employee.name,
          date: entryDate,
          assignedHours: employee.assignedShiftHours,
          actualHours: 0,
        };
      }

      console.log("worklog is now ", workLog);

      workLog[key].actualHours += duration;
      console.log("worklog is final", workLog);
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Employee Work Report");

    worksheet.columns = [
      { header: "Employee Name", key: "name", width: 20 },
      { header: "Date", key: "date", width: 15 },
      { header: "Assigned Hours", key: "assignedHours", width: 20 },
      { header: "Actual Hours Worked", key: "actualHours", width: 20 },
      { header: "Difference", key: "difference", width: 15 },
    ];

    if (!workLog || Object.keys(workLog).length === 0) {
      return res.status(400).json({ error: "No work log data available" });
    }
    Object.values(workLog).forEach((record) => {
      worksheet.addRow({
        name: record.name,
        date: record.date,
        assignedHours: record.assignedHours,
        actualHours: record.actualHours,
        difference: record.actualHours - record.assignedHours,
      });
    });
    // res.setHeader(
    //   "Content-Type",
    //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    // );
    // res.setHeader(
    //   "Content-Disposition",
    //   'attachment; filename="work_report.xlsx"'
    // );

    await workbook.xlsx.writeFile("report.xlsx");

    res.end();
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Failed to generate report" });
  }
};
