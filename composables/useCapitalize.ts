export default function () {
    const capitalizeFirstLetter = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    }

    return { capitalizeFirstLetter }
}