function validatePassword(password) {
    const minLength = 8; // Definindo o tamanho mínimo da senha
    const hasUpperCase = /[A-Z]/.test(password); // Verifica se tem maiúscula
    const hasLowerCase = /[a-z]/.test(password); // Verifica se tem minúscula
    const hasNumber = /\d/.test(password); // Verifica se tem número
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Verifica se tem caractere especial

    // Checagens
    if (password.length < minLength) {
        return 'A senha deve ter pelo menos 8 caracteres.';
    }
    if (!hasUpperCase) {
        return 'A senha deve conter pelo menos uma letra maiúscula.';
    }
    if (!hasLowerCase) {
        return 'A senha deve conter pelo menos uma letra minúscula.';
    }
    if (!hasNumber) {
        return 'A senha deve conter pelo menos um número.';
    }
    if (!hasSpecialChar) {
        return 'A senha deve conter pelo menos um caractere especial.';
    }
    return null; // Se passar em todas as verificações
}

document.getElementById('password').addEventListener('input', function () {
    const password = this.value;
    const message = validatePassword(password); // Chamando a função de validação
    const passwordAlert = document.getElementById('passwordAlert');
    const passwordInput = document.getElementById('password');

    if (message) {
        passwordAlert.textContent = message; // Exibe a mensagem de erro
        passwordInput.classList.add('is-invalid'); // Adiciona classe de erro
    } else {
        passwordAlert.textContent = ''; // Apaga a mensagem de erro
        passwordInput.classList.remove('is-invalid'); // Remove classe de erro
    }
});

document.getElementById('form').addEventListener('submit', function (event) {
    const password = document.getElementById('password').value;
    const message = validatePassword(password); // Verifica a senha antes de enviar o formulário

    if (message) {
        event.preventDefault(); // Impede o envio do formulário
        document.getElementById('passwordAlert').textContent = message; // Exibe a mensagem de erro
        document.getElementById('password').classList.add('is-invalid'); // Adiciona classe de erro
    }
});