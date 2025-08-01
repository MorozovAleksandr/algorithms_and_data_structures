-- ПРИНЦИП РАБОТЫ --
Для решения данной задачи, я использую массив digits который состоит только из цифр(иные знаки отфильтрованы)
В алгоритме реализован цикл по временным отрезкам t(1-9). На кажой итерации цикла я фильтрую массив по t,
получаю его длину и записываю в переменную count(количество цифр данного временного отрезка на поле).
Если игроки могут одновременно нажать на такое количество кнопок, то увеличиваем количество итоговых баллов на 1.
В данном алгоритме возможно используется лишняя временная и пространственная сложность,
но так как входные данные заранее известны (4 строки по 4 символа), я пожертвовал
памятью и временем ради читаемости и удобства.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
В каждой итерации цикла гарантировано получаем количество кнопок на поле.
Если количество кнопок t на поле (count) не превышает 2k (общее число доступных нажатий),
игроки успеют нажать все такие кнопки в текущий момент времени и получат балл.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Алгоритм - sleightOfHand
Получение массива digits из строки - O(n)
Цикл по временным отрезкам t - O(1)
Расчет количества кнопок на каждой итерации цикла - O(n)
Добавление балла на каждой итерации цикла - O(1)
Сложность алгоритма - O(n)

Вспомогательная функция - getString
Сложность - O(1)

Итоговая временная сложность программы - O(n)

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Массив digits(поле) - O(n)
На каждой итерации цикла(1-9) создаем новый массив O(n) для получения количества кнопок - 0(n)
Временные переменные (totalK, points, fieldLength, k, field) - O(1)

Итоговая пространственная сложность - O(n)
