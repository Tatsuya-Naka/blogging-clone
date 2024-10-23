interface ProfilePageProps {
    params: {
        userId: string;
    }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
    const { userId } = params;

    return (
        <div>
            Profile
        </div>
    )
}