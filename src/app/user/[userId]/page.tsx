"use client"

import React, { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft } from 'lucide-react'
import { User, UserRole, Application } from '@/lib/Application.type'
import { dummyUsers } from '@/lib/dummyData'
import dummyData from '@/lib/dummyData'
import UserProfileHeader from '@/components/users/UserProfileHeader'
import UserEditForm from '@/components/users/UserEditForm'
import UserStatistics from '@/components/users/UserStatistics'
import UserApplicationsTable from '@/components/users/UserApplicationsTable'

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

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser)
    // Gerçek uygulamada API'ye gönderilecek
    console.log('User updated:', updatedUser)
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
        
        <UserProfileHeader user={user} />
      </div>

      <Separator />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <UserEditForm 
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
        
        <UserStatistics 
          user={user} 
          onUserUpdate={handleUserUpdate}
        />
      </div>

      <Separator />

      <UserApplicationsTable applications={userApps} />
    </div>
  )
}
