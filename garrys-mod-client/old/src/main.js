import { app, BrowserWindow } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import axios from "axios";
import { ipcMain } from "electron";
import https from "https";
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
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
  // mainWindow.webContents.openDevTools();
};


// *********** IPC

const agent = new https.Agent({
  rejectUnauthorized: false, // <- skip TLS verification
});

ipcMain.on("fetch-data", async (event, args) => {
  try {
    const response = await axios.get("https://localhost:7102/api/Creators", {
      httpsAgent: agent,
    });

    event.reply("fetch-data-response", response.data);
  } catch (error) {
    console.error(error);
  }
});

ipcMain.on("login", async (event, { username, password }) => {
  let success = false;

  console.log("log-in-step entered");
  try {
    const response = await axios.get("https://localhost:7102/api/Creators", {
      httpsAgent: agent,
    });

    let creators = response.data;
    console.log("users: ", creators);

    let userToBeFound = creators.find(
      (user) => user.username === username && user.password === password
    );

    if (userToBeFound) {
      success = true;
      console.log("Log in SUCCESS. User is: ", { username });

      let loggedUserDetails = {
        id: userToBeFound.id,
        username: userToBeFound.username,
        isAdmin: userToBeFound.isAdmin,
      };

      // sessionStorage.setItem("loggedInUser", JSON.stringify(loggedUser));
      event.reply("login-succes-storage", loggedUserDetails);

      ipcMain.emit("routing", event, { success: true, route: "WORKSHOP" });
    } else {
      console.log("Log in FAILURE. User is: ", { username });
    }
  } catch (error) {
    console.error(error);
  }

  // event.reply("login-result", { success: success });
});

ipcMain.on("routing", async (event, { success, route }) => {
  if (success && route) {
    if (route == "WORKSHOP") {
      console.log("Routing to workshop page...");
      mainWindow.loadFile(
        path.join(__dirname, `../../components/html/workshop.html`)
      );
    }
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
