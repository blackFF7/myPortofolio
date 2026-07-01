window.addEventListener("scroll", () => {
    let nav = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    }
    else {
        nav.classList.remove("scrolled");
    }
});


function alertMessage() {
    let form = document.getElementById("alertMessage");
    let alert = document.getElementById("alert");
    alert.innerHTML = "Votre message a été envoyé avec succès !";
    form.classList.remove("d-none");
    form.classList.add("text-danger");
    setTimeout(() => {
        form.classList.add("d-none");
        form.classList.remove("show");
    }, 3000);
    
}
