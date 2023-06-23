// Add a button next to each file in the "Files Changed" tab

const buttonClassName = "open-in-vscode-button";

const getFromStorage = (key) => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, (data) => {
      resolve(data[key]);
    });
  });
};

const openFileInVSCode = async () => {
  const enabled = await getFromStorage("enabled");
  const basePath = await getFromStorage("basePath");

  if (!enabled) return;

  setInterval(() => {
    const fileHeaders = document.querySelectorAll(".file-header");
    fileHeaders.forEach((header) => {
      if (header.querySelector(`.${buttonClassName}`)) return;

      let btn = document.createElement("button");
      btn.style.padding = "4px 6px";
      btn.style.borderRadius = "4px";
      btn.style.backgroundColor = "#0366d6";
      btn.style.color = "white";
      btn.style.border = "none";
      btn.style.cursor = "pointer";
      btn.style.fontSize = "14px";
      btn.style.outline = "none";

      btn.textContent = "Open in VSCode";
      btn.className = buttonClassName;
      btn.addEventListener("click", async () => {
        let filePath = header.querySelector(".file-info a").getAttribute("title");

        let urlParts = window.location.pathname.split("/");
        let orgName = urlParts[1];
        let repoName = urlParts[2];

        filePath = `${orgName}/${repoName}/${filePath}`;

        let fullPath = `${basePath}/${filePath}`;

        window.open(`vscode://file/${fullPath}`, "_blank");
      });
      header.appendChild(btn);
    });
  }, 1000);
};

openFileInVSCode();
