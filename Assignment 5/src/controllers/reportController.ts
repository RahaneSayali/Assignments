import { Request, Response } from "express";
import { generateReport } from "../services/ReportService";

export const getWorkReport = async (req: Request, res: Response) => {
  try {
    await generateReport(res);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Failed to generate report" });
  }
};
