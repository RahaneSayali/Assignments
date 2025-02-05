import { Timesheet } from "../models/TimeSheetModel";
import { TimeSheetAttributes } from "../models/TimeSheetModel";
export const createTimeSheet = async (data: TimeSheetAttributes) => {
  try {
    const {
      employeeId,
      shiftId,
      projectName,
      taskName,
      fromDate,
      toDate,
      duration,
    } = data;

    const newTimesheet = await Timesheet.create({
      employeeId,
      shiftId,
      projectName,
      taskName,
      fromDate,
      toDate,
      duration,
    });
    return newTimesheet;
  } catch (error: any) {
    throw new Error("error creating timesheet" + error.message);
  }
};
