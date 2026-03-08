// Script base para la vista de catálogo
// Aquí deben consumir la API de items y mostrarlos en la página

// Constante con la URL base de la API
const API_URL = "/api/items";

// TODO: Seleccionar el contenedor donde se mostrarán los items
const catalogContainer = document.getElementById("catalogContainer");

// Función principal para cargar los items desde la API
async function loadCatalog() {
    try {
        // 1. Hacer fetch a la API (GET /api/items)
        const res= await fetch(API_URL);
        
        // 2. Parsear la respuesta a JSON
        const items=await res.json();

        // 3. Limpiar el contenedor del catálogo 
        catalogContainer.innerHTML = "";
        // 4. Iterar sobre cada item y llamar a renderItem()
         items.forEach(item => {
            renderItem(item);
        });
    } catch (err) {
        console.error("Error cargando catálogo:", err);
        // TODO: Mostrar mensaje de error en la UI
        catalogContainer.innerHTML = "<p>Error cargando catálogo</p>";
    }
}

// Función para renderizar un item en el catálogo
function renderItem(item) {
    // TODO: Crear un elemento HTML (ej: div o card)
    const card = document.createElement("div");
    card.classList.add("card");
    // TODO: Asignar los datos del item (name, description, etc.)
     card.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description || "Sin descripción"}</p>
        <p><b>Precio:</b> $${item.price || "0"}</p>
        <p><b>Categoría:</b> ${item.category || "Sin categoría"}</p>
        <button class="btn-detail" data-id="${item.id}">
            Ver detalle
        </button>
        `;
    // TODO: Insertar el elemento en el contenedor
     catalogContainer.appendChild(card);
}

// Inicializar el catálogo cuando cargue la página
loadCatalog();
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

document.addEventListener("click", async (e) => {

    if (e.target.classList.contains("btn-detail")) {

        const id = e.target.dataset.id;

        const res = await fetch(`/api/items/${id}`);
        const item = await res.json();

        modalBody.innerHTML = `
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <p><b>Precio:</b> $${item.price}</p>
            <p><b>Categoría:</b> ${item.category}</p>
            <p><b>Stock:</b> ${item.stock}</p>
            <img src="${item.image}" width="200">
        `;

        modal.classList.remove("hidden");
    }
});

closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});