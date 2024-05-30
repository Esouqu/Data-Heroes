export function numberToArray(num: number) {
  return Array.from({ length: num }, (_, index) => index + 1);
}

export function sliceArray<T>(array: T[], target: T, amount: number): T[] {
  const targetIndex = array.findIndex((item) => item === target);
  const centerIndex = Math.floor(amount / 2);
  
  let startIndex = Math.max(0, targetIndex - centerIndex);
  let endIndex = Math.min(array.length, targetIndex + centerIndex + 1);
  
  if (targetIndex < centerIndex) {
    endIndex = startIndex + amount;
  } else if (targetIndex >= array.length - centerIndex) {
    startIndex = Math.max(0, endIndex - amount);
  }
  
  return array.slice(startIndex, endIndex);
}