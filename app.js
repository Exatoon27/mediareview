const lang = document.body.getAttribute("data-lang") || "es";
const messages = {
  "cassettePrompt": {
    "es": "Archivos cargados: {count}\nClick para guardar zip de guardados.",
    "en": "Files loaded: {count}\nClick to save zip of saved files."
  },
  "noFiles": {
    "es": "SIN ARCHIVOS CARGADOS",
    "en": "NO FILES UPLOADED"
  },
  "uploadPrompt": {
    "es": "INGRESA FOTOS/VIDEOS",
    "en": "UPLOAD PHOTOS/VIDEOS"
  },
  "noMoreFiles": {
    "es": "No hay más archivos!<br><br>Da click en el botón de abajo para<br>guardar los archivos seleccionados<br><br>¡Gracias por usar la herramienta!",
    "en": "No more files!<br><br>Click the button below to<br>save the selected files<br><br>Thank you for using the tool!"
  },
  "noMoreFilesAlert": {
    "es": "No hay más archivos!",
    "en": "No more files!"
  },
  "frameOnlyVideoAlert": {
    "es": "Esto solo funciona con videos.",
    "en": "This only works with videos."
  },
  "frameSavedAlert": {
    "es": "Fotograma guardado",
    "en": "Frame saved"
  },
}

let files = [];
let index = 0;
let saved = [];
let discarded = [];

const folderInput = document.getElementById("folderInput");
const viewer = document.getElementById("screen");
const cassette = document.getElementById("cassette");

folderInput.onclick = (e) => {
    if (folderInput.value) {
        e.preventDefault();
        saveZip();
        resetViewer();
    }
}

folderInput.addEventListener("change", (e) => {
  files = [...e.target.files].filter(f =>
    f.type.startsWith("image/") || f.type.startsWith("video/")
  );
  index = 0;
  cassette.innerText = messages.cassettePrompt[lang].replace("{count}", files.length);
  showFile();
});

function showFile() {
  viewer.innerHTML = "";

  if (!files[index]){
    alert(messages.noMoreFilesAlert[lang]);
    viewer.innerHTML = messages.noMoreFiles[lang];
    return;
  };

  const file = files[index];
  const url = URL.createObjectURL(file);

  if (file.type.startsWith("image/")) {
    const img = document.createElement("img");
    img.src = url;
    viewer.appendChild(img);

  } else {
    const video = document.createElement("video");
    video.src = url;
    video.controls = true;
    viewer.appendChild(video);
  }
}

document.getElementById("saveBtn").onclick = () => {
  saved.push(files[index]);
  index++;
  showFile();
};

document.getElementById("discardBtn").onclick = () => {
  discarded.push(files[index]);
  index++;
  showFile();
};

document.getElementById("frameBtn").onclick = () => {
  const file = files[index];
  if (!file.type.startsWith("video/")) return alert(messages.frameOnlyVideoAlert[lang]);

  const video = viewer.querySelector("video");
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  canvas.toBlob((blob) => {
    blob.name = file.name.replace(/\.\w+$/, "") + "_frame.jpg";
    saved.push(blob);
    alert(messages.frameSavedAlert[lang]);
  });
};

function resetViewer() {
    folderInput.value = null;
    files = [];
    index = 0;
    saved = [];
    discarded = [];
    viewer.innerHTML = messages.noFiles[lang];
    cassette.innerText = messages.uploadPrompt[lang];
}

async function saveZip () {
  const zip = new JSZip();
  const folder = zip.folder("saved");

  for (const file of saved) {
    const arrayBuffer = await file.arrayBuffer();
    folder.file(file.name || "image.jpg", arrayBuffer);
  }

  zip.generateAsync({ type: "blob" }).then((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "classified.zip";
    link.click();
  });
};

// Navegación con teclado
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") document.getElementById("saveBtn").click();
  if (e.key === "ArrowLeft") document.getElementById("discardBtn").click();
  if (e.key === "ArrowDown") document.getElementById("frameBtn").click();
});
