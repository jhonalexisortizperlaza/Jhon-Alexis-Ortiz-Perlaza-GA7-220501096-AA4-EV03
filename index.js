document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos el formulario y la lista de eventos
    const form = document.getElementById("event-form");
    const eventList = document.getElementById("event-list");

    // Cargar eventos desde el LocalStorage o crear un array vacío
    let events = JSON.parse(localStorage.getItem("events")) || [];

    // Función para mostrar los eventos en la lista
    function renderEvents() {
        eventList.innerHTML = ""; // Limpiar la lista antes de renderizar

        events.forEach((event, index) => {
            const li = document.createElement("li");
            li.classList.toggle("completed", event.completed); // Aplicar clase si está completado

            // Agregamos la información del evento y botones de acción
            li.innerHTML = `
                ${event.title} - ${event.date}
                <div>
                    <button class="complete-btn" onclick="toggleComplete(${index})">
                        ${event.completed ? "Desmarcar" : "Completar"}
                    </button>
                    <button class="edit-btn" onclick="editEvent(${index})">Editar</button>
                    <button class="delete-btn" onclick="deleteEvent(${index})">Eliminar</button>
                </div>`;

            eventList.appendChild(li); // Agregar evento a la lista
        });
    }

    // Evento para agregar un nuevo evento
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evitar recarga de la página

        // Obtener valores del formulario
        const title = document.getElementById("event-title").value;
        const date = document.getElementById("event-date").value;

        // Verificar que los campos no estén vacíos
        if (title && date) {
            events.push({ title, date, completed: false }); // Agregar evento al array
            localStorage.setItem("events", JSON.stringify(events)); // Guardar en LocalStorage
            renderEvents(); // Volver a renderizar los eventos
            form.reset(); // Limpiar formulario
        }
    });

    // Función para eliminar un evento
    window.deleteEvent = (index) => {
        events.splice(index, 1); // Eliminar evento del array
        localStorage.setItem("events", JSON.stringify(events)); // Actualizar LocalStorage
        renderEvents(); // Volver a mostrar la lista
    };

    // Función para editar un evento
    window.editEvent = (index) => {
        const newTitle = prompt("Nuevo título:", events[index].title);
        const newDate = prompt("Nueva fecha (YYYY-MM-DD):", events[index].date);

        if (newTitle && newDate) {
            events[index].title = newTitle;
            events[index].date = newDate;
            localStorage.setItem("events", JSON.stringify(events));
            renderEvents();
        }
    };

    // Función para marcar/desmarcar evento como completado
    window.toggleComplete = (index) => {
        events[index].completed = !events[index].completed; // Cambiar estado de completado
        localStorage.setItem("events", JSON.stringify(events)); // Guardar cambios en LocalStorage
        renderEvents(); // Volver a renderizar eventos
    };

    // Llamamos a la función para mostrar eventos al cargar la página
    renderEvents();
});
