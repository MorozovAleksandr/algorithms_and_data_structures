-- ПРИНЦИП РАБОТЫ --
Программа вычисляет значение выражения, записанного в обратной польской нотации,
используя стековый подход. Алгоритм работает следующим образом:
Входная строка разбивается на токены (числа и операторы) с помощью parseInputLine.
Каждый токен преобразуется в число (если возможно), иначе остаётся строкой.
Обработка выражения (executeExpression)
Для каждого токена в выражении:
    Если токен — число, он помещается в стек.
    Если токен — оператор, из стека извлекаются два верхних операнда, выполняется операция, и результат помещается обратно в стек.
Вычисление операций (calculateExpression)
Поддерживаются операции: +, -, *, / (целочисленное деление с округлением вниз).

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Корректность порядка операндов
    В постфиксной нотации оператор следует за своими операндами, поэтому при извлечении из стека:
    Первый извлечённый элемент — правый операнд.
    Второй извлечённый элемент — левый операнд.
    Это гарантирует правильный порядок вычислений (например, для 5 2 / будет 5 / 2, а не 2 / 5).
Корректность вычислений:
    функция calculateExpression получает на вход левый операнд, правый операнд и оператор.
    На основе входных данных происходит вычисление выражения. Так мы гарантируем, что рассчет произведен верно.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
parseInputLine(разбиение строки и преобразование токенов в числа) - O(n)
executeExpression(Каждый токен обрабатывается ровно один раз) - O(n)
операции со стеком (push/pop) — O(1)
calculateExpression(арифметические операции) - O(1)

Итоговая временная сложность программы: - O(n)

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Стек в худшем случае хранит все числа до выполнения операций - O(n)
executeExpression(получения операндов, заполнение и удаление из стека) - O(n)
calculateExpression(вычисление выражения) - O(1)

Итоговая пространственная сложность - O(n)
