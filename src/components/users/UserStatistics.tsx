"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Calendar, Clock, User as UserIcon, Ban, UserCheck, AlertTriangle } from 'lucide-react'
import { User, UserStatus } from '@/lib/Application.type'
import UserBadgeStatus from './UserBadgeStatus'

interface UserStatisticsProps {
  user: User
  onUserUpdate?: (updatedUser: User) => void
}

export default function UserStatistics({ user, onUserUpdate }: UserStatisticsProps) {
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false)
  const [banDialogOpen, setBanDialogOpen] = useState(false)
  const [activateDialogOpen, setActivateDialogOpen] = useState(false)

  const handleSuspendUser = () => {
    // TODO: Implement suspend user API call
    console.log('Suspending user:', user.id)
    
    // Simulated user update
    const updatedUser = { ...user, status: UserStatus.SUSPENDED }
    onUserUpdate?.(updatedUser)
    
    setSuspendDialogOpen(false)
  }

  const handleBanUser = () => {
    // TODO: Implement ban user API call
    console.log('Banning user:', user.id)
    
    // Simulated user update
    const updatedUser = { ...user, status: UserStatus.BANNED }
    onUserUpdate?.(updatedUser)
    
    setBanDialogOpen(false)
  }

  const handleActivateUser = () => {
    // TODO: Implement activate user API call
    console.log('Activating user:', user.id)
    
    // Simulated user update
    const updatedUser = { ...user, status: UserStatus.ACTIVE }
    onUserUpdate?.(updatedUser)
    
    setActivateDialogOpen(false)
  }

  // Determine which button to show based on user status
  const getModerationButton = () => {
    if (user.status === UserStatus.BANNED || user.status === UserStatus.SUSPENDED || user.status === UserStatus.INACTIVE) {
      return (
        <AlertDialog open={activateDialogOpen} onOpenChange={setActivateDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full justify-center gap-2 text-green-600 hover:text-green-700 hover:bg-green-50">
              <UserCheck className="h-4 w-4" />
              Yasaklamayı kaldır
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Kullanıcıyı Aktifleştir</AlertDialogTitle>
              <AlertDialogDescription>
                <strong>{user.name}</strong> kullanıcısını aktifleştirmek istediğinizden emin misiniz? 
                Bu işlem kullanıcının hesabını tekrar kullanılabilir hale getirecektir.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>İptal</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleActivateUser}
                className="bg-green-600 hover:bg-green-700"
              >
                Aktifleştir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
    } else if (user.status === UserStatus.ACTIVE) {
      return (
        <AlertDialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full justify-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
              <Ban className="h-4 w-4" />
              Yasakla
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Kullanıcıyı Yasakla</AlertDialogTitle>
              <AlertDialogDescription>
                <strong>{user.name}</strong> kullanıcısını yasaklamak istediğinizden emin misiniz? 
                Bu işlem kullanıcının hesabını kalıcı olarak devre dışı bırakacaktır.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>İptal</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleBanUser}
                className="bg-red-600 hover:bg-red-700"
              >
                Yasakla
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
    }
    return null
  }
  return (
    <Card className="h-full">
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
        <Separator />
        
        {/* Moderation Action */}
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">Moderasyon</span>
          {getModerationButton()}
        </div>
       
      </CardContent>
    </Card>
  )
}
