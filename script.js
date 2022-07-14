// Create a new container div
const CONTAINER_DIV = (() => {
    const container = document.createElement('div');

    container.classList.add('container');

    document.body.appendChild(container);

    return {container};
})();