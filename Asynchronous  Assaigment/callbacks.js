// Task 2: Callback Implementation
document.getElementById("callbackBtn").addEventListener("click", () => {
    simulateDelay(5000, () => {
      document.getElementById("output").innerText = "Callback executed after 5 seconds";
    });
  });

  function simulateDelay(delay, callback) {
    setTimeout(callback, delay);
  }

   document.getElementById("callbackBtn").addEventListener("click", () => {
    simulateDelay(5000, fetchData);
  });

  function simulateDelay(delay, callback) {
    setTimeout(callback, delay);
  }

  function fetchData() {
    fetch("https://dummyjson.com/posts")
      .then((response) => response.json())
      .then((data) => {
        const titles = data.posts.map((post) => post.title).join("<br>");
        document.getElementById("output").innerHTML = titles;
      })
      .catch((error) => {
        document.getElementById("output").innerText = `Error: ${error.message}`;
      });
  } 
