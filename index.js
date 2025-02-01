document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("event-form");
    const eventList = document.getElementById("event-list");
    let events = JSON.parse(localStorage.getItem("events")) || [];

    function renderEvents() {
        eventList.innerHTML = "";
        events.forEach((event, index) => {
            const li = document.createElement("li");
            li.classList.toggle("completed", event.completed);
            li.innerHTML = `
                ${event.title} - ${event.date}
                <div>
                    <button class="complete-btn" onclick="toggleComplete(${index})">
                        ${event.completed ? "Desmarcar" : "Completar"}
                    </button>
                    <button class="edit-btn" onclick="editEvent(${index})">Editar</button>
                    <button class="delete-btn" onclick="deleteEvent(${index})">Eliminar</button>
                </div>`;
            eventList.appendChild(li);
        });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("event-title").value;
        const date = document.getElementById("event-date").value;

        if (title && date) {
            events.push({ title, date, completed: false });
            localStorage.setItem("events", JSON.stringify(events));
            renderEvents();
            form.reset();
        }
    });

    window.deleteEvent = (index) => {
        events.splice(index, 1);
        localStorage.setItem("events", JSON.stringify(events));
        renderEvents();
    };

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

    window.toggleComplete = (index) => {
        events[index].completed = !events[index].completed;
        localStorage.setItem("events", JSON.stringify(events));
        renderEvents();
    };

    renderEvents();
});
