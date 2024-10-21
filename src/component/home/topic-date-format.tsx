"use client";
interface TopicListsDateFormatProps {
    date: Date;
}

export default function TopicListsDateFormat({ date }: TopicListsDateFormatProps) {
    const formatDate = (date: Date) => {
        return date.toLocaleString(undefined, {
            month: 'short',
            day: 'numeric'
        })
    };
    
    return (
        <p className="pl-1">
            {formatDate(date)}
        </p>
    )
}