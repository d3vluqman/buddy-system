function pairMembers(members) {
  // Shuffle the array to ensure randomness
  for (let i = members.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [members[i], members[j]] = [members[j], members[i]];
  }

  // Create pairs
  const pairs = [];
  for (let i = 0; i < members.length - 1; i += 2) {
    pairs.push([members[i], members[i + 1]]);
  }

  // Handle odd number of members
  if (members.length % 2 !== 0) {
    const lastPair = pairs[pairs.length - 1];
    lastPair.push(members[members.length - 1]);
  }

  return pairs;
}

document.getElementById("generateButton").addEventListener("click", async () => {
  const inputs = { 
    file: document.getElementById("fileInput"), 
    members: document.getElementById("membersInput") 
  };
  const input = inputs.file.getAttribute("disabled") ?
    document.getElementById("membersInput").value.trim()
    : inputs.members.getAttribute("disabled") ?
    await document.getElementById("fileInput").files[0].text()
    : null;
  const outputDiv = document.getElementById("output");

  if (!input) {
    outputDiv.innerHTML =
      "<p style='color: red;'>Please enter at least two names!</p>";
    return;
  }

  const members = input
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name);
  if (members.length < 2) {
    outputDiv.innerHTML =
      "<p style='color: red;'>Please enter at least two valid names!</p>";
    return;
  }

  const pairs = pairMembers(members);

  // Display the pairs
  outputDiv.innerHTML = "<h3>Buddies:</h3>";
  pairs.forEach((pair, index) => {
    const pairText = pair.join(" & ");
    const pairDiv = document.createElement("div");
    pairDiv.className = "pair";
    pairDiv.textContent = `Pair ${index + 1}: ${pairText}`;
    outputDiv.appendChild(pairDiv);
  });
});

document.getElementById("fileInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const filePreview = document.getElementById("filePreview");
  filePreview.classList.toggle("fileLoaded", true);
  filePreview.innerHTML = `<span>File loaded:</span> ${file.name}`;
  document.getElementById("membersInput").setAttribute("disabled", true);
});

document.getElementById("membersInput").addEventListener("input", (e) => {
  if (e.target.value.length > 0) {
    document.getElementById("fileInput").setAttribute("disabled", true);
  } else {
    document.getElementById("fileInput").removeAttribute("disabled");
  }
});

document.getElementById("clearFile").addEventListener("click", () => {
  const fileInput = document.getElementById("fileInput");
  fileInput.value = "";
  const filePreview = document.getElementById("filePreview");
  filePreview.classList.toggle("fileLoaded", false);
  filePreview.innerHTML = "";
  document.getElementById("membersInput").removeAttribute("disabled");
});
