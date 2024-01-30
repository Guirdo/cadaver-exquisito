export default function cutOffText(text){
  const textLength = 21
  if(text.length > textLength){
      text = text.substring(0, textLength) + '...';
  }
  return text;
}