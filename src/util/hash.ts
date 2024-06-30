export function generateHash() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const alphanumeric = letters + numbers;

  function getRandomChars(charSet, length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return result;
  }

  const part1 = getRandomChars(letters, 4);
  const part2 = getRandomChars(numbers, 3);
  const part3 = getRandomChars(alphanumeric, 5);

  return part1 + part2 + part3;
}
