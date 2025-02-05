import Employee from "./EmpModel";
import Shift from "./ShiftModel";
import Timesheet from "./TimeSheetModel";

const defineAssociations = () => {
  Timesheet.belongsTo(Employee, {
    foreignKey: "employeeId",
    as: "employee",
  });
  Timesheet.belongsTo(Shift, {
    foreignKey: "shiftId",
    as: "shift",
  });
  Shift.hasMany(Timesheet, {
    foreignKey: "shiftId",
    as: "timesheets",
  });
};

export default defineAssociations;
