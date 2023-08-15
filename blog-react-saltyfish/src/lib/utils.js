// 替换换行符
export function transBlogContent(text){
    const regex = /\\n/ig;
    return text.replaceAll(regex,'\n')
}