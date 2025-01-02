class NotificationHelper {
    /**
     * Gera uma notificação baseada nos parâmetros recebidos.
     * 
     * @param {string} showToast - Indica se deve exibir a notificação (true/false como string).
     * @param {string} message - Mensagem da notificação.
     * @param {boolean} redirect - Indica se deve redirecionar.
     * @param {object} res - Objeto de resposta do Express (necessário para redirecionar/renderizar).
     * @param {string} [redirectPath] - Caminho para redirecionamento (necessário se redirect for true).
     * @param {string} [renderPath] - Caminho para renderização (necessário se redirect for false).
     */
    static handleNotification(showToast, message, redirect, res, redirectPath = null, renderPath = null) {
        const notification = showToast === 'true' ? { showToast, message } : null;

        if (redirect) {
            if (!redirectPath) throw new Error('redirectPath é obrigatório para redirecionamento.');
            res.status(303).redirect(`${redirectPath}?showToast=true&message=${encodeURIComponent(message)}`);
        } else {
            if (!renderPath) throw new Error('renderPath é obrigatório para renderização.');
            res.render(renderPath, { notification });
        }
    }
}

module.exports = NotificationHelper;
