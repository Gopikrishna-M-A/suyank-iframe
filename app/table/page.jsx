"use client"
import React, { useEffect, useState } from "react"
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
import Link from "next/link"

const ApartmentListingsTable = () => {
  // const searchParams = useSearchParams()
  const [apartmentData, setApartmentData] = useState([
    {
      unit: "15M",
      layout: "2 Bedroom",
      baths: "2 BA",
      price: "$8,400",
      floorplanImage:
        "https://assets-img.nestiostatic.com/unit_photos/originals/8f7447efc37050fba59bbe4b595752b0.pdf?bg=fff&fit=max&fm=png&h=1000&w=1000&s=d905c407b1bf1484844d1b58e2f62e9c",
    },
    {
      unit: "15E",
      layout: "2 Bedroom",
      baths: "2 BA",
      price: "$8,002",
      floorplanImage:
        "https://assets-img.nestiostatic.com/unit_photos/originals/8f7447efc37050fba59bbe4b595752b0.pdf?bg=fff&fit=max&fm=png&h=1000&w=1000&s=d905c407b1bf1484844d1b58e2f62e9c",
    },
    {
      unit: "11E",
      layout: "2 Bedroom",
      baths: "2 BA",
      price: "$8,250",
      floorplanImage:
        "https://assets-img.nestiostatic.com/unit_photos/originals/8f7447efc37050fba59bbe4b595752b0.pdf?bg=fff&fit=max&fm=png&h=1000&w=1000&s=d905c407b1bf1484844d1b58e2f62e9c",
    },
    {
      unit: "9E",
      layout: "2 Bedroom",
      baths: "2 BA",
      price: "$8,150",
      floorplanImage:
        "https://assets-img.nestiostatic.com/unit_photos/originals/8f7447efc37050fba59bbe4b595752b0.pdf?bg=fff&fit=max&fm=png&h=1000&w=1000&s=d905c407b1bf1484844d1b58e2f62e9c",
    },
    {
      unit: "17F",
      layout: "1 Bedroom",
      baths: "1 BA",
      price: "$5,300",
      floorplanImage:
        "https://assets-img.nestiostatic.com/unit_photos/originals/8f7447efc37050fba59bbe4b595752b0.pdf?bg=fff&fit=max&fm=png&h=1000&w=1000&s=d905c407b1bf1484844d1b58e2f62e9c",
    },
    {
      unit: "17B",
      layout: "Studio",
      baths: "1 BA",
      price: "$3,975",
      floorplanImage:
        "https://assets-img.nestiostatic.com/unit_photos/originals/8f7447efc37050fba59bbe4b595752b0.pdf?bg=fff&fit=max&fm=png&h=1000&w=1000&s=d905c407b1bf1484844d1b58e2f62e9c",
    },
    {
      unit: "11L",
      layout: "Studio",
      baths: "1 BA",
      price: "$3,975",
      floorplanImage:
        "https://assets-img.nestiostatic.com/unit_photos/originals/8f7447efc37050fba59bbe4b595752b0.pdf?bg=fff&fit=max&fm=png&h=1000&w=1000&s=d905c407b1bf1484844d1b58e2f62e9c",
    },
    {
      unit: "9K",
      layout: "Studio",
      baths: "1 BA",
      price: "$3,900",
      floorplanImage:
        "https://assets-img.nestiostatic.com/unit_photos/originals/8f7447efc37050fba59bbe4b595752b0.pdf?bg=fff&fit=max&fm=png&h=1000&w=1000&s=d905c407b1bf1484844d1b58e2f62e9c",
    },
    {
      unit: "17G",
      layout: "Studio",
      baths: "1 BA",
      price: "$3,900",
      floorplanImage:
        "https://assets-img.nestiostatic.com/unit_photos/originals/8f7447efc37050fba59bbe4b595752b0.pdf?bg=fff&fit=max&fm=png&h=1000&w=1000&s=d905c407b1bf1484844d1b58e2f62e9c",
    },
  ])

  // useEffect(() => {
  //   const dataset = searchParams.get("dataset")
  //   const projectId = searchParams.get("projectId")
  //   const apiVersion = searchParams.get("apiVersion") || "2021-10-21"
  // }, [searchParams])

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
                <Link href='/table/1'>{apartment.unit}</Link>
              </TableCell>
              <TableCell><Link href='/table/1'>{apartment.layout}</Link></TableCell>
              <TableCell className='hidden md:table-cell'>
                <Link href='/table/1'>{apartment.baths}</Link>
              </TableCell>
              <TableCell>
              <Link href='/table/1'>
              <span className='font-medium text-[#c3d42c]'>
                  {apartment.price}
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

export default ApartmentListingsTable
