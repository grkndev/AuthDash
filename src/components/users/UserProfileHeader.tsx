"use client"

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Mail, Shield } from 'lucide-react'
import { User, UserRole } from '@/lib/Application.type'
import UserBadgeStatus from './UserBadgeStatus'

interface UserProfileHeaderProps {
  user: User
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

export default function UserProfileHeader({ user }: UserProfileHeaderProps) {
  return (
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
  )
}
