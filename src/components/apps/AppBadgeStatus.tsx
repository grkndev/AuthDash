import { ApplicationStatus } from '@/lib/Application.type'
import { CircleAlert, CircleCheck, CircleX } from 'lucide-react'
import React from 'react'

export default function AppBadgeStatus({ status }: { status: ApplicationStatus }) {
    switch (status) {
        case ApplicationStatus.ACTIVE:
            return <CircleCheck className="h-5 w-5 text-green-800" />
        case ApplicationStatus.INACTIVE:
            return <CircleX className="h-5 w-5 text-red-500" />
        case ApplicationStatus.SUSPENDED:
            return <CircleAlert className="h-5 w-5 text-yellow-500" />
    }
}
