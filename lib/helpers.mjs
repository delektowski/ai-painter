export function generateTitle(prompt) {
    return prompt.split(' ').splice(0,5).join('-').toLowerCase();


}
