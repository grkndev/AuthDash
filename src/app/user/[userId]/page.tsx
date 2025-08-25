"use client"

import React, { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Save, ArrowLeft, Mail, Calendar, Clock, User as UserIcon, Shield, ChevronRight } from 'lucide-react'
import { User, UserRole, UserStatus, Application } from '@/lib/Application.type'
import { dummyUsers } from '@/lib/dummyData'
import dummyData from '@/lib/dummyData'
import UserBadgeStatus from '@/components/users/UserBadgeStatus'
import AppBadgeStatus from '@/components/apps/AppBadgeStatus'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DataTable } from '@/components/apps/DataTable'
import { ColumnDef } from '@tanstack/react-table'

export default function UserPage({ params }: { params: Promise<{ userId: string }> }) {
  const router = useRouter()
  const { userId } = use(params)
  const [user, setUser] = useState<User | null>(null)
  const [userApps, setUserApps] = useState<Application[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: UserRole.USER
  })

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

  useEffect(() => {
    // Gerçek uygulamada API'den veri çekilecek
    const foundUser = dummyUsers.find(u => u.id === userId)
    if (foundUser) {
      setUser(foundUser)
      setFormData({
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      })
      
      // Kullanıcının oluşturduğu uygulamaları bul
      const apps = dummyData.filter(app => app.author.id === foundUser.id)
      setUserApps(apps)
    }
  }, [userId])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    // Gerçek uygulamada API'ye gönderilecek
    console.log('Form submitted:', formData)
    alert('Kullanıcı bilgileri güncellendi!')
  }

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case UserRole.MODERATOR:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case UserRole.DEVELOPER:
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  if (!user) {
    return <div className="p-6">Kullanıcı bulunamadı.</div>
  }

  return (
    <div className="container max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="p-0 h-auto text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Geri Dön
        </Button>
        
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image} />
            <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <Badge variant="outline" className="rounded-lg gap-2 py-1.5">
                <UserBadgeStatus status={user.status} />
                <span className="text-sm font-semibold">{user.status}</span>
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
            
            <Badge className={getRoleBadgeColor(user.role)}>
              <Shield className="h-3 w-3 mr-1" />
              {user.role}
            </Badge>
          </div>
        </div>
        
        
      </div>

      <Separator />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column - User Details Form */}
        <Card>
          <CardHeader>
            <CardTitle>Kullanıcı Detayları</CardTitle>
            <CardDescription>
              Kullanıcının genel bilgilerini düzenleyin.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">İsim</label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Kullanıcı adını girin"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="email@example.com"
                type="email"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Rol</label>
              <select 
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full p-2 border border-input bg-background rounded-md"
              >
                <option value={UserRole.USER}>User</option>
                <option value={UserRole.DEVELOPER}>Developer</option>
                <option value={UserRole.MODERATOR}>Moderator</option>
                <option value={UserRole.ADMIN}>Admin</option>
              </select>
            </div>

            <div className="pt-4">
              <Button onClick={handleSubmit} className="gap-2 w-full">
                <Save className="h-4 w-4" />
                Değişiklikleri Kaydet
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - User Statistics */}
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
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UserIcon className="h-4 w-4" />
                  <span>Son Giriş</span>
                </div>
                <p className="font-medium">{user.last_login}</p>
              </div>
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
      </div>

      <Separator />

      {/* User's Applications - Independent Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Oluşturduğu Uygulamalar</h2>
          <p className="text-muted-foreground">
            Bu kullanıcının oluşturduğu uygulamalar ({userApps.length} adet).
          </p>
        </div>
        
        {userApps.length > 0 ? (
          <div className="rounded-lg border bg-card px-2">
            <DataTable columns={userAppColumns} data={userApps} />
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
    </div>
  )
}
