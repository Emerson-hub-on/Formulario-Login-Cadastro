
let Cadastrovalidator = {
    handleSubmit: (event) => {     //Função que para o evento enquanto tiver um submit
        event.preventDefault();
        let send = true;
        let inputs = form.querySelectorAll('input');

        Cadastrovalidator.clearErrors();

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            console.log(input);
            let check = Cadastrovalidator.checkInput(input);
            if (check !== true) {
                send = false;
                Cadastrovalidator.showError(input, check);
            }
        }
        if (send) {
            form.submit();
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');

        if (rules !== null) {
            rules = rules.split('|');
            for (let k in rules) {
                let rDetails = rules[k].split('=');
                switch (rDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'Campo não pode ser vazio.';
                        }
                        break;
                    case 'min':
                        if (input.value.length < rDetails[1]) {
                            return 'Campo tem que ter pelo menos ' + rDetails[1] + ' caracteres';
                        }
                        break;
                    case 'e-mail':
                        if (input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            // Expressão regular para validar o e-mail
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'O e-mail não é válido';
                            }
                        }
                }
            }
        }
        return true;
    },
    showError: (input, error) => {
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;
        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll('input')
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }
        let errorElement = document.querySelectorAll('.error');
        for (let i = 0; i < errorElement.length; i++) {
            errorElement[i].remove();
        }
    }
};
let form = document.querySelector('.cadastrovalidator'); //Pegar o formulário que utilizaremos no código
form.addEventListener('submit', Cadastrovalidator.handleSubmit); //Monitoramento para validar quando tiver um 'submit'


