export function arabicPeriods(period) {
    if (period === 'AM')
        return 'صباحاً'
    return 'مساءً'
}

export function arabicDays(day) {
    switch (day) {
        case 'Sunday':
            return 'الأحد'
        case 'Monady':
            return 'الاثنين'
        case 'Tuesday':
            return 'الثلاثاء'
        case 'Wednesday':
            return 'الأربعاء'
        case 'Thursday':
            return 'الخميس'
        case 'Friday':
            return 'الجمعة'
        default:
            return 'السبت'
    }
}