/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

// import './index.css';



const { ipcRenderer } = require('electron');


const responseElement = document.getElementById('response');

const loginForm = document.getElementById("loginForm");
const loginResponse = document.getElementById("loginResponse");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  ipcRenderer.send("login", { username, password });
});




//responses

ipcRenderer.on('fetch-data-response', (event, data) => {
   responseElement.innerHTML = JSON.stringify(data);
});

ipcRenderer.send('fetch-data'); 


ipcRenderer.on('login-response', (event, {success}) => {
  if(!success){
      message.textContext = "Login Failed. Check Username or Password"
  }
});


ipcRenderer.on('login-succes-storage', (event, {loggedUserDetails}) => {
  if(!loggedUserDetails){
      localStorage.setItem("loggedUserDetails", JSON.stringify(loggedUserDetails))
  }
});



