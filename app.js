document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-btn");
  const usernameInput = document.getElementById("user-input");
  const stasContainer = document.querySelector(".stats-container");
  const easyProgressCircle = document.querySelector(".easy-progress");
  const mediumProgressCircle = document.querySelector(".medium-progress");
  const hardProgressCircle = document.querySelector(".hard-progress");
  const easyLabel = document.querySelector("#easy-label");
  const mediumLabel = document.querySelector("#medium-label");
  const hardLabel = document.querySelector("#hard-label");
  const cardStatsContainer = document.querySelector(".stats-card");

  /* return true or false based on regex */
  function validateUsername(username) {
    if (username.trim() === "") {
      alert("username should not be empty");
      return false;
    }
    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    const isMatching = regex.test(username);
    if (!isMatching) {
      alert("Invalid username");
    }
    return isMatching;
  }

  async function fetchUserDetails(username) {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    try {
      searchButton.textContent = "searching...";
      searchButton.disabled = true;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("unable to fetch user details");
      }
      const data = await response.json();
      console.log("Login data", data);

      dispalayUserData(data);
    } catch (error) {
      stasContainer.innerHTML = `<p> No Data found</p>`;
    } finally {
      searchButton.textContent = "Search";
      searchButton.disabled = false;
    }
  }

  function updateProgress(solved, total, label, circle) {
    const progressDegree = (solved / total) * 100;
    circle.style.setProperty("--progress-degree", `${progressDegree}%`);
    label.textContent = `${solved}/${total}`;
  }

  function dispalayUserData(data) {
    const totalQues = data.totalQuestions;
    const totalEasyQues = data.totalEasy;
    const totalMediumQues = data.totalMedium;
    const totalHardQues = data.totalHard;

    const solvedTotalQues = data.totalSolved;
    const solvedTotalEasyQues = data.easySolved;
    const solvedTotalMediumQues = data.mediumSolved;
    const solvedTotalHardQues = data.hardSolved;
    /* console.log(totalEasyQues); */

    updateProgress(
      solvedTotalEasyQues,
      totalEasyQues,
      easyLabel,
      easyProgressCircle
    );
    updateProgress(
      solvedTotalMediumQues,
      totalMediumQues,
      mediumLabel,
      mediumProgressCircle
    );
    updateProgress(
      solvedTotalHardQues,
      totalHardQues,
      hardLabel,
      hardProgressCircle
    );

    
  }
  searchButton.addEventListener("click", function () {
    const username = usernameInput.value;
    console.log("login useranme:", username);
    if (validateUsername(username)) {
      fetchUserDetails(username);
    }
  });
});
