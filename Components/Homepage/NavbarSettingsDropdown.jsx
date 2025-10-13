import FileUploadIcon from "@mui/icons-material/FileUpload";
import GetAppIcon from "@mui/icons-material/GetApp";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import BorderStyleIcon from "@mui/icons-material/BorderStyle";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const NavbarSettingsDropdown = ({ data, setData, type = "leads", addLead, page }) => {
  const fieldsMap = {
    Customers: ["Name", "Email", "Phone", "Country", "Activities"],
    Pipeline: ["Stage", "Probability", "Expected Revenue", "Expected Closing"],
    SalesTeam: ["Name", "Role", "Team", "Contact"],
  };

  const fields = fieldsMap[page] || [];

  // Export data to Excel
  const handleExport = () => {
    let dataToExport = [];
    if (type === "leads") {
      Object.keys(data).forEach((col) => {
        data[col].forEach((item) => dataToExport.push({ ...item, stage: col }));
      });
    } else {
      dataToExport = data;
    }

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, type === "leads" ? "Leads" : "Data");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${type}_export.xlsx`);
  };

  // Import data from Excel
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const importedData = XLSX.utils.sheet_to_json(worksheet);

      if (type === "leads" && addLead) {
        importedData.forEach((lead) => {
          const targetCol = lead.stage || "new";
          addLead(targetCol, lead);
        });
      } else if (setData) {
        setData(importedData);
      }

      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} imported successfully!`);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="dropdown-menu-setting">
      {/* Import / Export / Other buttons */}
      <label className="dropdown-item">
        <FileUploadIcon /> Import
        <input type="file" accept=".xlsx, .xls, .csv" style={{ display: "none" }} onChange={handleImport} />
      </label>

      <div className="dropdown-item" onClick={handleExport}>
        <GetAppIcon /> Export
      </div>

      <div className="dropdown-item">
        <CameraAltIcon /> Import Business Card
      </div>

      <hr />

      <div className="dropdown-item">
        <BorderStyleIcon /> Spreadsheet
      </div>

      {/* Field checkboxes */}
      {/* {fields.length > 0 && (
        <>
          <hr />
          {fields.map((field, idx) => (
            <div key={idx} className="dropdown-item">
              <label>
                <input type="checkbox" /> {field}
              </label>
            </div>
          ))}
        </>
      )} */}
    </div>
  );
};

export default NavbarSettingsDropdown;
