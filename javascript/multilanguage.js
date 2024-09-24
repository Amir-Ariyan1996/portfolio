function updateContent(languageData) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.textContent = languageData[key];
  });

  // Dynamically generate the projects list
  const projectsList = document.getElementById("projects-list");
  projectsList.innerHTML = ""; // Clear existing content before rendering

  languageData.projects.forEach((project) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <figure>
        <img src="${project.image}" alt="${project.title}">
        <figcaption><h3>${project.title}</h3></figcaption>
      </figure>
      <p>${project.description}</p>
      <a target="_blank" href="${project.link}">Visit Website</a>
    `;

    projectsList.appendChild(li);
  });
}

function setLanguagePreferences(language) {
  localStorage.setItem("language", language);
}

async function fetchLanguageData(language) {
  const response = await fetch(`languages/${language}.json`);
  return response.json();
}

async function changeLanguage(language) {
  setLanguagePreferences(language);
  const languageData = await fetchLanguageData(language);
  updateContent(languageData);
  toggleFarsiStyleSheet(language);
  location.reload();
}

function toggleFarsiStyleSheet(language) {
  const head = document.querySelector("head");
  const link = document.querySelector("#styles-link");
  if (link) {
    head.removeChild(link);
  }
  if (language === "fa") {
    const newLink = document.createElement("link");
    newLink.id = "styles-link";
    newLink.rel = "stylesheet";
    newLink.href = "./styles/farsi.css";
    head.appendChild(newLink);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  const userPreferredLanguage = localStorage.getItem("language") || "en";
  const languageData = await fetchLanguageData(userPreferredLanguage);
  updateContent(languageData);
  toggleFarsiStyleSheet(userPreferredLanguage);
});
