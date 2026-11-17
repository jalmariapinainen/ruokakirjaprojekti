const viewport = document.getElementById("gallery-viewport");
const previousButton = document.getElementById("gallery-previous");
const nextButton = document.getElementById("gallery-next");
const firstCard = document.querySelector(".gallery-card");
const suggestionButton = document.getElementById("recipe-suggestion");

if (!viewport || !previousButton || !nextButton || !firstCard || !suggestionButton) {
    throw new Error("Etusivun rakenne ei ole valmis.");
}

const updateButtons = () => {
    previousButton.disabled = viewport.scrollLeft <= 1;
    nextButton.disabled = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 1;
};

const scrollByCard = (direction) => {
    const track = firstCard.parentElement;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;

    viewport.scrollBy({
        left: direction * (firstCard.getBoundingClientRect().width + gap)
    });
};

previousButton.addEventListener("click", () => scrollByCard(-1));
nextButton.addEventListener("click", () => scrollByCard(1));
viewport.addEventListener("scroll", updateButtons, { passive: true });
window.addEventListener("resize", updateButtons);

const recipeIds = [
    "tuorepuuro",
    "rahkasampylat",
    "munakas",
    "kinkku-juusto-omeletti",
    "kaurapuuro"
];

suggestionButton.addEventListener("click", () => {
    const recipeId = recipeIds[Math.floor(Math.random() * recipeIds.length)];
    window.location.href = `aamuilta.html#${recipeId}`;
});

updateButtons();
