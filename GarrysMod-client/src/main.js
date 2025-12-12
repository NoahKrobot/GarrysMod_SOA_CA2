import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import axios from "axios";
import https from "https";

let mainWindow;

const agent = new https.Agent({ rejectUnauthorized: false });
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

ipcMain.handle("fetch-data", async (event, args) => {
  try {
    const response = await axios.get("https://localhost:7102/api/Creators", {
      httpsAgent: agent,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
});

ipcMain.handle("login", async (event, { username, password }) => {
  try {
    const response = await axios.get("https://localhost:7102/api/Creators", {
      httpsAgent: agent,
    });
    const user = response.data.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // event.reply("login-response", { success: true, user });
      // mainWindow.loadFile(path.join(__dirname, "../renderer/workshop.html"))
      return { success: true, user };
    } else {
      // event.reply("login-response", {
      //   success: false,
      //   error: "Invalid credentials",
      // })
      return { success: false, error: "Invalid credentials" };
    }
  } catch (e) {
    event.reply("login-response", { success: false, error: String(e) });
  }
});

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("fetch-addons", async (event, args) => {
  try {
    const response = await axios.get("https://localhost:7102/api/GarrysItems", {
      httpsAgent: agent,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
});

ipcMain.handle("fetch-categories", async (event, args) => {
  try {
    const response = await axios.get("https://localhost:7102/api/Categories", {
      httpsAgent: agent,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
});

ipcMain.handle("fetch-maps", async (event, args) => {
  try {
    const response = await axios.get("https://localhost:7102/api/Maps", {
      httpsAgent: agent,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
});

ipcMain.handle("post-garrysItem", async (event, args) => {
  try {
    const response = await axios.post(
      "https://localhost:7102/api/GarrysItems",
      args,
      {
        httpsAgent: agent,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
});

ipcMain.handle("post-map", async (event, args) => {
  try {
    const response = await axios.post("https://localhost:7102/api/Maps", args, {
      httpsAgent: agent,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
});

ipcMain.handle("post-category", async (event, args) => {
  try {
    const response = await axios.post(
      "https://localhost:7102/api/Categories",
      args,
      {
        httpsAgent: agent,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
});

ipcMain.handle("delete-creator", async (event, id) => {
  try {
    const response = await axios.delete(
      `https://localhost:7102/api/Creators/${id}`,
      {
        httpsAgent: agent,
      }
    );

    if (response.status === 204) {
      return { success: true };
    }


    //the response might be 200 as well 
    return { success: true, data: response.data };

  } catch (error) {
    console.error("Error deleting creator:", error);
    return { success: false, error: String(error) };
  }
});


ipcMain.handle("toggle-creator-admin-state", async (event, creator) => {
  try {
    const response = await axios.put(
      `https://localhost:7102/api/Creators/${creator.id}`,
      creator, 
      { httpsAgent: agent }
    );

    return response.data;

  } catch (error) {
    console.error("Error updating creator:", error);
    return { success: false, error: String(error) };
  }
});




