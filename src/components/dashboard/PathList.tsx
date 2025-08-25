"use client"
import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation'

export default function PathList() {
    const pathname = usePathname()
    const pathParts = pathname.split('/').filter(Boolean)
    const currentPath = pathParts.length > 1 ? pathParts[pathParts.length - 1] : "Home"
    const currentPathTitle = currentPath.charAt(0).toUpperCase() + currentPath.slice(1)
    
  return (
    <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem className="hidden md:block">
        <BreadcrumbLink href="/dashboard">
          Dashboard
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator className="hidden md:block" />
      <BreadcrumbItem>
        <BreadcrumbPage>{currentPathTitle}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
  )
}