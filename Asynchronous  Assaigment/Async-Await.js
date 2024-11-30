
    // Task 2: Async/Await Implementation
    document.getElementById("asyncBtn").addEventListener("click", async () => {
      const output = document.getElementById("output");
      output.innerText = "Loading...";
      try {
        const titles = await fetchPosts();
        output.innerHTML = titles.join("<br>");
      } catch (error) {
        output.innerText = `Error: ${error}`;
      }
    });

    async function fetchPosts() {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      try {
        const response = await fetch("https://dummyjson.com/posts", {
          signal: controller.signal,
        });
        clearTimeout(timeout);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.posts.map((post) => post.title);
      } catch (error) {
        throw error.name === "AbortError" ? "Operation timed out" : error.message;
      }
    }
  