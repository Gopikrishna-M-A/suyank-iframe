"use client"
import React, { Suspense, useEffect, useState } from "react"
import { LayoutIcon } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useSearchParams } from "next/navigation"
import { DialogDescription } from "@radix-ui/react-dialog"
import { createClient } from '@sanity/client'
import Link from "next/link"

const ApartmentTableContent = () => {
  const searchParams = useSearchParams()
  const [apartmentData, setApartmentData] = useState([])
  const [dataset,setDataSet] = useState()
  const [projectId,setProjectId] = useState()
  const [apiVersion,setApiVersion] = useState()

  useEffect(() => {
    
    const datasetParam = searchParams.get("dataset")
    const projectIdParam = searchParams.get("projectId")
    const apiVersionParam = searchParams.get("apiVersion")

    setDataSet(datasetParam)
    setProjectId(projectIdParam)
    setApiVersion(apiVersionParam)

    if (datasetParam && projectIdParam) {
      const client = createClient({
        projectId:projectIdParam,
        dataset:datasetParam,
        apiVersion:apiVersionParam,
        useCdn: false,
      })

      const fetchSanityData = async () => {
        try {
          // const query = `*[_type == "client"]`;
          const query = `*[_type == "client" && _id == "971bad93-04a5-48e5-a511-bf356e7094ed"]{
            templateFields {
              availability {
                units[] {
                  _key,
                  unit,
                  layout,
                  baths,
                  price,
                  fee,
                  "floorplanImage": floorplan.asset->url
                }
              }
            }
          }`
          const result = await client.fetch(query)
          setApartmentData(result[0].templateFields.availability.units)
          console.log(result[0].templateFields.availability.units)
        } catch (error) {
          console.error('Error fetching data from Sanity:', error)
        }
      }

      fetchSanityData()
    } else {
      console.log('Sanity project ID or dataset not provided in URL parameters')
    }
  }, [searchParams])
  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-end mb-4 items-center gap-2'>
        <div className='text-xs'>sort by</div>
        <Select defaultValue='most-expensive'>
          <SelectTrigger className='w-[180px] border-none shadow-none px-0 justify-normal gap-2 font-bold text-[#88941e] text-xs'>
            <SelectValue placeholder='Sort By' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='most-expensive'>Most Expensive</SelectItem>
            <SelectItem value='least-expensive'>Least Expensive</SelectItem>
            <SelectItem value='recently-updated'>Recently Updated</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow className='bg-gray-50'>
            <TableHead className='font-medium text-gray-500'>Unit</TableHead>
            <TableHead className='font-medium text-gray-500'>Layout</TableHead>
            <TableHead className='hidden md:table-cell font-medium text-gray-500'>
              Baths
            </TableHead>
            <TableHead className='font-medium text-gray-500'>Price</TableHead>
            <TableHead className='hidden md:table-cell font-medium text-gray-500'>
              Floorplan
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apartmentData.map((apartment, index) => (
            <TableRow key={index}>
              <TableCell className='font-medium text-[#c3d42c]'>
                <Link href={`/table/${apartment._key}?dataset=${dataset}&projectId=${projectId}&apiVersion=${apiVersion}`}>{apartment.unit}</Link>
              </TableCell>
              <TableCell><Link  href={`/table/${apartment._key}?dataset=${dataset}&projectId=${projectId}&apiVersion=${apiVersion}`}>{apartment.layout}</Link></TableCell>
              <TableCell className='hidden md:table-cell'>
                <Link  href={`/table/${apartment._key}?dataset=${dataset}&projectId=${projectId}&apiVersion=${apiVersion}`}>{apartment.baths}</Link>
              </TableCell>
              <TableCell>
              <Link  href={`/table/${apartment._key}?dataset=${dataset}&projectId=${projectId}&apiVersion=${apiVersion}`}>
              <span className='font-medium text-[#c3d42c]'>
                  ${apartment.price || 0}
                </span>
                <span className='ml-2 bg-[#c3d42c] text-white py-1 px-2 text-xs'>
                  No Fee
                </span>
              </Link> 
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                <Dialog>
                  <DialogTrigger asChild>
                    <LayoutIcon className='h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer' />
                  </DialogTrigger>
                  <DialogContent className='bg-white'>
                    <DialogHeader>
                      <DialogTitle>
                        Floorplan for Unit {apartment.unit}
                      </DialogTitle>
                    </DialogHeader>
                    <img
                      src={apartment.floorplanImage}
                      alt={`Floorplan for Unit ${apartment.unit}`}
                      className='w-full h-auto'
                    />
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='mt-4 text-xs text-gray-400'>Powered by Blahh</div>
    </div>
  )
}


const ApartmentListingsTable = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApartmentTableContent />
    </Suspense>
  );
};

export default ApartmentListingsTable
