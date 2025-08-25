"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import { UserRole } from '@/lib/Application.type'

interface UserEditFormProps {
  formData: {
    name: string
    email: string
    role: UserRole
  }
  onInputChange: (field: string, value: string) => void
  onSubmit: () => void
}

export default function UserEditForm({ formData, onInputChange, onSubmit }: UserEditFormProps) {
  return (
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
            onChange={(e) => onInputChange('name', e.target.value)}
            placeholder="Kullanıcı adını girin"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            placeholder="email@example.com"
            type="email"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Rol</label>
          <select 
            value={formData.role}
            onChange={(e) => onInputChange('role', e.target.value)}
            className="w-full p-2 border border-input bg-background rounded-md"
          >
            <option value={UserRole.USER}>User</option>
            <option value={UserRole.DEVELOPER}>Developer</option>
            <option value={UserRole.MODERATOR}>Moderator</option>
            <option value={UserRole.ADMIN}>Admin</option>
          </select>
        </div>

        <div className="pt-4">
          <Button onClick={onSubmit} className="gap-2 w-full">
            <Save className="h-4 w-4" />
            Değişiklikleri Kaydet
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
