import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, Camera, Maximize, Package, Check, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const ApartmentListing = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
        <Link href='/table' className='py-2 pt-4 hover:text-[#c3d42c] font-bold text-sm text-gray-600 flex items-center gap-1 cursor-pointer'>
        <ChevronLeft className='w-4 h-4'/>
        Listings
        </Link>
      <h2 className="text-2xl font-bold mb-2">200 E 87th St #15M</h2>
      <div className="flex items-center text-gray-500 mb-4">
        <MapPin size={16} className="mr-1" />
        <span>200 East 87th Street, Upper East Side, Manhattan, NY, 10128</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-14">
        <img src="https://assets-img.funnelstatic.com/unit_photos/originals/e264446cc211ea00d0bdc39cf42ef3e4.jpg?h=380&ixlib=python-1.1.2&s=f879e7ab4a1af9926ae5919a925c265c" alt="Apartment view 1" className="w-full h-80 object-cover" />
        <img src="https://assets-img.funnelstatic.com/unit_photos/originals/e264446cc211ea00d0bdc39cf42ef3e4.jpg?h=380&ixlib=python-1.1.2&s=f879e7ab4a1af9926ae5919a925c265c" alt="Apartment view 1" className="w-full h-80 object-cover" />
      </div>
      
      <div className="flex justify-between items-center mb-4 w-3/5">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="border-gray-300">FOR RENT</Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="border-gray-300">
            <Camera className="mr-1" size={16} /> 14 PHOTOS
          </Button>
          <Button variant="outline" size="sm" className="border-gray-300">
            <Maximize className="mr-1" size={16} /> FLOORPLAN
          </Button>
          <Button variant="outline" size="sm" className="border-gray-300">MAP</Button>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4 w-3/5">
        <div className="flex items-center space-x-2">
          <Package className="text-[#c3d42c] h-5 w-5"/>
          <span className="text-xl">2 Bedroom 2 Bathrooms</span>
        </div>
        <div className="text-right flex items-center">
          <span className="font-bold text-2xl text-[#c3d42c]">$8,400</span>
          <span className="bg-[#c3d42c] text-white text-xs px-2 py-1 rounded ml-2">No Fee</span>
        </div>
      </div>
      
      <div className="flex gap-4 relative">
      <div className="bg-gray-100">
        <div className="p-4 w-4/5 mt-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <h3 className="text-xl font-light">Listing Description</h3>
            </div>
            <div className="col-span-2">
              <p className="font-bold mb-2">Expansive recently renovated two-bedroom apartment.</p>
              <p className="text-sm text-gray-600 mb-4">
                This recently renovated and expansive two-bedroom, two-
                bathroom apartment is framed within a sunny corner layout.
                This apartment has a great flow! Enter through a generous
                vestibule to a well-appointed gourmet kitchen boasting modern
                gloss paneled flat-front cabinetry, high-end stainless steel
                appliances, and sleek gray countertops anchored by a central
                large kitchen island. Easily accessible from the main living area
                are the large bedrooms, master bedroom with an en-suite
                master bathroom and walk-in closet, as well as ample closets
                throughout. With corner windows with above the neighboring
                buildings, the apartment has unencumbered light and serene
                city views.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                200 E 87th St has amenities and common areas including a
                state of the art gym, tenant lounge, and a children's playroom. It
                is a full service building, staffed with 24-hour doorman, super,
                and porter. Conveniently located between Lexington and 3rd on
                87th street & S, and 4 trains and 2nd Ave Q line, the building is
                central to all that the Upper East Side has to offer with an
                abundance of fine restaurants nearby including a Whole Foods
                directly across the street, Equinox fitness, Starbucks, and Shake
                Shack a block away.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                No Fee listing.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Tours are available by appointment.
              </p>
            </div>

            <div className="col-span-1">
              <h3 className="text-xl font-light">Amenities</h3>
            </div>
            <div className="col-span-2">
              <div className="grid grid-cols-2 gap-2 mb-4">
                {['Laundry in Unit', 'Dishwasher', 'Microwave', 'Hardwood Floors', 'Renovated', 'On-Site Laundry', 'Fitness Center', 'Resident Lounge', 'On-Site Management', 'Children\'s Playroom', 'Central Air Conditioning'].map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <Check size={16} className="text-[#c3d42c] mr-2" />
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-1">
              <h3 className="text-xl font-light">Listing Details</h3>
            </div>
            <div className="col-span-2">
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { label: 'Listing ID', value: '3999897' },
                  { label: 'Pet Policy', value: 'Pets Allowed' },
                  { label: 'Floor', value: '15' },
                  { label: 'Building Age', value: 'Post-War' },
                  { label: 'Year Built', value: '1991' },
                  { label: 'Total Floors', value: '23' },
                  { label: 'Units in Building', value: '131' },
                  { label: 'Building Type', value: 'High-Rise' }
                ].map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-sm font-semibold">{label}</dt>
                    <dd className="text-sm">{value}</dd>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-2">
              <h3 className="text-xl font-light">Location</h3>
            </div>
            <div className="col-span-2">
              <div className="mb-4">
                <img src="https://developers.google.com/static/maps/documentation/urls/images/map-no-params.png" alt="Map" className="w-full h-64 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    {/* </div> */}
        <div className="w-1/3 absolute -top-36 right-4 bg-white">
          <div className="border p-4">
            <h3 className="text-xl mb-2">200</h3>
            <p className="text-sm mb-4">EAST 87TH</p>
            <p className="font-bold mb-2">200 E 87th Leasing Team</p>
            <Button className="w-full bg-[#c3d42c] hover:bg-[#879228] text-white">Contact Us</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentListing;