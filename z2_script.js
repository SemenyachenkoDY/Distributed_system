// Получаем элементы
const htmlEditor = document.getElementById("htmlEditor");
const previewContainer = document.getElementById("previewContainer");

// Обновление предпросмотра
function updatePreview() {
    const userContent = htmlEditor.value;
    previewContainer.innerHTML = userContent;
}

// Добавление события на ввод
htmlEditor.addEventListener("input", updatePreview);

// Функция для обёртывания выделенного текста
function wrapText(before, after) {
    const textarea = htmlEditor;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const selectedText = text.substring(start, end);
    const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);

    textarea.value = newText;
    textarea.focus();

    // Перемещаем курсор после добавленных тегов
    textarea.selectionStart = start + before.length;
    textarea.selectionEnd = end + before.length;

    // Обновляем предпросмотр
    updatePreview();
}

// Инициализация предпросмотра
updatePreview();
