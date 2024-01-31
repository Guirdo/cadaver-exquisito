export default function cutOffText(text){
  const textLength = 28
  if(text.length > textLength){
      text = text.substring(0, textLength) + '...';
  }
  return text;
}