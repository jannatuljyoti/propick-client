import React from 'react';
import { NavLink } from 'react-router';

const AboutUs = () => {
    return (
        <div>
            <div className='bg-gray-50 text-gray-800'>

                {/* Hero */}
                <section className='bg-green-600 mt-10 text-white py-18 text-center'>
                    <h1 className='text-4xl font-bold mb-4'>We Stand for Ethical Choices</h1>

                    <p className='max-w-2xl mx-auto text-lg'>Helping people discover cruelty-free, sustainable, and ethical alternatives to everyday products.</p>

                </section>

                {/* Mission */}
                <section className='py-11 px-5 max-w-5xl mx-auto text-center'>
                    <h2 className='text-3xl font-semibold mb-5'>Our Mission</h2>
                    <p className='text-lg leading-relaxed'>We believe every purchase is a vote for the kind of world we want to live in.
                    Our platform empowers you to identify products that don’t align with your values
                    and find better alternatives recommended by the community.</p>

                </section>

                {/* How we works */}
                <section className='py-11 bg-white px-5'>
                    <h2 className='text-3xl font-semibold text-center mb-10'>How We Work</h2>

                   <div className='grid md:grid-cols-3 gap-7 text-center'>

                     <div>
                        <span className='text-5xl'>📝</span>
                        <h3 className='text-xl font-semibold mt-4'>Add Queries</h3>
                        <p>Share a product you want to boycott and explain why.</p>
                    </div>

                    <div>
                        <span className='text-5xl'>💡</span>
                        <h3 className='text-xl font-semibold mt-4'>Get Recommendations</h3>
                        <p>Receive ethical and high-quality alternatives from others.</p>
                    </div>

                    <div>
                        <span className='text-5xl'>🤝</span>
                        <h3 className='text-xl font-semibold mt-4'>Empower others</h3>
                        <p>Help others make better purchasing decisions.</p>
                    </div>

                   </div>

                </section>

                {/* Why It Matters */}
                <section className='py-11 px-5 max-w-5xl mx-auto text-center'>
                    <h2 className='text-3xl font-semibold mb-5'>Why Boycotting Matters?</h2>

                    <ul className='text-lg space-y-3'>

                         <li>🌱 Protects the environment</li>
                         <li>👩‍🏭 Promotes ethical labor</li>
                         <li>🐇 Encourages cruelty-free practices</li>

                    </ul>

                </section>

                {/* Call to Action */}
                <section className='py-11 bg-green-600 text-white
                text-center'>
                    <h2 className='text-3xl font-bold mb-5'>Join Our Community</h2>
                    <NavLink to="/auth/register" className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">Get Started</NavLink>

                </section>

            </div>
        </div>
    );
};

export default AboutUs;