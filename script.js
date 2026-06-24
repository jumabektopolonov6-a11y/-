document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. ЛОГИКА ДЛЯ СПИСКА ЗАДАЧ
    // ==========================================
    const todoInput = document.querySelector('.todo-input');
    const todoBtn = document.querySelector('.todo-btn');
    const todoList = document.querySelector('.todo-list');

    if (todoBtn && todoInput && todoList) {
        todoBtn.addEventListener('click', () => {
            const taskText = todoInput.value.trim();
            if (taskText === '') return;

            const li = document.createElement('li');
            li.innerHTML = `${taskText} <span class="delete-btn">❌</span>`;
            
            // Навешиваем событие удаления на крестик
            li.querySelector('.delete-btn').addEventListener('click', () => {
                li.remove();
            });

            todoList.appendChild(li);
            todoInput.value = ''; 
        });

        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') todoBtn.click();
        });
    }

    // ==========================================
    // 2. ЛОГИКА ДЛЯ КАЛЬКУЛЯТОРА
    // ==========================================
    const screen = document.querySelector('.calc-screen');
    const buttons = document.querySelectorAll('.calc-grid .btn');

    if (screen && buttons.length > 0) {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.innerText.trim();

                if (action === 'C') {
                    screen.value = '0';
                } 
                else if (action === '✉') { // Кнопка Стереть символ
                    if (screen.value.length > 1 && screen.value !== 'Ошибка') {
                        screen.value = screen.value.slice(0, -1);
                    } else {
                        screen.value = '0';
                    }
                } 
                else if (action === '=') {
                    try {
                        let result = eval(screen.value);
                        screen.value = Number.isInteger(result) ? result : result.toFixed(4);
                    } catch (err) {
                        screen.value = 'Ошибка';
                    }
                } 
                else {
                    if (screen.value === '0' || screen.value === 'Ошибка') {
                        if (['+', '-', '*', '/'].includes(action)) {
                            screen.value = '0' + action;
                        } else {
                            screen.value = action;
                        }
                    } else {
                        screen.value += action;
                    }
                }
            });
        });
    }

    // ==========================================
    // 3. ЛОГИКА ДЛЯ ФОРМЫ РЕГИСТРАЦИИ
    // ==========================================
    const regForm = document.querySelector('.reg-form');
    const emailInput = document.querySelector('.reg-email');
    const passwordInput = document.querySelector('.reg-password');

    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Отменяем перезагрузку страницы

            if (passwordInput.value.length < 6) {
                alert('Пароль должен быть не менее 6 символов!');
                return;
            }

            alert(`Регистрация успешна!\nEmail: ${emailInput.value}`);
            emailInput.value = '';
            passwordInput.value = '';
        });
    }
});