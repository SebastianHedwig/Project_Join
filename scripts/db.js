const usersURL = "https://join-25a0e-default-rtdb.europe-west1.firebasedatabase.app/users.json"

let users = [];

async function getData() {
  try {
    const response = await fetch(usersURL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    // console.log("Fetched users:", result);

    if (!result) {
      console.warn("No users found in database.");
      return;
    }

    Object.values(result).forEach(user => users.push(user));

    // console.log("Users array:", users);

  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
  // console.log(users);
  
}