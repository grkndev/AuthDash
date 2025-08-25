import { Application, ApplicationStatus, User, UserStatus, UserRole } from "@/lib/Application.type";

const dummyUser: User = {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: UserRole.DEVELOPER,
    status: UserStatus.ACTIVE,
    created_at: "2021-01-01",
    updated_at: "2021-01-01",
    last_login: "2024-01-15",
    image: "https://github.com/shadcn.png"
}

export const dummyUsers: User[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        role: UserRole.DEVELOPER,
        status: UserStatus.ACTIVE,
        created_at: "2021-01-01",
        updated_at: "2024-01-15",
        last_login: "2024-01-15",
        image: "https://github.com/shadcn.png"
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        created_at: "2021-02-15",
        updated_at: "2024-01-14",
        last_login: "2024-01-14",
        image: "https://github.com/vercel.png"
    },
    {
        id: "3",
        name: "Mike Johnson",
        email: "mike.johnson@example.com",
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
        created_at: "2021-03-20",
        updated_at: "2024-01-13",
        last_login: "2024-01-13",
        image: "https://github.com/github.png"
    },
    {
        id: "4",
        name: "Sarah Wilson",
        email: "sarah.wilson@example.com",
        role: UserRole.MODERATOR,
        status: UserStatus.INACTIVE,
        created_at: "2021-04-10",
        updated_at: "2023-12-01",
        last_login: "2023-12-01",
        image: "https://github.com/microsoft.png"
    },
    {
        id: "5",
        name: "David Brown",
        email: "david.brown@example.com",
        role: UserRole.USER,
        status: UserStatus.SUSPENDED,
        created_at: "2021-05-05",
        updated_at: "2024-01-10",
        last_login: "2023-11-20",
        image: "https://github.com/facebook.png"
    },
    {
        id: "6",
        name: "Emma Davis",
        email: "emma.davis@example.com",
        role: UserRole.DEVELOPER,
        status: UserStatus.ACTIVE,
        created_at: "2021-06-12",
        updated_at: "2024-01-12",
        last_login: "2024-01-12",
        image: "https://github.com/google.png"
    },
    {
        id: "7",
        name: "Chris Miller",
        email: "chris.miller@example.com",
        role: UserRole.USER,
        status: UserStatus.BANNED,
        created_at: "2021-07-18",
        updated_at: "2023-10-15",
        last_login: "2023-10-15",
        image: "https://github.com/apple.png"
    },
    {
        id: "8",
        name: "Lisa Anderson",
        email: "lisa.anderson@example.com",
        role: UserRole.MODERATOR,
        status: UserStatus.ACTIVE,
        created_at: "2021-08-25",
        updated_at: "2024-01-11",
        last_login: "2024-01-11",
        image: "https://github.com/netflix.png"
    }
]


const dummyData: Application[] = [
    {
        id: "1",
        name: "Example App",
        description: "Example App Description",
        website: "https://example.com",
        status: ApplicationStatus.ACTIVE,
        created_at: "2021-01-01",
        updated_at: "2021-01-01",
        author: dummyUser,
        client_id: "1234567890",
        client_secret: "1234567890",
        callback_url: "https://example.com/callback",
        scopes: ["example"],
    }
]



export default dummyData