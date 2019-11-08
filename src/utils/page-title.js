
const title = 'ATA'

export default function getpagetitle(pagetitle){
    if(pagetitle){
        return `${pagetitle}`
    }
    return `${title}`
}