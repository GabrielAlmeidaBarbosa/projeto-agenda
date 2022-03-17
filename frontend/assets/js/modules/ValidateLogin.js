import validator from 'validator';

export default class ValidateLogin {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            this.validate(event);            
        });
    }

    validate(event) {
        const element = event.target;
        const emailInput = element.querySelector('input[name="email"]');
        const passwordInput = element.querySelector('input[name="password"]');

        if (!validator.isEmail(emailInput.value)) {
            const parent = emailInput.parentElement;
            this.removeMessage(parent);
            
            const paragraph = this.createMessage('Email inválido.');
            parent.appendChild(paragraph);
            return;
        }
        this.removeMessage(emailInput.parentElement);

        if (passwordInput.value.length < 4 || passwordInput.value.length > 20) {
            const parent = passwordInput.parentElement;
            this.removeMessage(parent);

            const paragraph = this.createMessage('A senha deve conter entre 4 e 20 caracteres.');
            parent.appendChild(paragraph);
            return;
        }
        this.removeMessage(passwordInput.parentElement);
        
        element.submit();
    }

    createMessage(message) {
        const paragraph = document.createElement('p');
        paragraph.style.color = '#F00';
        paragraph.innerHTML = message;
        return paragraph;
    }

    removeMessage(parentElement) {
        if (parentElement.lastElementChild.tagName.toLowerCase() === 'p')
            parentElement.lastElementChild.remove();
    }
};
