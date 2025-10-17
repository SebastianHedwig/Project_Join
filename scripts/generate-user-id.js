function generateUserId(name) {
    const parts = name.trim().split(" ").filter(Boolean);
    let initials = parts.map(p => p.charAt(0).toUpperCase()).slice(0,2).join("");
    const randomNumbers = Math.floor(100 + Math.random() * 900);
    return `${initials}${randomNumbers}`;
}

function registerUser() {
  const name = document.getElementById("name").value.trim();
  if (!validateNameInput(name)) return; // bricht ab, wenn ungültig

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const newUser = {
    id: generateUserId(name),
    name,
    email,
    password
  };

  users.push(newUser);
  console.log("Registriert:", newUser);
}