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