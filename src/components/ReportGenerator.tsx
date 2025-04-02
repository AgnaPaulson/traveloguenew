
import React, { useState } from "react";
import { Download, Clipboard, Printer, FilePlus2 } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ReportType = "destinations" | "hotels" | "expenses" | "full";

interface ReportGeneratorProps {
  className?: string;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ className }) => {
  const [reportType, setReportType] = useState<ReportType>("destinations");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generateReport = () => {
    setIsGenerating(true);
    
    // Simulate report generation delay
    setTimeout(() => {
      setIsGenerating(false);
      toast.success(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated successfully!`);
    }, 1500);
  };
  
  const copyToClipboard = () => {
    toast.success("Report copied to clipboard!");
  };
  
  const downloadReport = () => {
    toast.success("Report downloaded!");
  };
  
  const printReport = () => {
    toast.success("Sending to printer...");
  };
  
  return (
    <div className={`mb-6 ${className || ""}`}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <FilePlus2 className="h-4 w-4" />
            Generate Report
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate Travel Report</DialogTitle>
            <DialogDescription>
              Create a detailed report of your travel data.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Report Type</h4>
              <div className="grid grid-cols-2 gap-2">
                {(["destinations", "hotels", "expenses", "full"] as ReportType[]).map((type) => (
                  <Button
                    key={type}
                    variant={reportType === type ? "default" : "outline"}
                    onClick={() => setReportType(type)}
                    className="capitalize"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="border rounded-md p-4 bg-muted/50">
              <h4 className="font-medium mb-2">Report Preview</h4>
              <p className="text-sm text-muted-foreground">
                {reportType === "destinations" && "List of all saved destinations with visit data"}
                {reportType === "hotels" && "Summary of hotels and accommodation options"}
                {reportType === "expenses" && "Breakdown of all travel expenses by category"}
                {reportType === "full" && "Comprehensive travel report with all data included"}
              </p>
            </div>
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <div className="flex gap-2 mr-auto">
              <Button 
                size="icon" 
                variant="outline"
                onClick={copyToClipboard}
                title="Copy to clipboard"
              >
                <Clipboard className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="outline"
                onClick={downloadReport}
                title="Download report"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="outline"
                onClick={printReport}
                title="Print report"
              >
                <Printer className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={generateReport} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate Report"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportGenerator;
