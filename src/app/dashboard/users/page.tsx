import React from 'react'
import { columns } from "@/components/users/columns"
import { User } from "@/lib/Application.type"
import { UserDataTable } from "@/components/users/UserDataTable"
import { Users } from "lucide-react"
import { dummyUsers } from "@/lib/dummyData"

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return dummyUsers
}

export default async function UsersPage() {
  const data = await getData()
  

  return (
    <div className="flex flex-1 flex-col gap-2 p-4 pt-0">
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
                <Users className="w-6 h-6 stroke-3" />
                <h1 className="text-xl font-medium">Kullanıcılar</h1>
            </div>
        </div>
      <div className="bg-card min-h-[100vh] flex-1 rounded-xl md:min-h-min">
        <UserDataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
