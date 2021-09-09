function clearArray(arr) {
  arr.length = 0;
}

function getDistanceBetween(aX, aY, bX, bY) {
  const xDiff = Math.abs(aX - bX);
  const yDiff = Math.abs(aY - bY);
  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
}
