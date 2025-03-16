//------------Sidebar------------//

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

//------------Sidebar End------------//

// --------All Account Detail --------//
document.querySelectorAll(".status-toggle").forEach((toggle, index) => {
  toggle.addEventListener("change", function () {
    let row = this.closest("tr");
    let statusBadge = row.querySelector(".status-badge");
    let icon = statusBadge.querySelector("i");
    let isChecked = this.checked;

    let confirmChange = confirm(`Are you sure you want to ${isChecked ? "Activate" : "Deactivate"} this account?`);

    if (!confirmChange) {
      this.checked = !isChecked; // Reset if cancelled
      return;
    }

    // Adding smooth transition effect
    statusBadge.style.opacity = "0"; // Hide before changing
    setTimeout(() => {
      if (isChecked) {
        statusBadge.classList.remove("text-danger");
        statusBadge.classList.add("text-success");
        icon.classList.remove("fa-lock");
        icon.classList.add("fa-check-circle");
        statusBadge.innerHTML = '<i class="fas fa-check-circle"></i> Active';
      } else {
        statusBadge.classList.remove("text-success");
        statusBadge.classList.add("text-danger");
        icon.classList.remove("fa-check-circle");
        icon.classList.add("fa-lock");
        statusBadge.innerHTML = '<i class="fas fa-lock"></i> Deactive';
      }
      statusBadge.style.opacity = "1"; // Show smoothly
    }, 300);
  });
});


//----------All Accounts Eye Icons ---------//

document.querySelectorAll(".eye-icon").forEach(icon => {
// Set default to "fa-eye-slash"
icon.classList.remove("fa-eye");
icon.classList.add("fa-eye-slash");

icon.addEventListener("click", function () {
  let passwordField = this.previousElementSibling;

  if (passwordField.type === "password") {
      passwordField.type = "text";
      this.classList.remove("fa-eye-slash");
      this.classList.add("fa-eye"); // Show "eye" when visible
  } else {
      passwordField.type = "password";
      this.classList.remove("fa-eye");
      this.classList.add("fa-eye-slash"); // Hide password with "eye-slash"
  }
});
});

//----------All Accounts Eye Icons End---------//


// --------All Account Detail  End--------//

