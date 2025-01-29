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

document.getElementById("generateButton").addEventListener("click", () => {
  const input = document.getElementById("membersInput").value.trim();
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
