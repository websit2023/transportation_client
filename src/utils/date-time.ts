
export function convertStringToDate(dateStr: string): string {
    const date = new Date(dateStr)

    const year: number = date.getUTCFullYear();
    const month: number = date.getUTCMonth() + 1;
    const day: number = date.getUTCDate();

    const formattedDate: string = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
    return formattedDate
}

export function convertDate(dateStr: Date): string {
    const date = new Date(dateStr)

    const year: number = date.getUTCFullYear();
    const month: number = date.getUTCMonth() + 1;
    const day: number = date.getUTCDate();

    const formattedDate: string = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
    return formattedDate
}

export function convertDateToTime(dateStr: Date): string {
    const date = new Date(dateStr)

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    // const seconds = date.getUTCSeconds();

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime
}

export function calculateAge(yearOfBirth: number): number {
    const currentYear = new Date().getFullYear();
    const age = currentYear - yearOfBirth;
    return age;
}