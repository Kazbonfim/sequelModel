document.addEventListener('DOMContentLoaded', function () {
    // Lendo os parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const showToast = urlParams.get('showToast');
    const message = urlParams.get('message');

    // Verificando se a notificação deve ser exibida
    if (showToast === 'true' && message) {
        // Acessando o toast existente na página
        const toastElement = document.getElementById('myToast');

        // Atualizando o conteúdo da mensagem no corpo do toast
        const toastBody = toastElement.querySelector('.toast-body');
        toastBody.innerText = message;

        // Exibindo o toast
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    }

    // Opcional: Verificar os parâmetros diretamente no console (para debugging)
    console.log(window.location.href);  // Imprime a URL atual
    console.log(urlParams.get('message'));  // Imprime a mensagem do parâmetro
});
