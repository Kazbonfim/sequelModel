// Condição que converte valores para booleano antes de realizar alguma ação dentro de um contexto
module.exports = function ifEquals(a, b, options) {
    console.log(`Usando Helper ifEquals ${a}, ${b}, ${options}`);
        if (Boolean(a) === Boolean(b)) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
};