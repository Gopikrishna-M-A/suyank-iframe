'use client'
import React, { useEffect, useState } from 'react';
import { LayoutIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearchParams } from 'next/navigation';

const ApartmentListingsTable = () => {
  const searchParams = useSearchParams()
  const [apartmentData, setApartmentData] = useState([
    { unit: '15M', layout: '2 Bedroom', baths: '2 BA', price: '$8,400' },
    { unit: '15E', layout: '2 Bedroom', baths: '2 BA', price: '$8,002' },
    { unit: '11E', layout: '2 Bedroom', baths: '2 BA', price: '$8,250' },
    { unit: '9E', layout: '2 Bedroom', baths: '2 BA', price: '$8,150' },
    { unit: '17F', layout: '1 Bedroom', baths: '1 BA', price: '$5,300' },
    { unit: '17B', layout: 'Studio', baths: '1 BA', price: '$3,975' },
    { unit: '11L', layout: 'Studio', baths: '1 BA', price: '$3,975' },
    { unit: '9K', layout: 'Studio', baths: '1 BA', price: '$3,900' },
    { unit: '17G', layout: 'Studio', baths: '1 BA', price: '$3,900' },
  ])

  const [sortOrder, setSortOrder] = useState("most-expensive")
  const [sanityClient, setSanityClient] = useState(null)
  
  useEffect(() => {
    const dataset = searchParams.get("dataset")
    const projectId = searchParams.get("projectId")
    const apiVersion = searchParams.get("apiVersion") || "2021-10-21"
  }, [searchParams])

  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <Select defaultValue="most-expensive">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="most-expensive">Most Expensive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-medium text-gray-500">Unit</TableHead>
            <TableHead className="font-medium text-gray-500">Layout</TableHead>
            <TableHead className="hidden md:table-cell font-medium text-gray-500">Baths</TableHead>
            <TableHead className="font-medium text-gray-500">Price</TableHead>
            <TableHead className="hidden md:table-cell font-medium text-gray-500">Floorplan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apartmentData.map((apartment, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-green-500">{apartment.unit}</TableCell>
              <TableCell>{apartment.layout}</TableCell>
              <TableCell className="hidden md:table-cell">{apartment.baths}</TableCell>
              <TableCell>
                <span className="font-medium text-green-500">{apartment.price}</span>
                <span className="ml-2 bg-green-100 text-green-600 py-1 px-2 rounded-full text-xs">No Fee</span>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <LayoutIcon className="h-5 w-5 text-gray-400" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 text-xs text-gray-400">Powered by Blahh</div>
    </div>
  );
};

export default ApartmentListingsTable;


