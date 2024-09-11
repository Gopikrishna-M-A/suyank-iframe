"use client"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Camera,
  Maximize,
  Package,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useSearchParams } from "next/navigation"
import { createClient } from "@sanity/client"

const ApartmentListing = ({ params }) => {
  const [data, setData] = useState()
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [isPhotosDialogOpen, setIsPhotosDialogOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [formData, setFormData] = useState({
    isBroker: false,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    moveInDate: "",
    minPrice: "",
    maxPrice: "",
    notes: "",
  })

  const searchParams = useSearchParams()

  useEffect(() => {
    const dataset = searchParams.get("dataset")
    const projectId = searchParams.get("projectId")
    const apiVersion = searchParams.get("apiVersion") || "2021-10-21"


    if (dataset && projectId) {
      const client = createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
      })

      const fetchSanityData = async () => {
        try {
          // const query = `*[_type == "client"]`;
          const query = `*[_type == "client" && _id == "971bad93-04a5-48e5-a511-bf356e7094ed"]{
            templateFields {
            availability {
              units[_key == "${params.key}"][0] {
                _key,
                heading,
                unit,
                layout,
                baths,
                price,
                fee,
                "floorplanImage": floorplan.asset->url,
                images[] {
                  "url": asset->url
                },
                listingDescription,
                amenities,
                listingDetails,
                location
              }
            }
          }
        }[0]`
          const result = await client.fetch(query)
          console.log(result.templateFields.availability.units)
          setData(result.templateFields.availability.units)
        } catch (error) {
          console.error("Error fetching data from Sanity:", error)
        }
      }

      fetchSanityData()
    } else {
      console.log("Sanity project ID or dataset not provided in URL parameters")
    }
  }, [searchParams])

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (checked) => {
    setFormData((prevData) => ({
      ...prevData,
      isBroker: checked,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setIsContactDialogOpen(false)
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === data?.images?.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? data?.images?.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <Link
        href='/table'
        className='py-2 pt-4 hover:text-[#c3d42c] font-bold text-sm text-gray-600 flex items-center gap-1 cursor-pointer'>
        <ChevronLeft className='w-4 h-4' />
        Listings
      </Link>
      <h2 className='text-2xl font-bold mb-2'>{data?.location?.address?.split(',')?.[0]}</h2>
      <div className='flex items-center text-gray-500 mb-4'>
        <MapPin size={16} className='mr-1' />
        <span>{data?.location?.address}</span>
      </div>

      <div className='grid md:grid-cols-2 gap-2 mb-14'>
        <Image
          src={data?.images?.[0]?.url}
          alt='Apartment view 1'
          width={500}
          height={320}
          className='w-full h-80 object-cover cursor-pointer hover:shadow-sm rounded'
          onClick={()=>setIsPhotosDialogOpen(true)}
        />
        <Image
          src={data?.images?.[1].url}
          alt='Apartment view 2'
          width={500}
          height={320}
          className='w-full h-80 object-cover cursor-pointer hover:shadow-sm rounded'
          onClick={()=>setIsPhotosDialogOpen(true)}
        />
      </div>

      <div className='flex justify-between items-center mb-4 md:w-3/5'>
        <div className='flex space-x-2'>
          <Button variant='ghost' size='sm' className='border-gray-300'>
            FOR RENT
          </Button>
        </div>
        <div className='flex space-x-2'>
          <Dialog
            open={isPhotosDialogOpen}
            onOpenChange={setIsPhotosDialogOpen}>
            <DialogTrigger asChild>
              <Button variant='outline' size='sm' className='border-gray-300'>
                <Camera className='mr-1' size={16} /> 14 PHOTOS
              </Button>
            </DialogTrigger>
            <DialogContent className='bg-white max-w-3xl'>
              <DialogHeader>
                <DialogTitle>Apartment Photos</DialogTitle>
              </DialogHeader>
              <div className='relative'>
                <Image
                  src={data?.images?.[currentPhotoIndex]?.url}
                  alt={`Apartment photo ${currentPhotoIndex + 1}`}
                  width={800}
                  height={600}
                  className='w-full h-auto'
                />
                <Button
                  variant='secondary'
                  size='icon'
                  className='absolute top-1/2 left-2 transform -translate-y-1/2'
                  onClick={prevPhoto}>
                  <ChevronLeft className='h-4 w-4' />
                </Button>
                <Button
                  variant='secondary'
                  size='icon'
                  className='absolute top-1/2 right-2 transform -translate-y-1/2'
                  onClick={nextPhoto}>
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
              <p className='text-center mt-2'>
                Photo {currentPhotoIndex + 1} of {data?.images?.length}
              </p>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant='outline' size='sm' className='border-gray-300'>
                <Maximize className='mr-1' size={16} /> FLOORPLAN
              </Button>
            </DialogTrigger>
            <DialogContent className='bg-white'>
              <DialogHeader>
                <DialogTitle>Floorplan for Unit</DialogTitle>
              </DialogHeader>
              <img
                src={data?.floorplanImage}
                alt={`Floorplan for Unit`}
                className='w-full h-auto'
              />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='outline' size='sm' className='border-gray-300'>
                MAP
              </Button>
            </DialogTrigger>
            <DialogContent className='bg-white'>
              <DialogHeader>
                <DialogTitle>Location Map</DialogTitle>
              </DialogHeader>
              <iframe src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15716.428149624777!2d${data?.location?.coordinates?.lng}!3d${data?.location?.coordinates?.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1726056322734!5m2!1sen!2sin`} className="rounded border shadow-sm w-full h-full min-h-96" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className='flex justify-between items-center mb-4 md:w-3/5'>
        <div className='flex items-center space-x-2'>
          <Package className='text-[#c3d42c] h-5 w-5' />
          <span className='text-xl'>{data?.layout}  {data?.baths}</span>
        </div>
        <div className='text-right flex items-center'>
          <span className='font-bold text-2xl text-[#c3d42c]'>
            ${data?.price}
          </span>
          <span className='bg-[#c3d42c] text-white text-xs px-2 py-1 rounded ml-2 capitalize'>
            {data?.fee}
          </span>
        </div>
      </div>

      <div className='flex flex-col-reverse  md:flex-row  gap-4 relative'>
        <div className='bg-gray-100'>
          <div className='p-4 md:w-4/5 mt-6'>
            <div className='grid grid-cols-2 xl:grid-cols-3 gap-4'>
              <div className='col-span-1'>
                <h3 className='text-xl font-light'>Listing Description</h3>
              </div>
              <div className='col-span-2'>
                <p className='text-sm text-gray-600 mb-4'>
                  {data?.listingDescription}
                </p>
              </div>

              <div className='col-span-1'>
                <h3 className='text-xl font-light'>Amenities</h3>
              </div>
              <div className='col-span-2'>
                <div className='grid grid-cols-2 gap-2 mb-4'>
                  {data?.amenities?.map((amenity) => (
                    <div key={amenity} className='flex items-center'>
                      <Check size={16} className='text-[#c3d42c] mr-2' />
                      <span className='text-sm'>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='col-span-1'>
                <h3 className='text-xl font-light'>Listing Details</h3>
              </div>
              <div className='col-span-2'>
                <div className='grid grid-cols-2 gap-4 mb-4'>
                  {[
                    { label: "Listing ID", value: data?.listingDetails?.listingId },
                    { label: "Pet Policy", value: data?.listingDetails?.petPolicy },
                    { label: "Floor", value: data?.listingDetails?.floor },
                    { label: "Building Age", value: data?.listingDetails?.buildingAge },
                    { label: "Year Built", value: data?.listingDetails?.yearBuilt },
                    { label: "Total Floors", value: data?.listingDetails?.totalFloors },
                    { label: "Units in Building", value: data?.listingDetails?.unitsInBuilding },
                    { label: "Building Type", value: data?.listingDetails?.buildingType },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <dt className='text-sm font-semibold'>{label}</dt>
                      <dd className='text-sm'>{value}</dd>
                    </div>
                  ))}
                </div>
              </div>

              <div className='col-span-2'>
                <h3 className='text-xl font-light'>Location</h3>
              </div>
              <div className='col-span-2'>
                <div className='mb-4'>
                  <iframe src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15716.428149624777!2d${data?.location?.coordinates?.lng}!3d${data?.location?.coordinates?.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1726056322734!5m2!1sen!2sin`} width="600" height="450" className="rounded border shadow-sm" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className='md:w-1/3 md:absolute -top-36 right-4 bg-white'>
          <div className='border p-4'>
            <h3 className='text-xl mb-2'>200</h3>
            <p className='text-sm mb-4'>EAST 87TH</p>
            <p className='font-bold mb-2'>200 E 87th Leasing Team</p>
            <Dialog
              open={isContactDialogOpen}
              onOpenChange={setIsContactDialogOpen}>
              <DialogTrigger asChild>
                <Button className='w-full bg-[#c3d42c] hover:bg-[#879228] text-white'>
                  Contact Us
                </Button>
              </DialogTrigger>
              <DialogContent className='bg-white'>
                <DialogHeader>
                  <DialogTitle>Request Information</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='isBroker'
                      checked={formData.isBroker}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <Label htmlFor='isBroker' className='text-sm'>
                      I&apos;M A BROKER
                    </Label>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <Input
                      type='text'
                      name='firstName'
                      placeholder='FIRST NAME'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type='text'
                      name='lastName'
                      placeholder='LAST NAME'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Input
                    type='email'
                    name='email'
                    placeholder='EMAIL'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    type='tel'
                    name='phoneNumber'
                    placeholder='PHONE NUMBER'
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                  <div>
                    <p className='text-xs text-gray-400'>
                      By entering your phone number and clicking “Request
                      Information”, you consent to receiving calls and texts on
                      behalf of via automatic dialing or other technology about
                      apartment listings that may fit your needs. Your consent
                      is not required to enter into a rental transaction or make
                      any purchase. Reply STOP to cancel any time.
                    </p>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='moveInDate'>MOVE IN DATE</Label>
                    <Input
                      type='date'
                      id='moveInDate'
                      name='moveInDate'
                      value={formData.moveInDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <Input
                      type='number'
                      name='minPrice'
                      placeholder='MIN PRICE'
                      value={formData.minPrice}
                      onChange={handleInputChange}
                    />
                    <Input
                      type='number'
                      name='maxPrice'
                      placeholder='MAX PRICE'
                      value={formData.maxPrice}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Textarea
                    name='notes'
                    placeholder='NOTES'
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                  <Button
                    type='submit'
                    className='w-full bg-[#c3d42c] hover:bg-[#879228] text-white'>
                    REQUEST INFORMATION
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApartmentListing
