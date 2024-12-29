function contador(elemento, sufixo, valorFinal) {
    document.addEventListener('DOMContentLoaded', function () {
        // Configurar o contador
        const options = {
            startVal: 0,         // Valor inicial
            duration: 2,         // Duração da animação (em segundos)
            decimalPlaces: 0,    // Número de casas decimais
            suffix: sufixo,      // Sufixo (se necessário)
        };

        // Criar o contador
        const counter = new CountUp(elemento, 0, valorFinal, 0, options.duration, options);

        // Iniciar a animação
        if (!counter.error) {
            counter.start();
        } else {
            console.error(counter.error);
        }
    });
}
