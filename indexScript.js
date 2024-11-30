document.addEventListener('DOMContentLoaded', () => {
    const draggableElements = document.querySelectorAll('.box');
    const droppableElements = document.querySelectorAll('.droppable');
    let score = 0;

    // Drag Start
    draggableElements.forEach(element => {
        element.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.id);
            e.target.classList.add('draggableFormat');
        });
    });

    // Drop Event
    droppableElements.forEach(element => {
        element.addEventListener('drop', (e) => {
            e.preventDefault();
            const droppedElementId = e.dataTransfer.getData('text');
            const dropZoneId = e.target.getAttribute('data-draggable-id');
            const draggableElement = document.getElementById(droppedElementId);

            e.target.appendChild(draggableElement); // Move the draggable element to the droppable zone

            // Check if the dropped element matches the drop zone
            if (droppedElementId === dropZoneId) {
                score++;
                document.getElementById('remarks').innerText = "Good Job!";
                document.getElementById('scores').innerText = score;
            } else {
                document.getElementById('remarks').innerText = "Try Again!";
            }

            // Check if the game is over
            if (score === 10) {
                document.getElementById('remarks').innerText = "You Win!";
            }
        });

        element.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
    });

    // Reset the game
    document.getElementById('resetBtn').addEventListener('click', () => {
        score = 0;
        document.getElementById('scores').innerText = score;
        document.getElementById('remarks').innerText = '';
        
        // Reset all droppable areas and draggable elements
        draggableElements.forEach(element => {
            element.style.order = ''; // Reset the draggable order
            document.querySelector('.draggableContainer').appendChild(element);
        });
        droppableElements.forEach(element => {
            element.innerHTML = `<img src="images/${element.getAttribute('data-draggable-id').replace('box', '')}_zone.png" class="zoneImage" alt="Zone">`;
        });
    });
});
