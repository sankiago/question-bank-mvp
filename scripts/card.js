class Card{
    constructor(question, answer, reviewDate = null){
        this.question = question;
        this.answer = answer;
        this.reviewDate = reviewDate == null ? new Date() : reviewDate;
        this.otraVezIntervalo = 60000; // 1 minuto == 60000ms
        this.normalIntervalo = 600000; // 10 minutos == 60000ms
        this.intervaloGraduado = 86470000; // 1 día == 8.64e+7ms
        this.factorDeEspaciadoNormal = 2.5;
        this.factorDeEspaciadoFacil = 3;
        this.factorDeEspaciadoMinimo = 1.3;
        this.estaGraduada = false;
        this.retroalimentacionDelUsuario = [];
    }

    otraVez() {
        const siguienteFechaEnMs = this.reviewDate.getTime();
        if (this.estaGraduada) {
            this.estaGraduada = false;
            this.factorDeEspaciadoNormal = Math.max(this.factorDeEspaciadoMinimo, this.factorDeEspaciadoNormal - 0.2);
        }
        this.reviewDate = new Date(siguienteFechaEnMs + this.otraVezIntervalo);
        this.retroalimentacionDelUsuario.unshift("otraVez");
    }

    normal() {
        const siguienteFechaEnMs = this.reviewDate.getTime();
        if (this.estaGraduada) {
            const tiempoMultiplicado = siguienteFechaEnMs
                    + Math.round(this.normalIntervalo * this.factorDeEspaciadoNormal);
            this.reviewDate = new Date(tiempoMultiplicado);
        } else {
            if (this.retroalimentacionDelUsuario.length > 0
                    && (this.retroalimentacionDelUsuario[0] == "normal"
                            || this.retroalimentacionDelUsuario[0] == "facil")) {
                this.estaGraduada = true;
                this.reviewDate = new Date(siguienteFechaEnMs + this.intervaloGraduado);
            } else {
                this.reviewDate = new Date(siguienteFechaEnMs + this.normalIntervalo);
            }
        }
        this.retroalimentacionDelUsuario.unshift("normal");
    }

    facil() {
        const siguienteFechaEnMs = this.reviewDate.getTime();
        if (this.estaGraduada) {
            const tiempoMultiplicado = siguienteFechaEnMs
                    + Math.round(this.normalIntervalo * this.factorDeEspaciadoFacil);
            this.reviewDate = new Date(tiempoMultiplicado);
        } else {
            if (this.retroalimentacionDelUsuario.length > 0
                && (this.retroalimentacionDelUsuario[0] == "normal"
                        || this.retroalimentacionDelUsuario[0] == "facil")) {
                this.estaGraduada = true;
                this.reviewDate = new Date(siguienteFechaEnMs + this.intervaloGraduado);
            } else {
                this.reviewDate = new Date(siguienteFechaEnMs + this.normalIntervalo);
            }
        }
        this.retroalimentacionDelUsuario.unshift("facil");
    }

    lessThan(otherCard){
        if(!(otherCard instanceof Card)){
            throw new Error("card is not comparable with " + otherCard)
        }
        return this.reviewDate.getTime() < otherCard.reviewDate.getTime();
    }
    greaterThan(otherCard){
        if(!(otherCard instanceof Card)){
            throw new Error("card is not comparable with " + otherCard)
        }
        return this.reviewDate.getTime() > otherCard.reviewDate.getTime();
    }
    
}

export default Card;
