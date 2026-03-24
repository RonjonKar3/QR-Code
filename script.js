const qrMode = document.getElementById("qrMode");
const generalInputGroup = document.getElementById("generalInputGroup");
const wifiInputs = document.getElementById("wifiInputs");
const mainInput = document.getElementById("mainInput");

const qrcodeContainer = document.getElementById("qrcode");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");

// Toggle between Text and WiFi mode
qrMode.addEventListener("change", () => {
  if (qrMode.value === "wifi") {
    generalInputGroup.style.display = "none";
    wifiInputs.style.display = "block";
  } else {
    generalInputGroup.style.display = "block";
    wifiInputs.style.display = "none";
  }
});

generateBtn.addEventListener("click", () => {
  let finalData = "";

  if (qrMode.value === "wifi") {
    const ssid = document.getElementById("ssid").value;
    const pass = document.getElementById("password").value;
    const type = document.getElementById("encryption").value;
    if (!ssid) return alert("Please enter SSID");
    finalData = `WIFI:S:${ssid};T:${type};P:${pass};;`;
  } else {
    finalData = mainInput.value;
    if (!finalData) return alert("Please enter some text or a URL");
  }

  // Clear and Generate
  qrcodeContainer.innerHTML = "";
  new QRCode(qrcodeContainer, {
    text: finalData,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  setTimeout(() => {
    downloadBtn.style.display = "block";
  }, 200);
});

downloadBtn.addEventListener("click", () => {
  const canvas = qrcodeContainer.querySelector("canvas");
  if (!canvas) return;

  const tempCanvas = document.createElement("canvas");
  const ctx = tempCanvas.getContext("2d");
  const padding = 40;

  tempCanvas.width = canvas.width + padding;
  tempCanvas.height = canvas.height + padding;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
  ctx.drawImage(canvas, padding / 2, padding / 2);

  const link = document.createElement("a");
  link.href = tempCanvas.toDataURL("image/png");
  link.download = `Qrcode.png`;
  link.click();
});
