export default function () {
    const dayjs = useDayjs()

    const brDate = (date: string) => {
        if (!date) return ''

        return dayjs(date, "DD/MM/YYYY").isValid() ? date : dayjs(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    }

    const brDateWithTime = (date: string) => {
        if (!date) return ''

        return dayjs(date, "DD/MM/YYYY HH:mm:ss").isValid() ? date : dayjs(date, "YYYY-MM-DDTHH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
    }

    const databaseDate = (date: string) => {
        if (!date) return ''

        return dayjs(date, "YYYY-MM-DD").isValid() ? date : dayjs(date, "DD/MM/YYYY").format("YYYY-MM-DD");
    }

    const databaseDateWithTime = (date: string) => {
        if (!date) return ''

        return dayjs(date, "YYYY-MM-DDTHH:mm:ss").isValid() ? date : dayjs(date, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss");
    }

    const isDate = (date: string) => {
        if (!date) return ''

        return dayjs(date, "DD/MM/YYYY").isValid()
    }

    return { brDate, brDateWithTime, databaseDate, databaseDateWithTime, isDate }
}