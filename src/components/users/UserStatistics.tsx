"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, User as UserIcon } from 'lucide-react'
import { User } from '@/lib/Application.type'
import UserBadgeStatus from './UserBadgeStatus'

interface UserStatisticsProps {
  user: User
}

export default function UserStatistics({ user }: UserStatisticsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kullanıcı İstatistikleri</CardTitle>
        <CardDescription>
          Kullanıcı hesabı ile ilgili bilgiler.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UserIcon className="h-4 w-4" />
              <span>Kullanıcı ID</span>
            </div>
            <p className="font-medium">{user.id}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Son Güncelleme</span>
            </div>
            <p className="font-medium">{user.updated_at}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Oluşturulma</span>
            </div>
            <p className="font-medium">{user.created_at}</p>
          </div>
          
          {user.last_login && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <UserIcon className="h-4 w-4" />
                <span>Son Giriş</span>
              </div>
              <p className="font-medium">{user.last_login}</p>
            </div>
          )}
        </div>
        
        <Separator />
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Durum</span>
          <Badge variant="outline" className="rounded-lg gap-2 py-1">
            <UserBadgeStatus status={user.status} />
            <span className="text-sm">{user.status}</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
