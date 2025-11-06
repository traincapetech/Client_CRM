import FileUploadIcon from "@mui/icons-material/FileUpload";
import GetAppIcon from "@mui/icons-material/GetApp";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import BorderStyleIcon from "@mui/icons-material/BorderStyle";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver"
import './NavbarSettingDropdown.css'

const NavbarSettingsDropdown = ({ data, setData, type = "leads", addLead, page }) => {
 const fieldsMap = {
    leads: ["Company", "Value", "Rating", "Stage"],
    customers: ["Name", "Email", "Phone", "Country", "Activities"],
    pipeline: ["Company", "Value", "Rating", "Stage"],
  };

  // Export function
  const handleExport = () => {
    let dataToExport = [];

    if (!data || (Array.isArray(data) && data.length === 0) || (typeof data === "object" && Object.keys(data).length === 0)) {
      alert("No data to export!");
      return;
    }

    if (type === "leads" || type === "pipeline") {
      Object.keys(data).forEach((col) => {
        if (Array.isArray(data[col]) && data[col].length > 0) {
          data[col].forEach((item) => dataToExport.push({ ...item, stage: col }));
        }
      });
    } else {
      dataToExport = Array.isArray(data) ? data : [];
    }

    if (!dataToExport || dataToExport.length === 0) {
      alert("No data to export!");
      return;
    }

    // Pick only the relevant fields
    const fields = fieldsMap[type] || Object.keys(dataToExport[0]);
    const finalData = dataToExport.map((item) => {
      const obj = {};
      fields.forEach((f) => {
        obj[f] = item[f.toLowerCase()] ?? item[f]; // map JS keys
      });
      return obj;
    });

    const worksheet = XLSX.utils.json_to_sheet(finalData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, page || "Data");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, `${page}_export.xlsx`);
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
    <div className="dropdown-menu-setting-container">
      {/* Import / Export / Other buttons */}
      <label className="dropdown-item-setting-icon">
        <FileUploadIcon /> Import
        <input type="file" accept=".xlsx, .xls, .csv" style={{ display: "none" }} onChange={handleImport} />
      </label>

      <div className="dropdown-item-setting-icon" onClick={handleExport}>
        <GetAppIcon /> Export
      </div>

      <div className="dropdown-item-setting-icon">
        <CameraAltIcon /> Import Business Card
      </div>

      <hr />

      <div className="dropdown-item-setting-icon">
        <BorderStyleIcon /> Spreadsheet
      </div>
    </div>
  );
};

export default NavbarSettingsDropdown;
