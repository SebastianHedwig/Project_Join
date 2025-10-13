
const databaseURL = "https://join-25a0e-default-rtdb.europe-west1.firebasedatabase.app/.json";

let users = [];
let tasks = [];

async function getData() {
  try {
    const response = await fetch(databaseURL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data);

    // Prüfen, ob users und tasks existieren
    if (data.users) {
      users = Object.entries(data.users).map(([id, u]) => ({ id, ...u }));
    }

    if (data.tasks) {
      tasks = Object.entries(data.tasks).map(([id, t]) => ({ id, ...t }));
    }

    console.log("Users array:", users);
    console.log("Tasks array:", tasks);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}