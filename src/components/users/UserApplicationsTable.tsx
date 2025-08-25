"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, User as UserIcon } from 'lucide-react'
import { Application } from '@/lib/Application.type'
import { DataTable } from '@/components/apps/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import AppBadgeStatus from '@/components/apps/AppBadgeStatus'
import { useRouter } from 'next/navigation'

interface UserApplicationsTableProps {
  applications: Application[]
}

export default function UserApplicationsTable({ applications }: UserApplicationsTableProps) {
  const router = useRouter()

  // Kullanıcı uygulamaları için kolon tanımlamaları
  const userAppColumns: ColumnDef<Application>[] = [
    {
      accessorKey: "name",
      header: "Uygulama Adı",
    },
    {
      header: "Durum",
      cell: ({ row }) => {
        const app = row.original
        return (
          <Badge variant="outline" className="rounded-lg gap-2">
            <AppBadgeStatus status={app.status} />
            <span className="text-xs font-semibold">{app.status}</span>
          </Badge>
        )
      },
    },
    {
      accessorKey: "created_at",
      header: "Oluşturulma",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const app = row.original
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/application/${app.id}`)}
            className="gap-2"
          >
            Görüntüle
            <ChevronRight className="h-3 w-3" />
          </Button>
        )
      },
    },
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Oluşturduğu Uygulamalar</h2>
        <p className="text-muted-foreground">
          Bu kullanıcının oluşturduğu uygulamalar ({applications.length} adet).
        </p>
      </div>
      
      {applications.length > 0 ? (
        <div className="rounded-lg border bg-card px-2">
          <DataTable columns={userAppColumns} data={applications} />
        </div>
      ) : (
        <div className="rounded-lg border bg-card p-8">
          <div className="text-center text-muted-foreground">
            <UserIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Henüz oluşturulmuş uygulama yok.</p>
          </div>
        </div>
      )}
    </div>
  )
}
