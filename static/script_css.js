document.addEventListener("DOMContentLoaded", function () {
    const readMoreButton = document.querySelector(".nyeri-dada");
    const panah = document.querySelector(".panah1");
    const panah2 = document.querySelector(".panah2");
    const readMoreButton2 = document.querySelector(".Exercise-angina");
    const detailedDescription = document.querySelector(".penjelasan-nyeri");
    const detailedDescription2 = document.querySelector(".penjelasan-angina");
  
    let isDescriptionVisible = false; // Tambahkan variabel ini untuk mengingat status deskripsi
  let isDescriptionVisible2 = false;

  readMoreButton.addEventListener("click", function () {
    if (!isDescriptionVisible) {
      detailedDescription.style.height = "fit-content";
      panah.style.transform = "rotate(180deg)";
    } else {
      detailedDescription.style.height = "0"
      panah.style.transform = "rotate(0deg)"; // Kembali ke posisi semula
    }
    isDescriptionVisible = !isDescriptionVisible; // Toggle status
  });

  readMoreButton2.addEventListener("click", function () {
    if (!isDescriptionVisible2) {
      detailedDescription2.style.height = "fit-content"
      panah2.style.transform = "rotate(180deg)";
    } else {
      detailedDescription2.style.height = "0"
      panah2.style.transform = "rotate(0deg)"; // Kembali ke posisi semula
    }
    isDescriptionVisible2 = !isDescriptionVisible2; // Toggle status
  });

  });
  
  