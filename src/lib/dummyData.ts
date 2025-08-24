import { Application, ApplicationStatus, User } from "@/lib/Application.type";

const dummyUser: User = {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    created_at: "2021-01-01",
    updated_at: "2021-01-01",
    image: "https://github.com/shadcn.png"
}


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