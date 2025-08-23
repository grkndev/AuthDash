"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChevronRight, ExternalLink, Link2, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "./data-table-column-header"
import Link from "next/link"
import { Application } from "@/lib/Application.type"
import { Badge } from "../ui/badge"
import AppBadgeStatus from "./AppBadgeStatus"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Application>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Uygulama Adı" />
        ),
    },
    {
        header: "Website URL",
        cell: ({ row }) => {
            const app = row.original
            return <div className="flex items-center gap-2">
                <Link href={app.website} target="_blank" className="hover:underline">{app.website}</Link>
                <ExternalLink className="h-4 w-4" />
            </div>
        },
    },
    {
        header: "Durum",
        cell: ({ row }) => {
            const app = row.original
            return <Badge variant="outline" className="rounded-lg gap-2">
                <AppBadgeStatus status={app.status} />
                <span className="text-[12px] font-semibold">{app.status}</span>
                </Badge>
        },
    },
    {
        accessorKey: "created_at",
        header: "Oluşturulma Tarihi",
    },
    {
        header: "Uygulama Sahibi",
        cell: ({ row }) => {
            const user = row.original.author
            return <div>{user.name}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const app = row.original

            return (
                <Link href={`/apps/${app.id}`}>
                    <Button variant="outline" className="h-8 w-8 p-0">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </Link>
                // <DropdownMenu>
                //     <DropdownMenuTrigger asChild>
                //         <Button variant="ghost" className="h-8 w-8 p-0">
                //             <span className="sr-only">Open menu</span>
                //             <MoreHorizontal className="h-4 w-4" />
                //         </Button>
                //     </DropdownMenuTrigger>
                //     <DropdownMenuContent align="end">
                //         <DropdownMenuLabel>Actions</DropdownMenuLabel>
                //         <DropdownMenuItem
                //             onClick={() => navigator.clipboard.writeText(app.id)}
                //         >
                //             Copy app ID
                //         </DropdownMenuItem>
                //         <DropdownMenuSeparator />
                //         <DropdownMenuItem>Uygulamayı Görüntüle</DropdownMenuItem>
                //         <DropdownMenuItem>Uygulama Detaylarını Görüntüle</DropdownMenuItem>
                //     </DropdownMenuContent>
                // </DropdownMenu>
            )
        },
    },
]