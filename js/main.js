/* jshint esversion: 6 */
(function () {
  "use strict";

  // ===== DOM Ready =====
  document.addEventListener("DOMContentLoaded", function () {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initHeroSearch();
    initServiceFilters();
    initBookingForm();
  });

  // ===== Navbar Scroll Effect =====
  function initNavbar() {
    var navbar = document.querySelector(".navbar");
    if (!navbar) return;
    window.addEventListener("scroll", function () {
      navbar.classList.toggle("scrolled", window.scrollY > 10);
    });
  }

  // ===== Mobile Menu Toggle =====
  function initMobileMenu() {
    var hamburger = document.querySelector(".hamburger");
    var navLinks = document.querySelector(".nav-links");
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
      var expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!expanded));
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu on outside click
    document.addEventListener("click", function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ===== Smooth Scrolling =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var targetId = this.getAttribute("href");
        if (targetId === "#") return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var offset = 80;
          var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: "smooth" });
        }
      });
    });
  }

  // ===== Scroll Animations =====
  function initScrollAnimations() {
    var elements = document.querySelectorAll(".fade-in");
    if (!elements.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ===== Hero Search =====
  function initHeroSearch() {
    var form = document.querySelector(".hero-search");
    if (!form) return;

    var input = form.querySelector("input");
    var button = form.querySelector("button");
    if (!input || !button) return;

    function performSearch() {
      var query = input.value.trim().toLowerCase();
      if (!query) {
        input.focus();
        return;
      }
      // Navigate to services page with search query
      window.location.href = "services.html?search=" + encodeURIComponent(query);
    }

    button.addEventListener("click", function (e) {
      e.preventDefault();
      performSearch();
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        performSearch();
      }
    });
  }

  // ===== Service Filters (services.html) =====
  function initServiceFilters() {
    var filterBtns = document.querySelectorAll(".filter-btn");
    var serviceCards = document.querySelectorAll(".service-card");
    if (!filterBtns.length || !serviceCards.length) return;

    // Check URL for search query
    var params = new URLSearchParams(window.location.search);
    var searchQuery = params.get("search");
    if (searchQuery) {
      filterBySearch(searchQuery, serviceCards);
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var category = btn.getAttribute("data-filter");

        serviceCards.forEach(function (card) {
          var cardCategory = card.getAttribute("data-category");
          if (category === "all" || cardCategory === category) {
            card.style.display = "";
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            requestAnimationFrame(function () {
              card.style.transition = "opacity .4s ease, transform .4s ease";
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            });
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  function filterBySearch(query, cards) {
    query = query.toLowerCase();
    cards.forEach(function (card) {
      var text = card.textContent.toLowerCase();
      card.style.display = text.indexOf(query) !== -1 ? "" : "none";
    });
  }

  // ===== Booking Form =====
  function initBookingForm() {
    var form = document.getElementById("bookingForm");
    if (!form) return;

    var summaryService = document.getElementById("summaryService");
    var summaryDate = document.getElementById("summaryDate");
    var summaryTime = document.getElementById("summaryTime");
    var summaryPrice = document.getElementById("summaryPrice");
    var summaryEmergency = document.getElementById("summaryEmergency");
    var summaryTotal = document.getElementById("summaryTotal");

    var serviceSelect = form.querySelector("#service");
    var dateInput = form.querySelector("#date");
    var timeInput = form.querySelector("#time");
    var emergencyToggle = form.querySelector("#emergency");

    // Set minimum date to today
    if (dateInput) {
      var today = new Date().toISOString().split("T")[0];
      dateInput.setAttribute("min", today);
    }

    var servicePrices = {
      electrician: 4000,
      plumber: 5000,
      carpenter: 5500,
      painter: 6500,
      ac_repair: 7500,
      mechanic: 5500,
      appliance: 5000,
      locksmith: 4000
    };

    function formatINR(amount) {
      return "\u20B9" + amount.toLocaleString("en-IN");
    }

    // Pre-fill service from URL
    var params = new URLSearchParams(window.location.search);
    var preService = params.get("service");
    if (preService && serviceSelect) {
      serviceSelect.value = preService;
      updateSummary();
    }

    function updateSummary() {
      if (!summaryService) return;
      var service = serviceSelect ? serviceSelect.value : "";
      var date = dateInput ? dateInput.value : "";
      var time = timeInput ? timeInput.value : "";
      var isEmergency = emergencyToggle ? emergencyToggle.checked : false;

      summaryService.textContent = service
        ? serviceSelect.options[serviceSelect.selectedIndex].text
        : "Not selected";
      if (date) {
        var parts = date.split("-");
        var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        summaryDate.textContent = d.toLocaleDateString("en-IN", {
          weekday: "short",
          month: "short",
          day: "numeric"
        });
      } else {
        summaryDate.textContent = "Not selected";
      }
      summaryTime.textContent = time || "Not selected";

      var price = servicePrices[service] || 0;
      summaryPrice.textContent = price ? formatINR(price) : "\u20B90";

      var emergencyFee = isEmergency ? 2000 : 0;
      summaryEmergency.textContent = emergencyFee ? "+" + formatINR(emergencyFee) : "\u20B90";

      var total = price + emergencyFee;
      summaryTotal.textContent = formatINR(total);
    }

    if (serviceSelect) serviceSelect.addEventListener("change", updateSummary);
    if (dateInput) dateInput.addEventListener("change", updateSummary);
    if (timeInput) timeInput.addEventListener("change", updateSummary);
    if (emergencyToggle) emergencyToggle.addEventListener("change", updateSummary);

    // Validation
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (validateForm(form)) {
        saveBooking(form);
        showModal();
      }
    });

    // Also handle the sidebar confirm button
    var confirmBtn = document.getElementById("confirmBooking");
    if (confirmBtn) {
      confirmBtn.addEventListener("click", function () {
        if (validateForm(form)) {
          saveBooking(form);
          showModal();
        }
      });
    }
  }

  function saveBooking(form) {
    var booking = {
      service: form.querySelector("#service").value,
      date: form.querySelector("#date").value,
      time: form.querySelector("#time").value,
      address: form.querySelector("#address").value,
      description: form.querySelector("#description").value,
      name: form.querySelector("#name").value,
      phone: form.querySelector("#phone").value,
      email: form.querySelector("#email").value,
      emergency: form.querySelector("#emergency").checked,
      bookedAt: new Date().toISOString()
    };

    var bookings = [];
    try {
      bookings = JSON.parse(localStorage.getItem("quickfix_bookings")) || [];
    } catch (e) {
      bookings = [];
    }
    bookings.push(booking);
    localStorage.setItem("quickfix_bookings", JSON.stringify(bookings));
  }

  function validateForm(form) {
    var isValid = true;
    var requiredFields = form.querySelectorAll("[required]");

    requiredFields.forEach(function (field) {
      clearError(field);

      if (!field.value.trim()) {
        showError(field, "This field is required");
        isValid = false;
      } else if (field.type === "email" && !isValidEmail(field.value)) {
        showError(field, "Please enter a valid email address");
        isValid = false;
      } else if (field.type === "tel" && !isValidPhone(field.value)) {
        showError(field, "Please enter a valid phone number");
        isValid = false;
      }
    });

    if (!isValid) {
      var firstError = form.querySelector(".form-control.error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        firstError.focus();
      }
    }
    return isValid;
  }

  function showError(field, message) {
    field.classList.add("error");
    var errorEl = field.nextElementSibling;
    if (errorEl && errorEl.classList.contains("error-message")) {
      errorEl.textContent = message;
      errorEl.style.display = "block";
    }
  }

  function clearError(field) {
    field.classList.remove("error");
    var errorEl = field.nextElementSibling;
    if (errorEl && errorEl.classList.contains("error-message")) {
      errorEl.style.display = "none";
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^[\d\s\-+()]{7,}$/.test(phone);
  }

  // ===== Confirmation Modal =====
  function showModal() {
    var overlay = document.getElementById("confirmationModal");
    if (!overlay) return;
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";

    var closeBtn = overlay.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeModal();
    });
  }

  function closeModal() {
    var overlay = document.getElementById("confirmationModal");
    if (!overlay) return;
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
})();
