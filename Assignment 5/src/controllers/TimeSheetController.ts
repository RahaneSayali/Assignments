import { Request, Response } from "express";
import { createTimeSheet } from "../services/TimeSheetService";
import { Timesheet } from "../models/TimeSheetModel";
import Shift from "../models/ShiftModel";

export const createTimesheetController = async (
  req: Request,
  res: Response
) => {
  try {
    const { projectName, taskName, fromDate, toDate, duration }: Timesheet =
      req.body;
    const employeeId = (req as any).employee.id;
    if (!employeeId) {
      res.status(400).json({ error: "Employee not authenticated" });
      return;
    }

    const ongoingShift = await Shift.findOne({
      where: { employeeId, endTime: null },
    });
    if (!ongoingShift) {
      res
        .status(400)
        .json({ error: "No active shift found for this employee" });
      return;
    }
    const newTimesheet = await createTimeSheet({
      employeeId,
      shiftId: ongoingShift.id,
      projectName,
      taskName,
      fromDate,
      toDate,
      duration,
    });
    res.status(201).json({
      message: "Timesheet entry created successfully",
      timesheet: newTimesheet,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};
