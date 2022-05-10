export const getArrayOfProjNames = (objArr) => {
  const arr = [];
  for(let obj of objArr) {
    arr.push(obj.getName);
  }
  return arr;
}