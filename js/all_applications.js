function toggleSidebar() {
    let sidebar = document.getElementById('sidebar');
    let content = document.getElementById('content');
    let isSmallScreen = window.innerWidth <= 992;

    if (isSmallScreen) {
      sidebar.classList.toggle('show');
    } else {
      sidebar.classList.toggle('hidden');
      content.classList.toggle('shifted');
    }
  }

  window.addEventListener("resize", function () {
    let sidebar = document.getElementById('sidebar');
    let content = document.getElementById('content');

    if (window.innerWidth > 992) {
      sidebar.classList.remove('show');
      sidebar.classList.remove('hidden');
      content.classList.remove('shifted');
    } else {
      sidebar.classList.add('hidden');
    }
  });



// ------- For Exporting Data----- //

  document.getElementById('checkAllBtn').addEventListener('click', function () {
    let checkboxes = document.querySelectorAll('.column-checkbox');
    let allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
    checkboxes.forEach(checkbox => checkbox.checked = !allChecked);
    this.innerText = allChecked ? "Check All" : "Uncheck All";
});

document.getElementById('exportData').addEventListener('click', function () {
    let checkedBoxes = document.querySelectorAll('.column-checkbox:checked');
    if (checkedBoxes.length === 0) {
        alert("Please select at least one column to export.");
        return;
    }
    document.getElementById("exportToast").style.display = "block";
});

function exportFile(format) {
    let checkedBoxes = document.querySelectorAll('.column-checkbox:checked');
    if (checkedBoxes.length === 0) {
        alert("Please select at least one column to export.");
        hideToast();
        return;
    }

    let allHeaders = Array.from(document.querySelectorAll("thead th")).map(th => th.innerText.trim());
    let selectedColumns = [];
    let columnIndexes = [];

    checkedBoxes.forEach(checkbox => {
        let columnName = checkbox.value.trim();
        let index = allHeaders.indexOf(columnName);
        if (index !== -1) {
            selectedColumns.push(columnName);
            columnIndexes.push(index);
        }
    });

    if (selectedColumns.length === 0) {
        alert("Error: Could not match selected columns with table headers.");
        return;
    }

    let tableRows = document.querySelectorAll("#tableBody tr");
    let selectedRows = [];

    tableRows.forEach(row => {
        let cells = Array.from(row.cells);
        let rowData = columnIndexes.map(index => (cells[index] ? cells[index].innerText.trim() : ""));
        selectedRows.push(rowData);
    });

    if (format === "excel") {
        exportToExcel(selectedColumns, selectedRows);
    } else if (format === "pdf") {
        exportToPDF(selectedColumns, selectedRows);
    }

    hideToast();
}

function exportToExcel(headers, rows) {
    let ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Exported Data");

    XLSX.writeFile(wb, "exported_data.xlsx");
}

function exportToPDF(headers, rows) {
    const { jsPDF } = window.jspdf;
    let pdf = new jsPDF('landscape');
    pdf.setFontSize(12);
    pdf.text("Exported Data", 10, 10);

    pdf.autoTable({
        head: [headers],
        body: rows,
        startY: 20,
        theme: 'striped',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [110, 71, 44] } // Brown header color (#6e472c)
    });

    pdf.save("exported_data.pdf");
}

function hideToast() {
    document.getElementById("exportToast").style.display = "none";
}