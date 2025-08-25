import { UserStatus } from "@/lib/Application.type"
import { CircleCheck, CircleMinus, CircleX, Shield } from "lucide-react"

interface UserBadgeStatusProps {
    status: UserStatus
}

export default function UserBadgeStatus({ status }: UserBadgeStatusProps) {
    switch (status) {
        case UserStatus.ACTIVE:
            return <CircleCheck className="h-3 w-3 text-green-600" />
        case UserStatus.INACTIVE:
            return <CircleMinus className="h-3 w-3 text-gray-500" />
        case UserStatus.SUSPENDED:
            return <Shield className="h-3 w-3 text-yellow-600" />
        case UserStatus.BANNED:
            return <CircleX className="h-3 w-3 text-red-600" />
        default:
            return <CircleMinus className="h-3 w-3 text-gray-500" />
    }
}
