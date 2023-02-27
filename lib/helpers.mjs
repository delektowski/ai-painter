export function generateTitle(prompt) {
    const timeStamp = new Date().getTime().toString().substring(7,12)
    return prompt.split(' ').splice(0,5).join('-').toLowerCase() + timeStamp;


}
