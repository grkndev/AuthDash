"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Shield, User, Wrench } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "../apps/data-table-column-header"
import { User as UserType, UserRole, UserStatus } from "@/lib/Application.type"
import { Badge } from "../ui/badge"
import UserBadgeStatus from "./UserBadgeStatus"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function getRoleIcon(role: UserRole) {
    switch (role) {
        case UserRole.ADMIN:
            return <Shield className="h-3 w-3 text-red-600" />
        case UserRole.MODERATOR:
            return <Shield className="h-3 w-3 text-blue-600" />
        case UserRole.DEVELOPER:
            return <Wrench className="h-3 w-3 text-purple-600" />
        case UserRole.USER:
            return <User className="h-3 w-3 text-gray-600" />
        default:
            return <User className="h-3 w-3 text-gray-600" />
    }
}

export const columns: ColumnDef<UserType>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            return <div className="font-mono text-xs">{row.getValue("id")}</div>
        },
    },
    {
        accessorKey: "email",
        header: "Kullanıcı",
        cell: ({ row }) => {
            const user = row.original
            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-sm text-muted-foreground">{user.email}</span>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "role",
        header: "Rol",
        cell: ({ row }) => {
            const user = row.original
            return (
                <Badge variant="outline" className="rounded-lg gap-2">
                    {getRoleIcon(user.role)}
                    <span className="text-[12px] font-semibold">{user.role}</span>
                </Badge>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Durum",
        cell: ({ row }) => {
            const user = row.original
            return (
                <Badge variant="outline" className="rounded-lg gap-2">
                    <UserBadgeStatus status={user.status} />
                    <span className="text-[12px] font-semibold">{user.status}</span>
                </Badge>
            )
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Kayıt Tarihi" />
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("created_at"))
            return <div className="text-sm">{date.toLocaleDateString('tr-TR')}</div>
        },
    },
    {
        accessorKey: "last_login",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Son Giriş" />
        ),
        cell: ({ row }) => {
            const lastLogin = row.getValue("last_login") as string
            if (!lastLogin) return <div className="text-sm text-muted-foreground">-</div>
            const date = new Date(lastLogin)
            return <div className="text-sm">{date.toLocaleDateString('tr-TR')}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Menüyü aç</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                            Kullanıcı ID'sini kopyala
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Kullanıcıyı Görüntüle</DropdownMenuItem>
                        <DropdownMenuItem>Profili Düzenle</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === UserStatus.ACTIVE ? (
                            <DropdownMenuItem className="text-yellow-600">
                                Kullanıcıyı Askıya Al
                            </DropdownMenuItem>
                        ) : user.status === UserStatus.SUSPENDED ? (
                            <DropdownMenuItem className="text-green-600">
                                Askıyı Kaldır
                            </DropdownMenuItem>
                        ) : null}
                        {user.status !== UserStatus.BANNED && (
                            <DropdownMenuItem className="text-red-600">
                                Kullanıcıyı Yasakla
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
