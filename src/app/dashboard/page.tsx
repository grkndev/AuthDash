
import { columns } from "@/components/apps/columns"
import { Application } from "@/lib/Application.type"
import { DataTable } from "@/components/apps/DataTable"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Box, CircleCheck, Server, TrendingUp, Users } from "lucide-react"
import dummyData from "@/lib/dummyData"


async function getData(): Promise<Application[]> {
  // Fetch data from your API here.
  return dummyData
}

export default async function Page() {
  const data = await getData()
  return (
    
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid  gap-4 md:grid-cols-3">
            <Card className="flex flex-row items-center h-fit justify-between px-4">
              <div className="flex flex-col items-start justify-center ">
                <div className="flex flex-row items-center gap-2">
                  <h1 className="text-lg text-zinc-500">Aktif kullanıcılar</h1>
                  <Badge variant={"outline"} className="flex flex-row items-center gap-2 py-1 rounded-full">
                    <TrendingUp className="w-4 h-4 text-green-800" />
                    <span>10%</span>
                  </Badge>
                </div>
                <p className="text-4xl font-bold">100</p>

              </div>
              <div className="flex items-center bg-blue-200/75 rounded-xl h-fit w-fit p-4">
                <Users className="text-blue-500 w-10 h-10" />
              </div>
            </Card>
            <Card className="flex flex-row items-center h-fit justify-between px-4">
              <div className="flex flex-col items-start justify-center ">
                <h1 className="text-lg text-zinc-500">Aktif Uygulamalar</h1>
                <p className="text-4xl font-bold">1</p>

              </div>
              <div className="flex items-center bg-orange-200/75 rounded-xl h-fit w-fit p-4">
                <Box className="text-orange-500 w-10 h-10" />
              </div>
            </Card>

            <Card className="flex flex-row items-center h-fit justify-between px-4">
              <div className="flex flex-col items-start justify-center ">
                <div className="flex flex-row items-center gap-2">
                  <h1 className="text-lg text-zinc-500">Sunucu durumu</h1>
                  <Badge variant={"outline"} className="flex flex-row items-center gap-2 py-1 rounded-full">
                    <CircleCheck className="w-4 h-4 text-green-800" />
                    <span>Sistemler normal</span>
                  </Badge>
                </div>
                <p className="text-4xl font-bold">Aktif</p>

              </div>
              <div className="flex items-center bg-green-200/75 rounded-xl h-fit w-fit p-4">
                <Server className="text-green-500 w-10 h-10" />
              </div>
            </Card>
          </div>
          <div className="bg-card min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
    
  )
}
