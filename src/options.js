// Get the form elements
let optionsForm = document.getElementById("options-form");
let basePathInput = document.getElementById("base-path");
let enabledInput = document.getElementById("enabled");

// Load any saved base path and enabled status from Chrome storage
chrome.storage.sync.get(["basePath", "enabled"], (data) => {
  basePathInput.value = data.basePath || "";
  enabledInput.checked = data.enabled || false;
});

// Save the base path and enabled status to Chrome storage when the form is submitted
optionsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  chrome.storage.sync.set({
    basePath: basePathInput.value,
    enabled: enabledInput.checked,
  });
});
