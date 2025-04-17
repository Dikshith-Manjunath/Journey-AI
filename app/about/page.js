/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import Link from 'next/link';

const AboutUs = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Dikshith M",
            role: "Student at DSCE",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet nisl.",
            image: "/images/team/member1.jpg"
        },
        {
            id: 2,
            name: "Dhyani Kinjal",
            role: "Student at DSCE",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet nisl.",
            image: "/images/team/member2.jpg"
        },
        {
            id: 3,
            name: "Chetan S",
            role: "Student at DSCE",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet nisl.",
            image: "/images/team/member3.jpg"
        },
        {
            id: 4,
            name: "Bhoomika",
            role: "Student at DSCE",
            bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet nisl.",
            image: "/images/team/member4.jpg"
        }
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-[#edf6f5] opacity-70"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#222] mb-6">About Us</h1>
                        <div className="w-20 h-1 bg-[#0aa8a7] mx-auto mb-6"></div>
                        <p className="text-lg text-[#777] mb-8">
                            We&apos;re passionate travelers dedicated to helping you discover the world&apos;s most amazing destinations
                            with carefully curated itineraries tailored to your preferences.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="md:w-1/2">
                            <img
                                src="/images/collegeImage.jpg"
                                alt="Our journey"
                                className="rounded-lg shadow-md w-full h-auto"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold text-[#222] mb-4">Our Story</h2>
                            <div className="w-16 h-1 bg-[#0aa8a7] mb-6"></div>
                            <p className="text-[#777] mb-4">
                                We are Team Journey AI, a group of passionate students from Dayananda Sagar College of Engineering (DSCE) driven by curiosity and a love for solving real-world problems. As avid travelers and tech enthusiasts, we often found ourselves frustrated by one common issue—finding well-structured, reliable travel itineraries tailored to specific timeframes.

                                So, we decided to build a solution.

                            </p>
                            <p className="text-[#777]">
                                Journey AI was born out of the idea that travel planning should be effortless, exciting, and personalized. This web app uses smart algorithms to generate precise, efficient travel itineraries based on your chosen destination and the number of days you want to travel. No more aimless Googling, jumbled plans, or last-minute stress.

                                Whether it&apos;s a weekend getaway or a week-long adventure, Journey AI is your trusted co-pilot in exploring the world the right way.

                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="py-16 bg-[#edf6f5]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold text-[#222] mb-4">Our Mission & Values</h2>
                        <div className="w-16 h-1 bg-[#0aa8a7] mx-auto mb-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#edf6f5] rounded-full mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0aa8a7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#222] mb-2">Authentic Experiences</h3>
                            <p className="text-[#777]">
                                We believe in creating genuine travel experiences that connect you with local cultures
                                and communities around the world.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#edf6f5] rounded-full mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0aa8a7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#222] mb-2">Responsible Travel</h3>
                            <p className="text-[#777]">
                                We&apos;re committed to sustainable tourism practices that respect and preserve
                                the environments and communities we visit.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#edf6f5] rounded-full mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0aa8a7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#222] mb-2">Personalized Service</h3>
                            <p className="text-[#777]">
                                We customize each itinerary to match your unique travel style, interests, and budget for
                                a truly personalized adventure.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team */}
            <section className="py-16 container mx-auto px-4">
                <div className="text-center mb-14">
                    <h2 className="text-3xl font-bold text-[#222] mb-4">Meet Our Team</h2>
                    <div className="w-16 h-1 bg-[#0aa8a7] mx-auto mb-6"></div>
                    <p className="text-[#777] max-w-2xl mx-auto">
                        Our passionate team of travel experts is dedicated to crafting unforgettable journeys
                        tailored to your unique interests and preferences.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {teamMembers.map((member) => (
                        <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                            <div className="aspect-square overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#222] mb-1">{member.name}</h3>
                                <p className="text-[#0aa8a7] font-medium mb-3">{member.role}</p>
                                <p className="text-sm text-[#777]">{member.bio}</p>
                                <div className="flex space-x-3 mt-4">
                                    <a href="#" className="text-[#777] hover:text-[#0aa8a7]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-[#777] hover:text-[#0aa8a7]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-[#777] hover:text-[#0aa8a7]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-[#0aa8a7] text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
                    <p className="text-lg max-w-2xl mx-auto mb-8">
                        Let us help you plan the perfect trip tailored to your preferences and interests.
                    </p>
                    <button className="bg-white text-[#0aa8a7] px-8 py-3 rounded-md font-bold hover:bg-[#edf6f5] transition-colors duration-300">
                        <Link href={"/generate-itinerary"}>
                            Generate Itinerary
                        </Link>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;