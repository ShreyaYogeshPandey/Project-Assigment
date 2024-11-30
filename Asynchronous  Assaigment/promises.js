
    // Task 2: Promise Implementation
    document.getElementById("promiseBtn").addEventListener("click", () => {
      const output = document.getElementById("output");
      output.innerText = "Loading...";
      fetchPosts()
        .then((titles) => {
          output.innerHTML = titles.join("<br>");
        })
        .catch((error) => {
          output.innerText = `Error: ${error}`;
        });
    });

    function fetchPosts() {
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject("Operation timed out"), 5000);

        fetch("https://dummyjson.com/posts")
          .then((response) => response.json())
          .then((data) => {
            clearTimeout(timeout);
            resolve(data.posts.map((post) => post.title));
          })
          .catch((error) => reject(error.message));
      });
    }
 