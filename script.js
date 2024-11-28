document.querySelectorAll('input[name="cipherType"]').forEach((el) => {
    el.addEventListener('change', function () {
      document.getElementById('caesarOptions').style.display =
        this.value === 'caesar' ? 'block' : 'none';
    });
  });
  
  function preserveCase(original, transformed) {
    return original
      .split('')
      .map((char, i) => {
        const isLower = char === char.toLowerCase();
        const transformedChar = transformed[i] || char;
        return isLower ? transformedChar.toLowerCase() : transformedChar.toUpperCase();
      })
      .join('');
  }
  
  function atbash(text, isRussian) {
    const alphabet = isRussian ? 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const reversed = alphabet.split('').reverse().join('');
    const map = new Map(alphabet.split('').map((char, i) => [char, reversed[i]]));
    const transformed = text
      .toUpperCase()
      .split('')
      .map((char) => map.get(char) || char)
      .join('');
    return preserveCase(text, transformed);
  }
  
  function caesar(text, shift, isRussian, decrypt = false) {
    const alphabet = isRussian ? 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const offset = decrypt ? -shift : shift;
    const transformed = text
      .toUpperCase()
      .split('')
      .map((char) => {
        const index = alphabet.indexOf(char);
        if (index === -1) return char; // Игнорируем символы вне алфавита
        return alphabet[(index + offset + alphabet.length) % alphabet.length];
      })
      .join('');
    return preserveCase(text, transformed);
  }
  
  function detectLanguage() {
    return document.querySelector('input[name="language"]:checked').value === 'russian';
  }
  
  function encrypt() {
    const text = document.getElementById('textInput').value;
    const cipherType = document.querySelector('input[name="cipherType"]:checked').value;
    const isRussian = detectLanguage();
    let result = '';
  
    if (cipherType === 'atbash') {
      result = atbash(text, isRussian);
    } else if (cipherType === 'caesar') {
      const shift = parseInt(document.getElementById('shiftInput').value, 10);
      if (isNaN(shift)) {
        alert('Введите корректное значение для сдвига!');
        return;
      }
      result = caesar(text, shift, isRussian);
    }
  
    document.getElementById('result').textContent = result;
  }
  
  
  function decrypt() {
    const text = document.getElementById('textInput').value;
    const cipherType = document.querySelector('input[name="cipherType"]:checked').value;
    const isRussian = detectLanguage();
    let result = '';
  
    if (cipherType === 'atbash') {
      result = atbash(text, isRussian); // Дешифрование Атбаш идентично шифрованию
    } else if (cipherType === 'caesar') {
      const shift = parseInt(document.getElementById('shiftInput').value, 10);
      if (isNaN(shift)) {
        alert('Введите корректное значение для сдвига!');
        return;
      }
      result = caesar(text, shift, isRussian, true);
    }
  
    document.getElementById('result').textContent = result;
  }